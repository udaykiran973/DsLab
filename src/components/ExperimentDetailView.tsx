import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Edit3, 
  Plus, 
  Copy, 
  RotateCcw, 
  Download, 
  Trash2, 
  Check, 
  AlertCircle, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Layers,
  Sparkles,
  Terminal,
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { Experiment, SubExperiment, ExecutionResult } from '../types/lab';
import { SmartVideoPlayer } from './SmartVideoPlayer';
import { SubExperimentEditorModal } from './SubExperimentEditorModal';
import { UploadVideoModal } from './UploadVideoModal';
import { ScientificPlotView } from './ScientificPlotView';
import { executePythonCode } from '../services/codelabService';
import { ALL_EXPERIMENTS } from '../data/experimentsData';
import { 
  getCustomDefaultVideo, 
  RESPECTIVE_EXPERIMENT_VIDEOS, 
  OFFICIAL_DEFAULT_VIDEO 
} from '../data/videoService';
import { Video, Upload } from 'lucide-react';

interface ExperimentDetailViewProps {
  experiment: Experiment;
  onBack: () => void;
  onUpdateExperiment: (updated: Experiment) => void;
}

export const ExperimentDetailView: React.FC<ExperimentDetailViewProps> = ({
  experiment,
  onBack,
  onUpdateExperiment
}) => {
  const [activeSubExpId, setActiveSubExpId] = useState<string>(
    experiment.subExperiments[0]?.id || ''
  );
  const [editingSubExp, setEditingSubExp] = useState<SubExperiment | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isUploadVideoOpen, setIsUploadVideoOpen] = useState(false);
  const [isDefaultVideoModalOpen, setIsDefaultVideoModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleLoadDefaultVideo = () => {
    const def = getCustomDefaultVideo();
    const updated: Experiment = {
      ...experiment,
      videoUrl: def.videoUrl,
      videoThumbnail: def.thumbnailUrl || experiment.videoThumbnail
    };
    onUpdateExperiment(updated);
  };

  const handleLoadRespectiveVideo = () => {
    const respective = RESPECTIVE_EXPERIMENT_VIDEOS.find((v) => v.expNumber === experiment.expNumber);
    if (respective) {
      const updated: Experiment = {
        ...experiment,
        videoUrl: respective.videoUrl,
        videoThumbnail: respective.thumbnailUrl || experiment.videoThumbnail
      };
      onUpdateExperiment(updated);
    }
  };

  // Live code state for currently selected sub-experiment
  const activeSubExp = experiment.subExperiments.find((s) => s.id === activeSubExpId) || experiment.subExperiments[0];
  const [codeBuffer, setCodeBuffer] = useState<{ [id: string]: string }>({
    [activeSubExp?.id]: activeSubExp?.code || ''
  });

  const currentCode = codeBuffer[activeSubExp?.id] !== undefined ? codeBuffer[activeSubExp?.id] : activeSubExp?.code || '';

  // Execution states
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [activeOutputTab, setActiveOutputTab] = useState<'terminal' | 'visual' | 'expected'>('terminal');

  const handleSubExpChange = (id: string) => {
    setActiveSubExpId(id);
    const sub = experiment.subExperiments.find((s) => s.id === id);
    if (sub && codeBuffer[id] === undefined) {
      setCodeBuffer((prev) => ({ ...prev, [id]: sub.code }));
    }
    setExecutionResult(null);
  };

  const handleCodeChange = (newCode: string) => {
    if (!activeSubExp) return;
    setCodeBuffer((prev) => ({
      ...prev,
      [activeSubExp.id]: newCode
    }));
  };

  const handleResetCode = () => {
    if (!activeSubExp) return;
    setCodeBuffer((prev) => ({
      ...prev,
      [activeSubExp.id]: activeSubExp.code
    }));
    setExecutionResult(null);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadCode = () => {
    if (!activeSubExp) return;
    const blob = new Blob([currentCode], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeSubExp.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.py`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadFile = (fileName: string) => {
    const dummyContent = `# Dataset File: ${fileName}\n# Exported from Data Science Laboratory System\n`;
    const blob = new Blob([dummyContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRunCode = async () => {
    if (!currentCode) return;
    setIsRunning(true);
    try {
      const res = await executePythonCode(currentCode);
      setExecutionResult(res);
      if (res.plotImage) {
        setActiveOutputTab('visual');
      } else {
        setActiveOutputTab('terminal');
      }
    } catch (err: any) {
      setExecutionResult({
        stdout: '',
        stderr: err?.message || 'Execution error encountered',
        executionTimeMs: 12,
        success: false
      });
      setActiveOutputTab('terminal');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSaveSubExp = (savedSub: SubExperiment) => {
    let updatedSubList: SubExperiment[];

    if (isAddingNew) {
      updatedSubList = [...experiment.subExperiments, savedSub];
      setActiveSubExpId(savedSub.id);
      setCodeBuffer((prev) => ({ ...prev, [savedSub.id]: savedSub.code }));
    } else {
      updatedSubList = experiment.subExperiments.map((s) =>
        s.id === savedSub.id ? savedSub : s
      );
      setCodeBuffer((prev) => ({ ...prev, [savedSub.id]: savedSub.code }));
    }

    const updatedExp: Experiment = {
      ...experiment,
      subExperiments: updatedSubList
    };

    onUpdateExperiment(updatedExp);
    setEditingSubExp(null);
    setIsAddingNew(false);
  };

  const handleDeleteSubExp = (subId: string) => {
    if (experiment.subExperiments.length <= 1) {
      alert('An experiment must contain at least one sub-experiment.');
      return;
    }
    if (!confirm('Are you sure you want to remove this sub-experiment?')) return;

    const remaining = experiment.subExperiments.filter((s) => s.id !== subId);
    const updatedExp: Experiment = {
      ...experiment,
      subExperiments: remaining
    };
    onUpdateExperiment(updatedExp);
    setActiveSubExpId(remaining[0].id);
  };

  if (!activeSubExp) return null;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-sm transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Catalogue</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Experiment {experiment.expNumber}</span>
            <span>·</span>
            <span className="font-medium text-slate-800">{experiment.category}</span>
          </div>
        </div>

        {/* Verification Status & Lab Grade */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          <a
            href={experiment.githubUrl || `https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds${experiment.expNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold transition-colors shadow-2xs"
            title={`Open GitHub Repository: ds${experiment.expNumber}`}
          >
            <span>GitHub Repo (ds{experiment.expNumber})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setIsUploadVideoOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg font-semibold transition-colors shadow-2xs"
            title="Upload or change video demonstration for this experiment"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Video</span>
          </button>
          <button
            onClick={() => setIsDefaultVideoModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg font-medium transition-colors"
            title="Upload or configure default laboratory demonstration video"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Default Video</span>
          </button>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Verified by Faculty</span>
          </div>
        </div>
      </div>

      {/* Main Experiment Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-xs text-blue-700 font-semibold tracking-wide uppercase">
              <span>Practical Experiment {experiment.expNumber}</span>
              <span>·</span>
              <span>Module {experiment.moduleId}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">
              {experiment.name}
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              {experiment.description}
            </p>

            {/* Tools Used (Clean unboxed text metadata with separators) */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-500">
              <span className="font-medium text-slate-700">Tools:</span>
              {experiment.tools.map((tool, idx) => (
                <React.Fragment key={tool}>
                  <span className="text-slate-700">{tool}</span>
                  {idx < experiment.tools.length - 1 && <span className="text-slate-400">·</span>}
                </React.Fragment>
              ))}
            </div>

            {/* GitHub Repository Direct Link */}
            <div className="pt-2">
              <a
                href={experiment.githubUrl || `https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds${experiment.expNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-mono font-medium transition-colors"
              >
                <span>https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds{experiment.expNumber}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              </a>
            </div>
          </div>

          {/* Experiment Video Demonstration */}
          <div className="w-full lg:w-[460px] xl:w-[520px] shrink-0">
            <SmartVideoPlayer
              videoUrl={experiment.videoUrl}
              thumbnailUrl={experiment.videoThumbnail || experiment.previewImage}
              title={experiment.name}
              onOpenUploadModal={() => setIsUploadVideoOpen(true)}
              onOpenDefaultVideoModal={() => setIsDefaultVideoModalOpen(true)}
              onLoadDefaultVideo={handleLoadDefaultVideo}
            />
          </div>
        </div>
      </div>

      {/* Sub-Experiments Navigation Bar (Requirement 4) */}
      <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        <div className="flex items-center gap-1 overflow-x-auto p-1">
          {experiment.subExperiments.map((sub, index) => {
            const isActive = sub.id === activeSubExpId;
            return (
              <button
                key={sub.id}
                onClick={() => handleSubExpChange(sub.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{sub.name}</span>
                {sub.lastModified && (
                  <span className={`text-[10px] ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    •
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            setIsAddingNew(true);
            setEditingSubExp(null);
          }}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors shrink-0 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Sub-Experiment</span>
        </button>
      </div>

      {/* Sub-Experiment Details Section (Requirement 5) */}
      <div className="space-y-6">
        {/* 1. AIM SECTION (Must be displayed ABOVE the code section) */}
        <div className="bg-white rounded-xl border border-blue-200/80 p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-blue-600" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">
                Aim of Sub-Experiment
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-semibold text-slate-800">{activeSubExp.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingSubExp(activeSubExp);
                  setIsAddingNew(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
                title="Edit Aim, Code, Tools"
              >
                <Edit3 className="w-3 h-3 text-slate-500" />
                <span>Edit Details</span>
              </button>
              {experiment.subExperiments.length > 1 && (
                <button
                  onClick={() => handleDeleteSubExp(activeSubExp.id)}
                  className="p-1 text-slate-400 hover:text-red-600 rounded-md transition-colors"
                  title="Delete Sub-Experiment"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <p className="text-sm font-medium text-slate-800 leading-relaxed pl-1">
            {activeSubExp.aim}
          </p>

          {/* Relevant Files and Datasets */}
          {activeSubExp.files && activeSubExp.files.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Associated Datasets:</span>
              {activeSubExp.files.map((file, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDownloadFile(file.name)}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-700 font-mono text-[11px] transition-colors"
                  title="Download Dataset"
                >
                  <FileText className="w-3 h-3 text-blue-600" />
                  <span>{file.name}</span>
                  <span className="text-slate-400">({file.size})</span>
                  <Download className="w-2.5 h-2.5 ml-0.5 text-slate-400" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. CODE SECTION & EXECUTION RUNNER (Requirement 5 & 6) */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-md overflow-hidden">
          {/* Code Header Bar */}
          <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-medium text-slate-200">Python 3 Execution Engine</span>
              </div>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400 font-mono text-[11px]">
                {currentCode.split('\n').length} lines
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors text-[11px]"
                title="Copy Code"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={handleResetCode}
                className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors text-[11px]"
                title="Reset to Original"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleDownloadCode}
                className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors text-[11px]"
                title="Download .py file"
              >
                <Download className="w-3 h-3" />
                <span>Save .py</span>
              </button>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium rounded-lg shadow-sm transition-all text-xs"
              >
                <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : 'fill-white'}`} />
                <span>{isRunning ? 'Running Script...' : 'Run Code'}</span>
              </button>
            </div>
          </div>

          {/* Editable Code Box */}
          <div className="relative">
            <textarea
              value={currentCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full h-80 p-4 font-mono text-xs text-slate-100 bg-slate-900 border-none outline-none resize-y dark-scroll leading-relaxed"
              spellCheck={false}
            />
          </div>
        </div>

        {/* 3. OUTPUT & VISUALIZATIONS SECTION (Requirement 6) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Output Toolbar Tabs */}
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Execution Output</span>
              {executionResult && (
                <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                  <Clock className="w-3 h-3" />
                  {executionResult.executionTimeMs}ms
                </span>
              )}
            </div>

            {/* Segmented Output Filter Controls (Buttons allowed per guidelines) */}
            <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-lg">
              <button
                onClick={() => setActiveOutputTab('terminal')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  activeOutputTab === 'terminal'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Terminal (stdout)
              </button>
              {executionResult?.plotImage && (
                <button
                  onClick={() => setActiveOutputTab('visual')}
                  className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-colors ${
                    activeOutputTab === 'visual'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BarChart3 className="w-3 h-3" />
                  <span>Visualization</span>
                </button>
              )}
              <button
                onClick={() => setActiveOutputTab('expected')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  activeOutputTab === 'expected'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lab Manual Expected
              </button>
            </div>
          </div>

          {/* Tab Views */}
          <div className="p-4">
            {activeOutputTab === 'terminal' && (
              <div className="space-y-3">
                {executionResult ? (
                  <>
                    {executionResult.stderr ? (
                      <div className="p-3 bg-red-950/20 border border-red-200 rounded-lg text-red-700 font-mono text-xs whitespace-pre-wrap">
                        <div className="flex items-center gap-1.5 font-bold mb-1 text-red-800">
                          <AlertCircle className="w-4 h-4" />
                          <span>Standard Error (stderr):</span>
                        </div>
                        {executionResult.stderr}
                      </div>
                    ) : (
                      <div className="bg-slate-950 text-slate-200 p-4 rounded-lg font-mono text-xs overflow-x-auto max-h-72 dark-scroll whitespace-pre leading-relaxed border border-slate-800">
                        {executionResult.stdout}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-slate-950 text-slate-400 p-4 rounded-lg font-mono text-xs overflow-x-auto max-h-72 dark-scroll whitespace-pre leading-relaxed border border-slate-800">
                    {/* Default preview showing expected output until run */}
                    <span className="text-slate-500"># Last verified output:</span>{'\n'}
                    {activeSubExp.expectedOutput}
                  </div>
                )}
              </div>
            )}

            {activeOutputTab === 'visual' && executionResult?.plotImage && (
              <div className="p-2">
                <ScientificPlotView plotType={executionResult.plotImage} />
              </div>
            )}

            {activeOutputTab === 'expected' && (
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg font-mono text-xs text-slate-700 whitespace-pre overflow-x-auto max-h-72 leading-relaxed">
                {activeSubExp.expectedOutput || 'No baseline output specified.'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub-Experiment Editor Modal */}
      {(editingSubExp || isAddingNew) && (
        <SubExperimentEditorModal
          subExperiment={editingSubExp}
          isNew={isAddingNew}
          onSave={handleSaveSubExp}
          onClose={() => {
            setEditingSubExp(null);
            setIsAddingNew(false);
          }}
        />
      )}

      {/* Upload Video Modal for Current Experiment */}
      <UploadVideoModal
        experiment={experiment}
        isOpen={isUploadVideoOpen}
        onClose={() => setIsUploadVideoOpen(false)}
        onSaveVideo={(newUrl, newThumb) => {
          const updated: Experiment = {
            ...experiment,
            videoUrl: newUrl,
            videoThumbnail: newThumb || experiment.videoThumbnail
          };
          onUpdateExperiment(updated);
        }}
        onResetToDefault={() => {
          const respective = RESPECTIVE_EXPERIMENT_VIDEOS.find((e) => e.expNumber === experiment.expNumber);
          if (respective) {
            const updated: Experiment = {
              ...experiment,
              videoUrl: respective.videoUrl,
              videoThumbnail: respective.thumbnailUrl || experiment.videoThumbnail
            };
            onUpdateExperiment(updated);
          }
        }}
      />

      {/* Upload Default Video Modal (Lab-wide default) */}
      <UploadVideoModal
        experiment={null}
        isOpen={isDefaultVideoModalOpen}
        onClose={() => setIsDefaultVideoModalOpen(false)}
        onSaveDefaultVideo={(newUrl, newThumb) => {
          // If current experiment was using default video or if user wants to sync:
          const updated: Experiment = {
            ...experiment,
            videoUrl: newUrl,
            videoThumbnail: newThumb || experiment.videoThumbnail
          };
          onUpdateExperiment(updated);
        }}
      />
    </div>
  );
};
