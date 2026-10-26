import React, { useState } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  Maximize2,
  Minimize2,
  BookOpen
} from 'lucide-react';

interface ModulePdfViewerProps {
  moduleNumber: number;
  moduleCode: string;
  moduleTitle: string;
  pdfUrl: string;
  totalPages?: number;
}

export const ModulePdfViewer: React.FC<ModulePdfViewerProps> = ({
  moduleNumber,
  moduleCode,
  moduleTitle,
  pdfUrl,
  totalPages
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [tallMode, setTallMode] = useState(true);

  const embedUrl = `${pdfUrl}#toolbar=1&navpanes=0&view=FitH`;

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        {/* Minimalist Neutral Toolbar */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Unit 0{moduleNumber} — {moduleTitle}
                </span>
                {totalPages && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                    {totalPages} pages
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                Course Document · 22DS102006 · Continuous Vertical Reader
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={() => setTallMode((prev) => !prev)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
            >
              {tallMode ? 'Compact View' : 'Expanded View'}
            </button>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>Open PDF</span>
            </a>

            <a
              href={pdfUrl}
              download={`Unit_${moduleNumber}_${moduleTitle.replace(/\s+/g, '_')}.pdf`}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download</span>
            </a>

            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Embedded Document Frame */}
        <div className={`w-full bg-slate-100 ${tallMode ? 'h-[740px]' : 'h-[520px]'}`}>
          <object
            data={embedUrl}
            type="application/pdf"
            className="w-full h-full block border-none"
            aria-label={`${moduleTitle} PDF`}
          >
            <iframe
              src={embedUrl}
              title={`${moduleTitle} PDF`}
              className="w-full h-full border-none"
            >
              <div className="p-10 text-center flex flex-col items-center justify-center h-full bg-slate-50 space-y-3">
                <FileText className="w-10 h-10 text-slate-400" />
                <p className="text-xs text-slate-600">
                  Embedded PDF preview is unavailable in this browser window.
                </p>
                <div className="flex gap-2">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold"
                  >
                    Open in New Tab
                  </a>
                  <a
                    href={pdfUrl}
                    download
                    className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </iframe>
          </object>
        </div>
      </div>

      {/* Fullscreen Reader Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex flex-col p-3 sm:p-6"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="w-full h-full max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-slate-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs font-semibold">
                  {moduleCode}
                </span>
                <span className="font-bold text-sm">{moduleTitle}</span>
                {totalPages && (
                  <span className="text-xs text-slate-400 font-mono">({totalPages} pages)</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  download
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                  title="Exit Fullscreen"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-100">
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=1&view=FitH`}
                title={`${moduleTitle} Fullscreen`}
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
