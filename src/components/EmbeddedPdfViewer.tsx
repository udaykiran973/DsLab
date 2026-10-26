import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, 
  Printer, 
  FileText, 
  BookOpen, 
  CheckCircle2, 
  Maximize2, 
  Upload, 
  Trash2, 
  FileUp, 
  ExternalLink,
  ChevronRight,
  Eye,
  FileCode2,
  FileCheck
} from 'lucide-react';
import { MODULE_PDF_DOCUMENTS, ModulePdfDocument } from '../data/modulesPdfData';
import { ModulePdfDiagrams } from './ModulePdfDiagrams';
import { 
  UploadedPdfItem, 
  DEFAULT_MODULE_PDFS,
  loadStoredPdfMetadata, 
  savePdfMetadata, 
  registerRuntimePdfBlob,
  registerRuntimeDataUri,
  getOrCreateSamplePdfUrl
} from '../data/pdfUploadService';

interface EmbeddedPdfViewerProps {
  initialModuleId?: number;
  initialUploadedPdfId?: string;
  onPdfUploaded?: (pdf: UploadedPdfItem) => void;
}

export const EmbeddedPdfViewer: React.FC<EmbeddedPdfViewerProps> = ({ 
  initialModuleId = 1,
  initialUploadedPdfId,
  onPdfUploaded
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<number>(initialModuleId);
  const [activeTabType, setActiveTabType] = useState<'module' | 'uploaded'>(
    initialUploadedPdfId ? 'uploaded' : 'module'
  );
  const [selectedUploadedPdfId, setSelectedUploadedPdfId] = useState<string>(
    initialUploadedPdfId || 'pdf-module-1'
  );
  const [uploadedPdfs, setUploadedPdfs] = useState<UploadedPdfItem[]>([]);
  const [viewFormat, setViewFormat] = useState<'digital_manual' | 'native_pdf'>('digital_manual');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load uploaded and default PDFs on mount
  useEffect(() => {
    const list = loadStoredPdfMetadata();
    setUploadedPdfs(list);
    if (initialUploadedPdfId) {
      setSelectedUploadedPdfId(initialUploadedPdfId);
      setActiveTabType('uploaded');
    }
  }, [initialUploadedPdfId]);

  const activeDoc: ModulePdfDocument = MODULE_PDF_DOCUMENTS[selectedModuleId] || MODULE_PDF_DOCUMENTS[1];
  const activeUploadedPdf = uploadedPdfs.find((p) => p.id === selectedUploadedPdfId) || uploadedPdfs[0];

  const handleSelectModule = (id: number) => {
    setSelectedModuleId(id);
    setActiveTabType('module');
  };

  const handleSelectUploaded = (id: string) => {
    setSelectedUploadedPdfId(id);
    setActiveTabType('uploaded');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      alert('Please select a valid PDF document (.pdf)');
      return;
    }

    const newId = `uploaded-pdf-${Date.now()}`;
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
    const sizeStr = file.size < 1024 * 1024 
      ? `${(file.size / 1024).toFixed(1)} KB` 
      : `${sizeInMb} MB`;

    // Read with FileReader to persist dataUri
    const reader = new FileReader();
    reader.onload = () => {
      const dataUri = reader.result as string;
      const blobUrl = registerRuntimePdfBlob(newId, file);
      registerRuntimeDataUri(newId, dataUri);

      const newItem: UploadedPdfItem = {
        id: newId,
        name: file.name,
        size: sizeStr,
        uploadedAt: `Uploaded Just Now`,
        url: blobUrl,
        dataUri,
        isSample: false
      };

      const updated = [newItem, ...uploadedPdfs.filter((p) => p.id !== newItem.id)];
      setUploadedPdfs(updated);
      savePdfMetadata(updated);
      setSelectedUploadedPdfId(newId);
      setActiveTabType('uploaded');

      if (onPdfUploaded) {
        onPdfUploaded(newItem);
      }
    };

    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteUploadedPdf = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = uploadedPdfs.filter((p) => p.id !== id);
    setUploadedPdfs(updated);
    savePdfMetadata(updated);
    if (selectedUploadedPdfId === id) {
      if (updated.length > 0) {
        setSelectedUploadedPdfId(updated[0].id);
      } else {
        setActiveTabType('module');
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    if (activeTabType === 'uploaded' && activeUploadedPdf) {
      const a = document.createElement('a');
      a.href = activeUploadedPdf.url || activeUploadedPdf.dataUri || getOrCreateSamplePdfUrl();
      a.download = activeUploadedPdf.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // Default module PDF download
    const staticPdfPath = `/pdfs/Module_${selectedModuleId}_${
      selectedModuleId === 1 ? 'Introduction_Data_Science_22DS102006' :
      selectedModuleId === 2 ? 'Data_Extraction_Feature_Selection' :
      selectedModuleId === 3 ? 'Plotting_and_Visualization' :
      selectedModuleId === 4 ? 'Statistical_Thinking_Distributions' :
      'Time_Series_Analysis_Predictive_Modeling'
    }.pdf`;

    const a = document.createElement('a');
    a.href = staticPdfPath;
    a.download = `${activeDoc.moduleTitle.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const currentModulePdfPath = `/pdfs/Module_${selectedModuleId}_${
    selectedModuleId === 1 ? 'Introduction_Data_Science_22DS102006' :
    selectedModuleId === 2 ? 'Data_Extraction_Feature_Selection' :
    selectedModuleId === 3 ? 'Plotting_and_Visualization' :
    selectedModuleId === 4 ? 'Statistical_Thinking_Distributions' :
    'Time_Series_Analysis_Predictive_Modeling'
  }.pdf`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Hidden File Input for PDF Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Top Header & Tab Navigation Bar */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-extrabold text-xs shadow-sm shrink-0">
            PDF
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-100 truncate">
                {activeTabType === 'module'
                  ? activeDoc.moduleTitle
                  : activeUploadedPdf?.name || 'Uploaded PDF Document'}
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60 shrink-0">
                Continuous Scroll
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              {activeTabType === 'module'
                ? `Module 0${activeDoc.moduleId} · Course Code ${activeDoc.courseCode} · All ${activeDoc.totalPages} Pages Continuous Flow`
                : `${activeUploadedPdf?.size || ''} · ${activeUploadedPdf?.uploadedAt || ''}`}
            </p>
          </div>
        </div>

        {/* Action Controls in Top Bar */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          {activeTabType === 'module' && (
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setViewFormat('digital_manual')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  viewFormat === 'digital_manual'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Continuous Document Scroll"
              >
                Document Flow
              </button>
              <button
                onClick={() => setViewFormat('native_pdf')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  viewFormat === 'native_pdf'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Original PDF Embed"
              >
                Official PDF
              </button>
            </div>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-xs"
            title="Upload your own lab syllabus, lecture notes or lab sheets"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload PDF</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors shadow-xs"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Clean Document Tabs (Modules & Uploaded Documents) */}
      <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
          Modules:
        </span>

        {[1, 2, 3, 4, 5].map((id) => (
          <button
            key={id}
            onClick={() => handleSelectModule(id)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTabType === 'module' && selectedModuleId === id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            Module {id}
          </button>
        ))}

        <div className="h-4 w-px bg-slate-800 mx-1 shrink-0" />

        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
          Documents:
        </span>

        {uploadedPdfs.map((pdf) => (
          <div
            key={pdf.id}
            onClick={() => handleSelectUploaded(pdf.id)}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTabType === 'uploaded' && selectedUploadedPdfId === pdf.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
            title={pdf.name}
          >
            <FileText className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
            <span className="max-w-[150px] truncate">{pdf.name}</span>
            {!pdf.isSample && (
              <button
                onClick={(e) => handleDeleteUploadedPdf(pdf.id, e)}
                className="hover:text-red-300 p-0.5 rounded ml-0.5"
                title="Remove uploaded document"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* CONTINUOUS SCROLL VIEWPORT — NO INTRUSIVE BUTTONS WHILE SCROLLING */}
      <div className="flex-1 bg-slate-100 flex flex-col min-h-[750px]">
        {/* CASE 1: UPLOADED PDF DISPLAY — FULL CONTINUOUS SCROLL FRAME */}
        {activeTabType === 'uploaded' ? (
          activeUploadedPdf ? (
            <div className="flex-1 flex flex-col h-full bg-slate-900">
              {/* Document Banner */}
              <div className="px-5 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-white truncate max-w-md">
                    {activeUploadedPdf.name}
                  </span>
                  <span className="text-slate-500 font-mono">({activeUploadedPdf.size})</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-xs font-medium"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New</span>
                  </button>
                  <a
                    href={activeUploadedPdf.url || activeUploadedPdf.dataUri || getOrCreateSamplePdfUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium ml-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Fullscreen</span>
                  </a>
                </div>
              </div>

              {/* The continuous scroll frame: clean, large, natural vertical scrolling */}
              <iframe
                src={`${activeUploadedPdf.url || activeUploadedPdf.dataUri || getOrCreateSamplePdfUrl()}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                title={activeUploadedPdf.name}
                className="w-full flex-1 min-h-[780px] bg-slate-800 border-0"
              />
            </div>
          ) : (
            <div className="p-16 text-center text-slate-600 space-y-4 my-auto">
              <FileUp className="w-14 h-14 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Uploaded PDF Selected</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Upload your course syllabus, lecture notes, or lab guide to view and scroll smoothly.
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                Upload PDF Document
              </button>
            </div>
          )
        ) : viewFormat === 'native_pdf' ? (
          /* CASE 2: MODULE NATIVE PDF EMBED — CONTINUOUS SCROLL */
          <div className="flex-1 flex flex-col bg-slate-900">
            <iframe
              src={`${currentModulePdfPath}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              title={activeDoc.moduleTitle}
              className="w-full flex-1 min-h-[780px] bg-slate-800 border-0"
            />
          </div>
        ) : (
          /* CASE 3: MODULE DIGITAL MANUAL STREAM — SEAMLESS VERTICAL SCROLL, ZERO BUTTONS IN VIEW */
          <div className="overflow-y-auto max-h-[820px] p-4 sm:p-8 bg-slate-200/80 scroll-smooth">
            <div className="flex flex-col items-center gap-8 mx-auto max-w-4xl">
              {activeDoc.pages.map((page) => (
                <div
                  key={page.pageNumber}
                  id={`pdf-page-${page.pageNumber}`}
                  className="w-full bg-white rounded-xl shadow-md border border-slate-300/80 p-6 sm:p-12 transition-all"
                >
                  {/* Clean Page Header */}
                  <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
                    <div>
                      <span className="text-[10px] tracking-widest uppercase font-bold text-blue-700 block mb-0.5">
                        Department of Artificial Intelligence & Data Science · {activeDoc.courseCode}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                        {page.title || activeDoc.moduleTitle}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Module 0{activeDoc.moduleId} Manual · Continuous Stream
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-mono font-semibold rounded-md shadow-2xs">
                        Page {page.pageNumber} of {activeDoc.totalPages}
                      </span>
                    </div>
                  </div>

                  {/* Clean Content Stream */}
                  <div className="space-y-6 text-sm text-slate-700 leading-relaxed font-sans">
                    {page.sections.map((sec, idx) => (
                      <div key={idx} className="space-y-3">
                        {sec.heading && (
                          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-l-4 border-blue-600 pl-2.5 mb-2">
                            {sec.heading}
                          </h4>
                        )}

                        {sec.subheading && (
                          <h5 className="text-xs font-bold text-slate-800 tracking-wide">
                            {sec.subheading}
                          </h5>
                        )}

                        {sec.paragraphs &&
                          sec.paragraphs.map((p, pIdx) => (
                            <p key={pIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                              {p}
                            </p>
                          ))}

                        {sec.bulletPoints && (
                          <ul className="space-y-2 pl-1">
                            {sec.bulletPoints.map((b, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                                <span className="text-blue-600 font-bold">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {sec.mathFormula && (
                          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center my-3 font-mono text-xs sm:text-sm text-blue-900">
                            <span className="font-bold">{sec.mathFormula}</span>
                          </div>
                        )}

                        {sec.codeBlock && (
                          <div className="rounded-lg overflow-hidden border border-slate-800 my-3 bg-slate-950">
                            <div className="px-3 py-1 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400 font-mono">
                              {sec.codeBlock.language.toUpperCase()} Snippet
                            </div>
                            <pre className="p-3 text-xs font-mono text-slate-100 overflow-x-auto whitespace-pre leading-relaxed">
                              {sec.codeBlock.code}
                            </pre>
                          </div>
                        )}

                        {sec.table && (
                          <div className="overflow-x-auto my-3 border border-slate-200 rounded-lg">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                                <tr>
                                  {sec.table.headers.map((h, hIdx) => (
                                    <th key={hIdx} className="py-2 px-3">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {sec.table.rows.map((r, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-slate-50/50">
                                    {r.map((c, cIdx) => (
                                      <td key={cIdx} className="py-2 px-3 text-slate-600">
                                        {c}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {sec.diagramType && <ModulePdfDiagrams type={sec.diagramType} />}
                      </div>
                    ))}
                  </div>

                  {/* Clean Page Footer */}
                  <div className="mt-10 pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span>Data Science ({activeDoc.courseCode})</span>
                    <span>Page {page.pageNumber} of {activeDoc.totalPages}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
