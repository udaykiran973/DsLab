import React, { useState } from 'react';
import { Search, ChevronRight, Video, FileCode, CheckCircle2, SlidersHorizontal, Upload, Sparkles, ExternalLink } from 'lucide-react';
import { Experiment } from '../types/lab';
import { UploadVideoModal } from './UploadVideoModal';

interface ExperimentsCatalogueProps {
  experiments: Experiment[];
  onSelectExperiment: (exp: Experiment) => void;
  onUpdateExperiment?: (exp: Experiment) => void;
}

export const ExperimentsCatalogue: React.FC<ExperimentsCatalogueProps> = ({
  experiments,
  onSelectExperiment,
  onUpdateExperiment
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDefaultVideoModalOpen, setIsDefaultVideoModalOpen] = useState(false);

  const filteredExperiments = experiments.filter((exp) => {
    const matchesSearch =
      exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      exp.subExperiments.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Laboratory Experiments Catalogue
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Complete curriculum repository of empirical data science experiments, sub-modules, and executable notebooks.
          </p>
        </div>

        {/* Search & Default Video Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experiments, tools..."
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs"
            />
          </div>

          <button
            onClick={() => setIsDefaultVideoModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs shrink-0 transition-colors"
            title="Upload or configure default laboratory demonstration video"
          >
            <Upload className="w-3.5 h-3.5 text-blue-400" />
            <span>Upload Default Video</span>
          </button>
        </div>
      </div>

      {/* Experiments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiments.map((exp) => (
          <div
            key={exp.id}
            onClick={() => onSelectExperiment(exp)}
            className="group bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
          >
            {/* Experiment Image Preview Header */}
            <div className="relative h-44 bg-slate-900 overflow-hidden">
              {exp.previewImage ? (
                <img
                  src={exp.previewImage}
                  alt={exp.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                  <FileCode className="w-10 h-10" />
                </div>
              )}

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Header Badges / Status */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                <span className="font-mono font-semibold px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs">
                  EXP-{exp.expNumber.toString().padStart(2, '0')}
                </span>
                {exp.videoUrl && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-600/90 text-white backdrop-blur-xs text-[10px] font-medium shadow-xs">
                    <Video className="w-3 h-3" />
                    <span>{exp.videoUrl.includes('exp') ? `Respective Demo` : 'Video Demo'}</span>
                  </span>
                )}
              </div>

              {/* Module kicker at bottom of image */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">
                  Module {exp.moduleId} · {exp.category}
                </span>
              </div>
            </div>

            {/* Experiment Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {exp.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {exp.description}
                </p>
              </div>

              {/* Sub-Experiments List Preview */}
              <div className="pt-2 border-t border-slate-100">
                <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Sub-Experiments ({exp.subExperiments.length})</span>
                </div>
                <div className="space-y-1">
                  {exp.subExperiments.slice(0, 3).map((sub) => (
                    <div
                      key={sub.id}
                      className="text-xs text-slate-600 truncate flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="truncate">{sub.name}</span>
                    </div>
                  ))}
                  {exp.subExperiments.length > 3 && (
                    <div className="text-[11px] text-slate-400 pl-3">
                      +{exp.subExperiments.length - 3} more sub-experiments
                    </div>
                  )}
                </div>
              </div>

              {/* Tools, GitHub Repository & View Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                {/* Tools metadata (unboxed, separated by middot) */}
                <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate max-w-[140px]">
                  {exp.tools.map((tool, i) => (
                    <React.Fragment key={tool}>
                      <span>{tool}</span>
                      {i < exp.tools.length - 1 && <span className="text-slate-300">·</span>}
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <a
                    href={exp.githubUrl || `https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds${exp.expNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white text-[11px] font-semibold transition-colors border border-slate-200"
                    title={`Open GitHub Repository (ds${exp.expNumber})`}
                  >
                    <span>GitHub (ds{exp.expNumber})</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-1 text-blue-600 font-medium group-hover:translate-x-0.5 transition-transform shrink-0">
                    <span>View Lab</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Default Video Modal */}
      <UploadVideoModal
        experiment={null}
        isOpen={isDefaultVideoModalOpen}
        onClose={() => setIsDefaultVideoModalOpen(false)}
        onSaveDefaultVideo={(newUrl, newThumb) => {
          if (onUpdateExperiment) {
            experiments.forEach((e) => {
              onUpdateExperiment({
                ...e,
                videoUrl: newUrl,
                videoThumbnail: newThumb || e.videoThumbnail
              });
            });
          }
        }}
      />
    </div>
  );
};
