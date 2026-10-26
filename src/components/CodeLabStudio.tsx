import React, { useState } from 'react';
import { 
  Play, 
  Terminal, 
  RotateCcw, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  Layers, 
  Clock, 
  Database, 
  AlertCircle,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { Experiment, ExecutionResult } from '../types/lab';
import { executePythonCode } from '../services/codelabService';
import { ScientificPlotView } from './ScientificPlotView';

interface CodeLabStudioProps {
  experiments: Experiment[];
  initialCode?: string;
}

export const CodeLabStudio: React.FC<CodeLabStudioProps> = ({ experiments, initialCode }) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('exp-1-sub-1');
  const [code, setCode] = useState<string>(
    initialCode ||
      experiments[0]?.subExperiments[0]?.code ||
      '# Python Data Science Workspace\nimport numpy as np\nprint("CodeLab Ready")\n'
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'terminal' | 'visual'>('terminal');

  const handleSelectPreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedPreset(val);
    const [expId, subId] = val.split(':');
    const targetExp = experiments.find((exp) => exp.id === expId);
    if (targetExp) {
      const targetSub = targetExp.subExperiments.find((sub) => sub.id === subId) || targetExp.subExperiments[0];
      if (targetSub) {
        setCode(targetSub.code);
        setExecutionResult(null);
      }
    }
  };

  const handleRun = async () => {
    if (!code) return;
    setIsRunning(true);
    try {
      const res = await executePythonCode(code);
      setExecutionResult(res);
      if (res.plotImage) {
        setActiveTab('visual');
      } else {
        setActiveTab('terminal');
      }
    } catch (err: any) {
      setExecutionResult({
        stdout: '',
        stderr: err?.message || 'Error executing script',
        executionTimeMs: 15,
        success: false
      });
      setActiveTab('terminal');
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codelab_experiment.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Interactive Python CodeLab
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browser-based computational scientific environment with Python, NumPy, Pandas, Matplotlib, and SQL support.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">Load Experiment:</span>
          <select
            value={selectedPreset}
            onChange={handleSelectPreset}
            className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          >
            {experiments.map((exp) => (
              <optgroup key={exp.id} label={`Exp ${exp.expNumber}: ${exp.name}`}>
                {exp.subExperiments.map((sub) => (
                  <option key={sub.id} value={`${exp.id}:${sub.id}`}>
                    {sub.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      {/* Editor & Execution Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Code Editor Panel */}
        <div className="lg:col-span-7 bg-slate-900 rounded-xl border border-slate-800 shadow-md overflow-hidden flex flex-col">
          <div className="px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <FileCode className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-slate-200">codelab_main.py</span>
              <span className="text-slate-600">·</span>
              <span className="text-[11px] text-slate-400 font-mono">Python 3.10+</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors text-[11px]"
                title="Copy Code"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors text-[11px]"
                title="Download script"
              >
                <Download className="w-3 h-3" />
                <span>Save</span>
              </button>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium rounded-lg shadow-sm transition-all text-xs"
              >
                <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : 'fill-white'}`} />
                <span>{isRunning ? 'Executing...' : 'Run Code'}</span>
              </button>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={18}
            className="w-full p-4 font-mono text-xs text-slate-100 bg-slate-900 border-none outline-none resize-y dark-scroll leading-relaxed flex-1"
            spellCheck={false}
          />
        </div>

        {/* Output & Visualizations Panel */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-600" />
              <span className="font-bold text-slate-800">CodeLab Output</span>
              {executionResult && (
                <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {executionResult.executionTimeMs}ms
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg">
              <button
                onClick={() => setActiveTab('terminal')}
                className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                  activeTab === 'terminal' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Terminal
              </button>
              {executionResult?.plotImage && (
                <button
                  onClick={() => setActiveTab('visual')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                    activeTab === 'visual' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  <BarChart3 className="w-3 h-3" />
                  <span>Plot</span>
                </button>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-4 flex-1 flex flex-col overflow-y-auto max-h-[500px]">
            {activeTab === 'terminal' ? (
              executionResult ? (
                executionResult.stderr ? (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 font-mono text-xs whitespace-pre-wrap">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>Runtime Error:</span>
                    </div>
                    {executionResult.stderr}
                  </div>
                ) : (
                  <div className="bg-slate-950 text-slate-200 p-3.5 rounded-lg font-mono text-xs whitespace-pre overflow-x-auto dark-scroll leading-relaxed border border-slate-800 flex-1">
                    {executionResult.stdout || 'Program executed with no standard output.'}
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400 text-center p-4">
                  <Terminal className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-xs font-medium text-slate-600">No execution results yet.</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Click "Run Code" above to compile and execute the Python script.
                  </p>
                </div>
              )
            ) : (
              executionResult?.plotImage && (
                <div className="p-1">
                  <ScientificPlotView plotType={executionResult.plotImage} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
