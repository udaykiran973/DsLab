import React, { useState } from 'react';
import { Wrench, ExternalLink, Play, Terminal, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { ToolInfo } from '../types/lab';
import { executePythonCode } from '../services/codelabService';
import { ScientificPlotView } from './ScientificPlotView';

interface ToolsViewProps {
  tools: ToolInfo[];
  onSelectExperimentTool?: () => void;
}

export const ToolsView: React.FC<ToolsViewProps> = ({ tools, onSelectExperimentTool }) => {
  const [selectedTool, setSelectedTool] = useState<ToolInfo>(tools[0]);
  const [sandboxCode, setSandboxCode] = useState<string>(tools[0]?.sampleCode || '');
  const [output, setOutput] = useState<string>('');
  const [plotType, setPlotType] = useState<string | undefined>(undefined);
  const [isRunning, setIsRunning] = useState(false);

  const handleSelectTool = (tool: ToolInfo) => {
    setSelectedTool(tool);
    setSandboxCode(tool.sampleCode);
    setOutput('');
    setPlotType(undefined);
  };

  const handleRunSandbox = async () => {
    setIsRunning(true);
    try {
      const res = await executePythonCode(sandboxCode);
      setOutput(res.stdout || res.stderr);
      setPlotType(res.plotImage);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>Data Science Ecosystem & Sandbox</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Tools & Interactive Workbench
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Explore core Python libraries, API syntax references, and test live snippets in the sandbox.
          </p>
        </div>

        {onSelectExperimentTool && (
          <button
            onClick={onSelectExperimentTool}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
          >
            Open Lab Catalogue →
          </button>
        )}
      </div>

      {/* Tool Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {tools.map((tool) => {
          const isSelected = tool.id === selectedTool.id;
          return (
            <button
              key={tool.id}
              onClick={() => handleSelectTool(tool)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-purple-50 border-purple-500 text-purple-950 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="text-xs font-bold truncate">{tool.name}</div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">{tool.category}</div>
              <div className="mt-1.5 inline-block px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                v{tool.version}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Tool Detail & Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">
                {selectedTool.category} · v{selectedTool.version}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">{selectedTool.name}</h2>
            </div>
            <a
              href={selectedTool.docsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
            >
              <span>Official Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">{selectedTool.description}</p>

          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-purple-600" />
              <span>Key Functions & Syntax</span>
            </h3>
            {selectedTool.keyFunctions.map((fn, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{fn.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-[11px] text-slate-500">{fn.desc}</p>
                <code className="block text-[11px] font-mono text-purple-800 bg-purple-100/60 px-2 py-1 rounded mt-1">
                  {fn.syntax}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Live Sandbox Runner */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-md flex flex-col">
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-200 font-semibold">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span>{selectedTool.name} Live Sandbox</span>
            </div>
            <button
              onClick={handleRunSandbox}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isRunning ? 'Executing...' : 'Run Snippet'}</span>
            </button>
          </div>

          <textarea
            value={sandboxCode}
            onChange={(e) => setSandboxCode(e.target.value)}
            className="w-full h-56 p-4 font-mono text-xs text-emerald-300 bg-slate-900 border-b border-slate-800 focus:outline-none resize-none"
            spellCheck={false}
          />

          <div className="p-4 bg-slate-950 flex-1 space-y-3">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Standard Output</span>
            </div>
            <pre className="text-xs font-mono text-slate-200 whitespace-pre-wrap">
              {output || '# Click "Run Snippet" to execute code in the sandbox'}
            </pre>
            {plotType && <ScientificPlotView plotType={plotType} />}
          </div>
        </div>
      </div>
    </div>
  );
};
