import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';
import { MODULE_PDF_DOCUMENTS } from '../src/data/modulesPdfData';

function cleanText(str: string): string {
  if (!str) return '';
  return str
    .replace(/[—–]/g, '-')
    .replace(/[“”"]/g, '"')
    .replace(/[‘’']/g, "'")
    .replace(/β/g, 'beta')
    .replace(/α/g, 'alpha')
    .replace(/Σ/g, 'Sigma')
    .replace(/μ/g, 'mu')
    .replace(/σ/g, 'sigma')
    .replace(/λ/g, 'lambda')
    .replace(/θ/g, 'theta')
    .replace(/²|²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/·/g, '-')
    .replace(/•/g, '-')
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=')
    .replace(/≠/g, '!=')
    .replace(/[^\x20-\x7E\n]/g, ' ');
}

async function generateModulePdfs() {
  const outputDir = path.resolve(process.cwd(), 'public/pdfs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const moduleFiles: Record<number, string> = {
    1: 'Module_1_Introduction_Data_Science_22DS102006.pdf',
    2: 'Module_2_Data_Extraction_Feature_Selection.pdf',
    3: 'Module_3_Plotting_and_Visualization.pdf',
    4: 'Module_4_Statistical_Thinking_Distributions.pdf',
    5: 'Module_5_Time_Series_Analysis_Predictive_Modeling.pdf'
  };

  for (let modId = 1; modId <= 5; modId++) {
    const docData = MODULE_PDF_DOCUMENTS[modId];
    if (!docData) continue;

    const pdfDoc = await PDFDocument.create();
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const courier = await pdfDoc.embedFont(StandardFonts.Courier);

    const filename = moduleFiles[modId];
    console.log(`Generating ${filename}...`);

    for (const pageData of docData.pages) {
      const page = pdfDoc.addPage([595.28, 841.89]); // A4 in points
      const { width, height } = page.getSize();

      // Top Header bar
      page.drawRectangle({
        x: 0,
        y: height - 50,
        width: width,
        height: 50,
        color: rgb(0.06, 0.09, 0.16) // slate-900
      });

      page.drawText('DATA SCIENCE LABORATORY - 22DS102006', {
        x: 36,
        y: height - 28,
        size: 9,
        font: helveticaBold,
        color: rgb(0.38, 0.65, 0.98) // blue-400
      });

      page.drawText(`Page ${pageData.pageNumber} of ${docData.totalPages}`, {
        x: width - 110,
        y: height - 28,
        size: 9,
        font: helveticaBold,
        color: rgb(0.8, 0.85, 0.95)
      });

      // Accent border under header
      page.drawRectangle({
        x: 0,
        y: height - 52,
        width: width,
        height: 2,
        color: rgb(0.15, 0.39, 0.92) // blue-600
      });

      // Title on page
      let currentY = height - 85;

      page.drawText(cleanText(pageData.title || docData.moduleTitle).substring(0, 60), {
        x: 36,
        y: currentY,
        size: 15,
        font: helveticaBold,
        color: rgb(0.09, 0.12, 0.18)
      });
      currentY -= 16;

      page.drawText(cleanText(`${docData.subtitle} - AY 2025-2026`).substring(0, 80), {
        x: 36,
        y: currentY,
        size: 8.5,
        font: helvetica,
        color: rgb(0.4, 0.45, 0.55)
      });
      currentY -= 20;

      // Divider
      page.drawLine({
        start: { x: 36, y: currentY },
        end: { x: width - 36, y: currentY },
        thickness: 0.8,
        color: rgb(0.85, 0.88, 0.92)
      });
      currentY -= 20;

      // Render sections
      for (const sec of pageData.sections) {
        if (currentY < 90) break; // keep footer space

        if (sec.heading) {
          page.drawRectangle({
            x: 36,
            y: currentY - 2,
            width: 3.5,
            height: 14,
            color: rgb(0.15, 0.39, 0.92)
          });

          page.drawText(cleanText(sec.heading).substring(0, 75), {
            x: 44,
            y: currentY,
            size: 11,
            font: helveticaBold,
            color: rgb(0.08, 0.12, 0.2)
          });
          currentY -= 18;
        }

        if (sec.subheading) {
          page.drawText(cleanText(sec.subheading).substring(0, 80), {
            x: 36,
            y: currentY,
            size: 9.5,
            font: helveticaBold,
            color: rgb(0.2, 0.25, 0.35)
          });
          currentY -= 15;
        }

        if (sec.paragraphs) {
          for (const rawP of sec.paragraphs) {
            const p = cleanText(rawP);
            const words = p.split(' ');
            let line = '';
            for (const word of words) {
              const testLine = line ? `${line} ${word}` : word;
              const lineWidth = helvetica.widthOfTextAtSize(testLine, 9);
              if (lineWidth > width - 72) {
                if (currentY < 80) break;
                page.drawText(line, {
                  x: 36,
                  y: currentY,
                  size: 9,
                  font: helvetica,
                  color: rgb(0.2, 0.22, 0.28)
                });
                currentY -= 13;
                line = word;
              } else {
                line = testLine;
              }
            }
            if (line && currentY >= 80) {
              page.drawText(line, {
                x: 36,
                y: currentY,
                size: 9,
                font: helvetica,
                color: rgb(0.2, 0.22, 0.28)
              });
              currentY -= 15;
            }
          }
        }

        if (sec.bulletPoints) {
          for (const rawBp of sec.bulletPoints) {
            const bp = cleanText(rawBp);
            if (currentY < 80) break;
            page.drawText('-', {
              x: 42,
              y: currentY,
              size: 10,
              font: helveticaBold,
              color: rgb(0.15, 0.39, 0.92)
            });

            // Wrap bullet text
            const words = bp.split(' ');
            let line = '';
            for (const word of words) {
              const testLine = line ? `${line} ${word}` : word;
              const lineWidth = helvetica.widthOfTextAtSize(testLine, 8.5);
              if (lineWidth > width - 90) {
                if (currentY < 80) break;
                page.drawText(line, {
                  x: 54,
                  y: currentY,
                  size: 8.5,
                  font: helvetica,
                  color: rgb(0.25, 0.28, 0.35)
                });
                currentY -= 12;
                line = word;
              } else {
                line = testLine;
              }
            }
            if (line && currentY >= 80) {
              page.drawText(line, {
                x: 54,
                y: currentY,
                size: 8.5,
                font: helvetica,
                color: rgb(0.25, 0.28, 0.35)
              });
              currentY -= 14;
            }
          }
        }

        if (sec.mathFormula && currentY >= 100) {
          page.drawRectangle({
            x: 36,
            y: currentY - 14,
            width: width - 72,
            height: 22,
            color: rgb(0.95, 0.97, 1.0),
            borderColor: rgb(0.8, 0.88, 0.98),
            borderWidth: 1
          });
          page.drawText(`Formula: ${cleanText(sec.mathFormula)}`, {
            x: 46,
            y: currentY - 8,
            size: 8.5,
            font: courier,
            color: rgb(0.1, 0.25, 0.55)
          });
          currentY -= 30;
        }

        if (sec.codeBlock && currentY >= 120) {
          const lines = sec.codeBlock.code.split('\n').slice(0, 5);
          const blockHeight = lines.length * 12 + 16;
          page.drawRectangle({
            x: 36,
            y: currentY - blockHeight,
            width: width - 72,
            height: blockHeight,
            color: rgb(0.06, 0.08, 0.12)
          });
          let codeY = currentY - 12;
          for (const cl of lines) {
            page.drawText(cleanText(cl).substring(0, 75), {
              x: 46,
              y: codeY,
              size: 7.5,
              font: courier,
              color: rgb(0.3, 0.85, 0.55)
            });
            codeY -= 12;
          }
          currentY -= (blockHeight + 14);
        }

        currentY -= 6;
      }

      // Bottom Footer
      page.drawLine({
        start: { x: 36, y: 40 },
        end: { x: width - 36, y: 40 },
        thickness: 0.5,
        color: rgb(0.85, 0.88, 0.92)
      });

      page.drawText('Department of Artificial Intelligence & Data Science - Accredited Laboratory Curriculum', {
        x: 36,
        y: 26,
        size: 7.5,
        font: helvetica,
        color: rgb(0.5, 0.55, 0.65)
      });

      page.drawText(`${filename} - Continuous Document`, {
        x: width - 230,
        y: 26,
        size: 7.5,
        font: helvetica,
        color: rgb(0.5, 0.55, 0.65)
      });
    }

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(path.join(outputDir, filename), pdfBytes);
    console.log(`Saved ${filename} (${pdfBytes.length} bytes, ${docData.pages.length} pages)`);
  }

  // Also generate master syllabus PDF
  const syllabusDoc = await PDFDocument.create();
  const fontRegular = await syllabusDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await syllabusDoc.embedFont(StandardFonts.HelveticaBold);
  const syllabusPage = syllabusDoc.addPage([595.28, 841.89]);
  const { width, height } = syllabusPage.getSize();

  syllabusPage.drawRectangle({
    x: 0,
    y: height - 70,
    width: width,
    height: 70,
    color: rgb(0.06, 0.09, 0.16)
  });

  syllabusPage.drawText('DATA SCIENCE LABORATORY MANUAL & SYLLABUS', {
    x: 36,
    y: height - 38,
    size: 14,
    font: fontBold,
    color: rgb(1, 1, 1)
  });

  syllabusPage.drawText('Course Code: 22DS102006 - Academic Year: 2025-2026', {
    x: 36,
    y: height - 54,
    size: 9,
    font: fontRegular,
    color: rgb(0.38, 0.65, 0.98)
  });

  let sY = height - 110;
  syllabusPage.drawText('Department of Computer Science & Engineering (Data Science)', {
    x: 36,
    y: sY,
    size: 11,
    font: fontBold,
    color: rgb(0.1, 0.15, 0.25)
  });
  sY -= 20;

  syllabusPage.drawText('Official Curriculum Modules with Complete Laboratory Tasks & Manuals:', {
    x: 36,
    y: sY,
    size: 9.5,
    font: fontRegular,
    color: rgb(0.3, 0.35, 0.45)
  });
  sY -= 25;

  const modulesList = [
    'Module 1: Introduction to Data Science (22DS102006) - 14 Hours',
    'Module 2: Data Extraction & Feature Selection - 16 Hours',
    'Module 3: Plotting and Visualization (Matplotlib & Seaborn) - 16 Hours',
    'Module 4: Statistical Thinking & Distributions - 16 Hours',
    'Module 5: Time Series Analysis And Predictive Modeling - 18 Hours'
  ];

  for (const m of modulesList) {
    syllabusPage.drawRectangle({
      x: 36,
      y: sY - 14,
      width: width - 72,
      height: 24,
      color: rgb(0.96, 0.98, 1.0),
      borderColor: rgb(0.85, 0.9, 0.96),
      borderWidth: 1
    });

    syllabusPage.drawText(m, {
      x: 48,
      y: sY - 7,
      size: 9,
      font: fontBold,
      color: rgb(0.12, 0.24, 0.5)
    });
    sY -= 32;
  }

  sY -= 15;
  syllabusPage.drawText('Laboratory Evaluation Criteria:', {
    x: 36,
    y: sY,
    size: 11,
    font: fontBold,
    color: rgb(0.1, 0.15, 0.25)
  });
  sY -= 18;

  const evals = [
    '1. Laboratory Continuous Assessment: Algorithm Implementation & Analysis',
    '2. Faculty Verification: Code Optimization, Clean Coding Practices & Viva Voce',
    '3. Sub-Experiments: Real-world Datasets, Preprocessing, ML Pipelines',
    '4. Record Work: Continuous PDF Manual maintenance & timely submission'
  ];

  for (const ev of evals) {
    syllabusPage.drawText(ev, {
      x: 44,
      y: sY,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.25, 0.3, 0.4)
    });
    sY -= 16;
  }

  const syllabusBytes = await syllabusDoc.save();
  fs.writeFileSync(path.join(outputDir, 'Data_Science_Lab_Syllabus_&_Manual_22DS102006.pdf'), syllabusBytes);
  console.log(`Saved syllabus PDF (${syllabusBytes.length} bytes)`);
}

generateModulePdfs().catch(console.error);
