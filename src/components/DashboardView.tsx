import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  FlaskConical, 
  Wrench, 
  CheckCircle2, 
  Terminal, 
  Database, 
  GraduationCap, 
  Compass,
  FileText,
  Layers,
  Code2
} from 'lucide-react';
import { Experiment, CurriculumModule, StudentProfile } from '../types/lab';
import { INITIAL_TOOLS } from '../data/labData';
import { StudentIdCard } from './StudentIdCard';
import { DataScience3DHero } from './DataScience3DHero';

interface DashboardViewProps {
  profile: StudentProfile;
  experiments: Experiment[];
  modules: CurriculumModule[];
  onNavigate: (tab: 'home' | 'catalogue' | 'modules' | 'tools') => void;
  onSelectModule?: (moduleNumber: number | 'all') => void;
  onSelectExperiment: (exp: Experiment) => void;
  onUpdateProfile: (updated: StudentProfile) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  experiments,
  modules,
  onNavigate,
  onSelectModule,
  onSelectExperiment,
  onUpdateProfile
}) => {
  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* ============================================================ */}
      {/* 1. TOP HERO SECTION (Matching Reference Design)              */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#075985] text-white p-6 sm:p-8 lg:p-9 shadow-xl border border-sky-400/20">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Column: Title, 3D Interactive Animation & Theoretical Pillars */}
          <div className="lg:col-span-7 space-y-3">
            <div className="space-y-0.5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white flex items-center gap-2">
                <span>DATA SCIENCE</span>
                <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-sky-200" />
              </h1>
              <p className="text-base sm:text-lg font-semibold text-sky-100">
                Subject Digital Library
              </p>
            </div>

            {/* 3D Interactive Animation & Theory Section */}
            <DataScience3DHero />
          </div>

          {/* Right Hero Column: Uday Kiran's Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <StudentIdCard
              profile={profile}
              onUpdateProfile={onUpdateProfile}
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. CURRICULUM & INTERACTIVE WORKSPACES (Reference Grid)       */}
      {/* ============================================================ */}
      <div className="space-y-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Curriculum & Interactive Workspaces</span>
              <Sparkles className="w-5 h-5 text-cyan-600" />
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore prescribed theoretical units, code in simulated Python runtimes, or test queries in SQLite.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md self-start sm:self-auto">
            Course Code: 22DS102006
          </span>
        </div>

        {/* 3 Main Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* -------------------------------------------------------- */}
          {/* CARD 1: MODULES PAGE (01 - CURRICULUM)                   */}
          {/* -------------------------------------------------------- */}
          <div className="bg-[#fffdfa] rounded-2xl border border-amber-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              {/* Top Tag & Illustration */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold tracking-wider uppercase border border-amber-300/60">
                  <BookOpen className="w-3 h-3 text-amber-700" />
                  <span>01 - CURRICULUM</span>
                </span>

                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shadow-2xs">
                  🎓
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-800 transition-colors">
                  Modules
                </h3>
                <p className="text-[11px] font-semibold text-amber-700 mt-0.5">
                  5 Modules • 45 Total Periods
                </p>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">
                  Official prescribed syllabus for Data Science. Explore theoretical foundations, feature extraction, data visualization, statistical thinking, and time-series modeling.
                </p>
              </div>

              {/* Quick Jump List */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <span>Modules List:</span>
                  <button
                    onClick={() => onNavigate('modules')}
                    className="text-amber-700 hover:text-amber-900 normal-case font-semibold cursor-pointer"
                  >
                    View all modules →
                  </button>
                </div>

                <div className="space-y-1.5">
                  {modules.slice(0, 5).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => (onSelectModule ? onSelectModule(m.id) : onNavigate('modules'))}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-amber-200/70 bg-amber-50/50 hover:bg-amber-100/70 text-slate-800 text-[11px] font-medium text-left transition-all hover:translate-x-0.5 cursor-pointer group/item"
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span className="truncate font-semibold text-slate-800 group-hover/item:text-amber-900">
                          {m.pdfTitle || m.title}
                        </span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-amber-600 shrink-0 opacity-60 group-hover/item:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="pt-4 mt-4 border-t border-amber-200/60 flex items-center justify-between">
              <button
                onClick={() => onNavigate('modules')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <span>Open All Modules</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-medium text-slate-400">
                45 Periods
              </span>
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/* CARD 2: EXPERIMENTS PAGE (02 - PRACTICALS)               */}
          {/* -------------------------------------------------------- */}
          <div className="bg-[#fafffd] rounded-2xl border border-emerald-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              {/* Top Tag & Illustration */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold tracking-wider uppercase border border-emerald-300/60">
                  <FlaskConical className="w-3 h-3 text-emerald-700" />
                  <span>02 - PRACTICALS</span>
                </span>

                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shadow-2xs">
                  🧪
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  Experiments
                </h3>
                <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                  {experiments.length} Experiments • Python 3.12 Runtime
                </p>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">
                  Interactive hands-on laboratory experiments with live Python execution, dataset inspection, step-by-step guidance, and real-time outputs.
                </p>
              </div>

              {/* Quick Jump List */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <span>Experiments List ({experiments.length}):</span>
                  <button
                    onClick={() => onNavigate('catalogue')}
                    className="text-emerald-700 hover:text-emerald-900 normal-case font-semibold cursor-pointer"
                  >
                    View all experiments →
                  </button>
                </div>

                <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                  {experiments.map((exp) => (
                    <button
                      key={exp.id}
                      onClick={() => onSelectExperiment(exp)}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-emerald-200/70 bg-emerald-50/50 hover:bg-emerald-100/70 text-slate-800 text-[11px] font-medium text-left transition-all hover:translate-x-0.5 cursor-pointer group/item"
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="truncate font-semibold text-slate-800 group-hover/item:text-emerald-900">
                          Experiment {exp.expNumber}: {exp.name}
                        </span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-emerald-600 shrink-0 opacity-60 group-hover/item:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="pt-4 mt-4 border-t border-emerald-200/60 flex items-center justify-between">
              <button
                onClick={() => onNavigate('catalogue')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <span>Open All Experiments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
                <span>{experiments.length} Experiments</span>
              </span>
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/* CARD 3: TOOLS & WORKBENCH (03 - ECOSYSTEM)               */}
          {/* -------------------------------------------------------- */}
          <div className="bg-[#fbfaff] rounded-2xl border border-purple-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              {/* Top Tag & Illustration */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 text-[10px] font-bold tracking-wider uppercase border border-purple-300/60">
                  <Wrench className="w-3 h-3 text-purple-700" />
                  <span>03 - ECOSYSTEM</span>
                </span>

                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl shadow-2xs">
                  🗄️
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-purple-800 transition-colors">
                  Tools & Workbench
                </h3>
                <p className="text-[11px] font-semibold text-purple-700 mt-0.5">
                  {INITIAL_TOOLS.length} Toolchains • Interactive Sandboxes
                </p>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">
                  Interactive developer toolchains, database exploration sandboxes, data wrangling stations, and terminal playground for live data engineering.
                </p>
              </div>

              {/* Quick Jump List */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <span>Tools List:</span>
                  <button
                    onClick={() => onNavigate('tools')}
                    className="text-purple-700 hover:text-purple-900 normal-case font-semibold cursor-pointer"
                  >
                    View all tools →
                  </button>
                </div>

                <div className="space-y-1.5">
                  {INITIAL_TOOLS.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => onNavigate('tools')}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-purple-200/70 bg-purple-50/50 hover:bg-purple-100/70 text-slate-800 text-[11px] font-medium text-left transition-all hover:translate-x-0.5 cursor-pointer group/item"
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                        <span className="truncate font-semibold text-slate-800 group-hover/item:text-purple-900">
                          {tool.name}
                        </span>
                        <span className="text-[10px] text-purple-600/80 font-normal shrink-0">
                          ({tool.category})
                        </span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-purple-600 shrink-0 opacity-60 group-hover/item:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="pt-4 mt-4 border-t border-purple-200/60 flex items-center justify-between">
              <button
                onClick={() => onNavigate('tools')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <span>Open Tools Workbench</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-medium text-slate-400">
                {INITIAL_TOOLS.length} Toolchains
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
