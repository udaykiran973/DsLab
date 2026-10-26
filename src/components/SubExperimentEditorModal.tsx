import React, { useState } from 'react';
import { X, Save, FileCode, Target } from 'lucide-react';
import { SubExperiment } from '../types/lab';

interface SubExperimentEditorModalProps {
  subExperiment: SubExperiment | null;
  isNew: boolean;
  onSave: (savedSub: SubExperiment) => void;
  onClose: () => void;
}

export const SubExperimentEditorModal: React.FC<SubExperimentEditorModalProps> = ({
  subExperiment,
  isNew,
  onSave,
  onClose
}) => {
  const [name, setName] = useState(subExperiment?.name || 'New Sub-Experiment');
  const [aim, setAim] = useState(
    subExperiment?.aim || 'To implement and analyze the data science workflow using Python.'
  );
  const [code, setCode] = useState(
    subExperiment?.code || 'import pandas as pd\nimport numpy as np\n\nprint("Sub-experiment initialized")\n'
  );
  const [expectedOutput, setExpectedOutput] = useState(
    subExperiment?.expectedOutput || 'Sub-experiment initialized'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: subExperiment?.id || `sub-${Date.now()}`,
      name: name.trim() || 'Untitled Sub-Experiment',
      aim: aim.trim(),
      code,
      expectedOutput,
      lastModified: new Date().toLocaleDateString(),
      files: subExperiment?.files
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-fadeIn">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold">
              {isNew ? 'Add New Sub-Experiment' : 'Edit Sub-Experiment Details'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Sub-Experiment Title
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-blue-600" />
              <span>Aim of Sub-Experiment</span>
            </label>
            <textarea
              value={aim}
              onChange={(e) => setAim(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Python 3 Source Code
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={8}
              className="w-full p-3 font-mono text-xs bg-slate-950 text-emerald-300 border border-slate-800 rounded-lg focus:outline-none"
              spellCheck={false}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Expected Output
            </label>
            <textarea
              value={expectedOutput}
              onChange={(e) => setExpectedOutput(e.target.value)}
              rows={4}
              className="w-full p-3 font-mono text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-lg focus:outline-none"
              spellCheck={false}
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Sub-Experiment</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
