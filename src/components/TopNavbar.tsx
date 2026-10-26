import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Menu, 
  Search, 
  X, 
  Home, 
  FlaskConical, 
  BookOpen, 
  Wrench, 
  ArrowRight,
  Code2,
  Layers,
  Sparkles
} from 'lucide-react';
import { NavTab } from './Sidebar';
import { Experiment, StudentProfile } from '../types/lab';
import { CURRICULUM_MODULES } from '../data/modulesData';
import { INITIAL_TOOLS } from '../data/labData';

interface TopNavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onToggleMenu: () => void;
  profile: StudentProfile;
  experiments: Experiment[];
  onSelectExperiment: (exp: Experiment) => void;
  onSelectModule?: (modNum: number) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentTab,
  onSelectTab,
  onToggleMenu,
  profile,
  experiments,
  onSelectExperiment,
  onSelectModule
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close search popover on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const cleanQuery = searchQuery.trim().toLowerCase();

  // Instant reactive search results across Experiments, Sub-experiments, Modules, and Tools
  const searchResults = useMemo(() => {
    if (!cleanQuery) return null;

    const matchedExperiments = experiments.filter((e) =>
      e.name.toLowerCase().includes(cleanQuery) ||
      e.description.toLowerCase().includes(cleanQuery) ||
      e.category.toLowerCase().includes(cleanQuery) ||
      `exp ${e.expNumber}`.includes(cleanQuery) ||
      `experiment ${e.expNumber}`.includes(cleanQuery)
    ).slice(0, 4);

    const matchedParts = experiments.flatMap((exp) =>
      (exp.subExperiments || []).map((sub) => ({ sub, exp }))
    ).filter(({ sub }) =>
      sub.name.toLowerCase().includes(cleanQuery) ||
      sub.aim.toLowerCase().includes(cleanQuery)
    ).slice(0, 4);

    const matchedModules = CURRICULUM_MODULES.filter((m) =>
      m.title.toLowerCase().includes(cleanQuery) ||
      m.allTopics.some((t) => t.toLowerCase().includes(cleanQuery)) ||
      `unit ${m.number}`.includes(cleanQuery) ||
      `module ${m.number}`.includes(cleanQuery)
    ).slice(0, 3);

    const matchedTools = INITIAL_TOOLS.filter((t) =>
      t.name.toLowerCase().includes(cleanQuery) ||
      t.category.toLowerCase().includes(cleanQuery) ||
      t.description.toLowerCase().includes(cleanQuery)
    ).slice(0, 3);

    const totalCount =
      matchedExperiments.length +
      matchedParts.length +
      matchedModules.length +
      matchedTools.length;

    return {
      experiments: matchedExperiments,
      parts: matchedParts,
      modules: matchedModules,
      tools: matchedTools,
      totalCount
    };
  }, [cleanQuery, experiments]);

  const handleSelectExp = (exp: Experiment) => {
    onSelectExperiment(exp);
    setIsFocused(false);
    setSearchQuery('');
  };

  const handleSelectMod = (modNum: number) => {
    if (onSelectModule) {
      onSelectModule(modNum);
    } else {
      onSelectTab('modules');
    }
    setIsFocused(false);
    setSearchQuery('');
  };

  const handleSelectTool = () => {
    onSelectTab('tools');
    setIsFocused(false);
    setSearchQuery('');
  };

  // Uniform size for all page icon buttons: w-10 h-10 (40x40px)
  const pageNavButtons = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'catalogue' as NavTab, label: 'Experiments', icon: FlaskConical },
    { id: 'modules' as NavTab, label: 'Modules', icon: BookOpen },
    { id: 'tools' as NavTab, label: 'Tools', icon: Wrench },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Menu Toggle Button & Brand Title */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleMenu}
            className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200/90 shadow-2xs flex items-center justify-center transition-all cursor-pointer group"
            aria-label="Open Navigation Menu"
            title="Open Menu"
          >
            <Menu className="w-5 h-5 transition-transform group-hover:scale-105" />
          </button>

          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-600 transition-colors shrink-0">
              <FlaskConical className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
            </div>
            <div className="hidden sm:block min-w-0">
              <span className="font-bold text-sm text-slate-900 tracking-tight block truncate group-hover:text-blue-600 transition-colors">
                Data Science
              </span>
              <span className="text-[10px] text-slate-500 font-medium block -mt-0.5">
                Subject Digital Library
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar (Expands smoothly on touch / focus) */}
        <div ref={searchContainerRef} className="relative flex-1 max-w-xl flex justify-center mx-1 sm:mx-2">
          <div
            className={`relative flex items-center rounded-xl border transition-all duration-300 ease-in-out ${
              isFocused
                ? 'w-full sm:w-[420px] md:w-[480px] lg:w-[540px] border-blue-500 ring-2 ring-blue-500/20 bg-white shadow-md'
                : 'w-44 sm:w-56 md:w-64 border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 shadow-2xs'
            }`}
          >
            <Search className={`w-4 h-4 ml-3 shrink-0 transition-colors ${
              isFocused ? 'text-blue-600' : 'text-slate-400'
            }`} />

            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder={isFocused ? 'Search experiments, topics, code...' : 'Search...'}
              className="w-full py-2 pl-2.5 pr-8 text-xs bg-transparent border-none outline-none text-slate-800 placeholder-slate-400"
            />

            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  inputRef.current?.focus();
                }}
                className="absolute right-2 p-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="absolute right-2 hidden sm:flex items-center text-[10px] font-mono text-slate-400 select-none">
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-semibold shadow-2xs">
                  /
                </kbd>
              </div>
            )}
          </div>

          {/* Interactive Live Search Dropdown */}
          {isFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fadeIn max-h-[460px] flex flex-col text-left">
              {searchQuery.trim() ? (
                searchResults && searchResults.totalCount > 0 ? (
                  <div className="overflow-y-auto p-2 divide-y divide-slate-100 max-h-[380px]">
                    {/* Experiments Matches */}
                    {searchResults.experiments.length > 0 && (
                      <div className="py-1.5">
                        <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                          <FlaskConical className="w-3 h-3" /> Experiments ({searchResults.experiments.length})
                        </div>
                        {searchResults.experiments.map((exp) => (
                          <div
                            key={exp.id}
                            onClick={() => handleSelectExp(exp)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-blue-50/70 cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800">
                                Exp {exp.expNumber}
                              </span>
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                                  {exp.name}
                                </div>
                                <div className="text-[10px] text-slate-500 truncate">
                                  {exp.category} · {exp.subExperiments?.length || 0} sub-experiments
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Sub-Experiments Matches */}
                    {searchResults.parts.length > 0 && (
                      <div className="py-1.5">
                        <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                          <Code2 className="w-3 h-3" /> Sub-Experiments ({searchResults.parts.length})
                        </div>
                        {searchResults.parts.map(({ sub, exp }) => (
                          <div
                            key={`${exp.id}-${sub.id}`}
                            onClick={() => handleSelectExp(exp)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/70 cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                                {sub.name.split(':')[0]}
                              </span>
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                                  {sub.name}
                                </div>
                                <div className="text-[10px] text-slate-500 truncate">
                                  In Exp {exp.expNumber}: {exp.name}
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Modules Matches */}
                    {searchResults.modules.length > 0 && (
                      <div className="py-1.5">
                        <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                          <Layers className="w-3 h-3" /> Curriculum Modules ({searchResults.modules.length})
                        </div>
                        {searchResults.modules.map((m) => (
                          <div
                            key={`mod-${m.number}`}
                            onClick={() => handleSelectMod(m.number)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-amber-50/70 cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800">
                                Unit 0{m.number}
                              </span>
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-slate-900 truncate group-hover:text-amber-800 transition-colors">
                                  {m.title}
                                </div>
                                <div className="text-[10px] text-slate-500 truncate">
                                  {m.periods} Periods · {m.pdfPages} Pages
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tools Matches */}
                    {searchResults.tools.length > 0 && (
                      <div className="py-1.5">
                        <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                          <Wrench className="w-3 h-3" /> Tools ({searchResults.tools.length})
                        </div>
                        {searchResults.tools.map((t) => (
                          <div
                            key={t.id}
                            onClick={handleSelectTool}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-purple-50/70 cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 text-purple-800">
                                {t.name}
                              </span>
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-slate-900 truncate group-hover:text-purple-700 transition-colors">
                                  {t.name} ({t.version})
                                </div>
                                <div className="text-[10px] text-slate-500 truncate">
                                  {t.category}
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2 text-slate-400">
                      <Search className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-semibold text-slate-800">
                      No matches found for "{searchQuery}"
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Try searching CSV, Outliers, SQLite, Regression, or Experiment 1-10
                    </div>
                  </div>
                )
              ) : (
                /* Empty query quick suggestions */
                <div className="p-3">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-blue-500" /> Quick Experiments
                  </div>
                  <div className="space-y-1 mt-1">
                    {experiments.slice(0, 5).map((exp) => (
                      <div
                        key={exp.id}
                        onClick={() => handleSelectExp(exp)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-blue-50/70 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-blue-600">
                            Exp {exp.expNumber}
                          </span>
                          <span className="text-xs font-medium text-slate-700 group-hover:text-blue-600">
                            {exp.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {exp.subExperiments?.length || 0} parts
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Same-size page icon buttons (All w-10 h-10) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {pageNavButtons.map((btn) => {
            const Icon = btn.icon;
            const isActive = currentTab === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => onSelectTab(btn.id)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative shadow-2xs group ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-xs ring-2 ring-blue-600/30'
                    : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/90'
                }`}
                title={btn.label}
                aria-label={btn.label}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-900'
                }`} />

                {/* Subtle active dot on mobile/desktop */}
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-white" />
                )}
              </button>
            );
          })}

          {/* Student Avatar Icon Button (Same size: w-10 h-10) */}
          <button
            onClick={() => onSelectTab('home')}
            className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center overflow-hidden ring-1 ring-slate-200 shadow-2xs cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all shrink-0"
            title={`${profile.name} (${profile.rollNo})`}
            aria-label="Student Profile"
          >
            <img
              src={profile.avatarUrl || '/profile.jpg'}
              alt={profile.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </button>
        </div>

      </div>
    </header>
  );
};
