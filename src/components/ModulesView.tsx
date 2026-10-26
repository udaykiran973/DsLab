import React, { useState, useMemo, useEffect } from 'react';
import {
  CURRICULUM_MODULES,
  TOTAL_CURRICULUM_PERIODS,
  CurriculumModule
} from '../data/modulesData';
import {
  Search,
  ArrowRight,
  Clock,
  BookOpen,
  Copy,
  Check,
  FlaskConical,
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  LayoutGrid,
  Columns,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { ModulePdfViewer } from './modules/ModulePdfViewer';
import { ModuleResourcesList } from './modules/ModuleResourcesList';
import { MODULE_CURATED_RESOURCES } from '../data/moduleResourcesData';

interface ModulesViewProps {
  modules?: any[];
  selectedModuleNumber?: number | 'all';
  moduleNavTrigger?: number;
  onNavigateToCatalogue?: () => void;
  onSelectExperiment?: (expId: string) => void;
}

export const ModulesView: React.FC<ModulesViewProps> = ({
  selectedModuleNumber: externalSelectedModule,
  moduleNavTrigger = 0,
  onNavigateToCatalogue,
  onSelectExperiment
}) => {
  const [activeUnitNum, setActiveUnitNum] = useState<number>(
    typeof externalSelectedModule === 'number' ? externalSelectedModule : 1
  );
  const [layoutMode, setLayoutMode] = useState<'workspace' | 'directory'>('workspace');
  const [isSyllabusCollapsed, setIsSyllabusCollapsed] = useState(false);
  const [rightPanelTab, setRightPanelTab] = useState<'pdf' | 'syllabus' | 'resources'>('pdf');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof externalSelectedModule === 'number') {
      setActiveUnitNum(externalSelectedModule);
      setLayoutMode('workspace');
    }
  }, [externalSelectedModule, moduleNavTrigger]);

  const activeModule: CurriculumModule = useMemo(() => {
    return CURRICULUM_MODULES.find((m) => m.number === activeUnitNum) || CURRICULUM_MODULES[0];
  }, [activeUnitNum]);

  const activeResources = MODULE_CURATED_RESOURCES[activeModule.number] || [];

  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return CURRICULUM_MODULES;
    const q = searchQuery.toLowerCase();
    return CURRICULUM_MODULES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.syllabusRaw.toLowerCase().includes(q) ||
        m.allTopics.some((t) => t.toLowerCase().includes(q)) ||
        m.sections.some(
          (s) =>
            s.heading.toLowerCase().includes(q) ||
            s.topics.some((t) => t.toLowerCase().includes(q))
        )
    );
  }, [searchQuery]);

  const handleCopySyllabus = (mod: CurriculumModule) => {
    const text = `Unit 0${mod.number}: ${mod.title} (${mod.periods} Hours)\n${mod.syllabusRaw}`;
    navigator.clipboard.writeText(text);
    setCopiedId(mod.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalPdfPages = useMemo(
    () => CURRICULUM_MODULES.reduce((acc, m) => acc + (m.pdfPages || 0), 0),
    []
  );

  return (
    <div className="space-y-6 pb-14 animate-fadeIn">
      {/* ============================================================ */}
      {/* 1. CLEAN MONOCHROME EDITORIAL HEADER                         */}
      {/* ============================================================ */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold">
                22DS102006
              </span>
              <span>·</span>
              <span>Specialization Elective</span>
              <span>·</span>
              <span>{TOTAL_CURRICULUM_PERIODS} Instructional Hours</span>
              <span>·</span>
              <span>{totalPdfPages} Total Manual Pages</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Course Syllabus &amp; Lecture Manuals
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Complete five-unit curriculum structure, official lecture notes, and mapped laboratory exercises.
            </p>
          </div>

          {/* Search & View Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter syllabus topics..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim()) {
                    setLayoutMode('directory');
                  }
                }}
                className="w-full pl-9 pr-7 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs shrink-0">
              <button
                type="button"
                onClick={() => setLayoutMode('workspace')}
                className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  layoutMode === 'workspace'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Unit Reader</span>
              </button>
              {layoutMode === 'workspace' && (
                <button
                  type="button"
                  onClick={() => setIsSyllabusCollapsed((prev) => !prev)}
                  className={`px-2.5 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-colors cursor-pointer border-l border-slate-200 ${
                    isSyllabusCollapsed
                      ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title={isSyllabusCollapsed ? "Show Syllabus Panel" : "Fit Page (Full Width PDF)"}
                >
                  {isSyllabusCollapsed ? (
                    <>
                      <PanelLeftOpen className="w-3.5 h-3.5" />
                      <span>Show Syllabus</span>
                    </>
                  ) : (
                    <>
                      <PanelLeftClose className="w-3.5 h-3.5" />
                      <span>Page Fit (Full Width)</span>
                    </>
                  )}
                </button>
              )}
              <button
                type="button"
                onClick={() => setLayoutMode('directory')}
                className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  layoutMode === 'directory'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All Units Index</span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. FIVE-UNIT MONOCHROME SELECTOR STRIP                       */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-5">
          {CURRICULUM_MODULES.map((m) => {
            const isSelected = layoutMode === 'workspace' && m.number === activeUnitNum;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setActiveUnitNum(m.number);
                  setLayoutMode('workspace');
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50/70 hover:bg-slate-100/80 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span className={isSelected ? 'text-slate-300 font-semibold' : 'text-slate-500 font-semibold'}>
                    UNIT 0{m.number}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] ${
                      isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-200/70 text-slate-700'
                    }`}
                  >
                    {m.pdfPages} pp
                  </span>
                </div>
                <div className="text-xs font-bold leading-snug line-clamp-2">{m.title}</div>
                <div
                  className={`mt-2 pt-2 border-t text-[10px] font-mono flex items-center justify-between ${
                    isSelected ? 'border-slate-800 text-slate-400' : 'border-slate-200/80 text-slate-500'
                  }`}
                >
                  <span>{m.periods} Periods</span>
                  <span>{m.allTopics.length} Topics</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3A. WORKSPACE MODE: SPLIT SYLLABUS + EMBEDDED PDF READER     */}
      {/* ============================================================ */}
      {layoutMode === 'workspace' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT PANE: UNIT SYLLABUS, SECTIONS & LAB LINKS (5 COLS) */}
          {!isSyllabusCollapsed && (
            <div className="lg:col-span-5 space-y-5 animate-fadeIn">
            {/* Unit Overview Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-mono font-semibold text-slate-500 uppercase">
                    Unit 0{activeModule.number} Syllabus Specification
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                    {activeModule.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopySyllabus(activeModule)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium flex items-center gap-1 shrink-0 cursor-pointer"
                  title="Copy unit syllabus"
                >
                  {copiedId === activeModule.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-slate-900" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="text-[11px] font-mono font-semibold text-slate-500 uppercase">
                  Prescribed Syllabus
                </div>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
                  {activeModule.syllabusRaw}
                </p>
              </div>

              {/* Structured Sub-Sections */}
              <div className="space-y-3 pt-1">
                <div className="text-[11px] font-mono font-semibold text-slate-500 uppercase">
                  Topic Breakdown ({activeModule.sections.length} Sections)
                </div>
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
                  {activeModule.sections.map((sec, idx) => (
                    <div key={idx} className="p-3.5 bg-white space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                        <span>
                          {activeModule.number}.{idx + 1} {sec.heading}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {sec.topics.length} items
                        </span>
                      </div>
                      <ul className="grid grid-cols-1 gap-1 pl-1">
                        {sec.topics.map((t, tIdx) => (
                          <li key={tIdx} className="text-xs text-slate-600 flex items-start gap-2">
                            <span className="text-slate-400 font-mono text-[10px] mt-0.5">
                              —
                            </span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-mono font-semibold text-slate-500 uppercase">
                  Course Outcomes
                </div>
                <div className="space-y-1.5">
                  {activeModule.learningOutcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50/70 p-2.5 rounded-lg border border-slate-200/60"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Linked Practical Experiments */}
            {activeModule.relatedExperiments.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-slate-700" />
                    <span>Associated Lab Exercises</span>
                  </span>
                  {onNavigateToCatalogue && (
                    <button
                      type="button"
                      onClick={onNavigateToCatalogue}
                      className="text-xs font-medium text-slate-600 hover:text-slate-900 underline cursor-pointer"
                    >
                      View All Labs
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
                  {activeModule.relatedExperiments.map((exp) => (
                    <div
                      key={exp.id}
                      onClick={() =>
                        onSelectExperiment
                          ? onSelectExperiment(exp.id)
                          : onNavigateToCatalogue && onNavigateToCatalogue()
                      }
                      className="p-3.5 bg-white hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                          <span className="font-semibold text-slate-800">
                            EXP {exp.displayNumber}
                          </span>
                          <span>·</span>
                          <span>{exp.technology}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 truncate group-hover:underline">
                          {exp.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {exp.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>
          )}

          {/* RIGHT PANE: EMBEDDED PDF READER & REFERENCES (Expands to 12 cols when syllabus is collapsed) */}
          <div className={`${isSyllabusCollapsed ? 'lg:col-span-12' : 'lg:col-span-7'} space-y-4 transition-all duration-300`}>
            <div className="bg-white rounded-xl border border-slate-200 p-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setRightPanelTab('pdf')}
                  className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    rightPanelTab === 'pdf'
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Lecture Notes PDF ({activeModule.pdfPages} Pages)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRightPanelTab('syllabus')}
                  className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    rightPanelTab === 'syllabus'
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Key Terms ({activeModule.allTopics.length})</span>
                </button>
                {activeResources.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setRightPanelTab('resources')}
                    className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      rightPanelTab === 'resources'
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>References ({activeResources.length})</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSyllabusCollapsed((prev) => !prev)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  title={isSyllabusCollapsed ? "Show Syllabus Panel" : "Fit Page (Full Width)"}
                >
                  {isSyllabusCollapsed ? (
                    <>
                      <PanelLeftOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>Show Syllabus</span>
                    </>
                  ) : (
                    <>
                      <PanelLeftClose className="w-3.5 h-3.5 text-slate-500" />
                      <span>Page Fit (Full Width)</span>
                    </>
                  )}
                </button>

                {activeModule.pdfUrl && (
                  <a
                    href={activeModule.pdfUrl}
                    download={`Unit_${activeModule.number}_${activeModule.title.replace(/\s+/g, '_')}.pdf`}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Download PDF</span>
                  </a>
                )}
              </div>
            </div>

            {rightPanelTab === 'pdf' && activeModule.pdfUrl && (
              <ModulePdfViewer
                moduleNumber={activeModule.number}
                moduleCode={`UNIT 0${activeModule.number}`}
                moduleTitle={activeModule.title}
                pdfUrl={activeModule.pdfUrl}
                totalPages={activeModule.pdfPages}
              />
            )}

            {rightPanelTab === 'syllabus' && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">
                    Unit 0{activeModule.number} — Complete Topic &amp; Concept Index
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    All {activeModule.allTopics.length} prescribed concepts covered in {activeModule.title}.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModule.allTopics.map((topic, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/60 text-xs text-slate-800 flex items-center gap-2.5"
                    >
                      <span className="font-mono text-[10px] text-slate-400 w-5">
                        {(i + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {rightPanelTab === 'resources' && (
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <ModuleResourcesList
                  resources={activeResources}
                  moduleCode={`UNIT 0${activeModule.number}`}
                  moduleTitle={activeModule.title}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ============================================================ */
        /* 3B. DIRECTORY MODE: CLEAN MONOCHROME TABLE OF ALL 5 UNITS    */
        /* ============================================================ */
        <div className="space-y-4">
          {filteredModules.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-800">
                No syllabus units match &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            filteredModules.map((mod) => (
              <div
                key={mod.id}
                className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 space-y-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-semibold">
                        UNIT 0{mod.number}
                      </span>
                      <span>·</span>
                      <span>{mod.periods} Instructional Hours</span>
                      <span>·</span>
                      <span>{mod.pdfPages} PDF Pages</span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">{mod.title}</h2>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {mod.pdfUrl && (
                      <a
                        href={mod.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        <span>PDF ({mod.pdfPages}p)</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveUnitNum(mod.number);
                        setRightPanelTab('pdf');
                        setLayoutMode('workspace');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Open Unit Reader</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{mod.syllabusRaw}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  {mod.sections.map((s, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5"
                    >
                      <div className="text-xs font-bold text-slate-900">
                        {mod.number}.{sIdx + 1} {s.heading}
                      </div>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {s.topics.map((t, tIdx) => (
                          <li key={tIdx} className="truncate">
                            · {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
