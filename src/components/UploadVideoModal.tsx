import React, { useState, useRef } from 'react';
import { X, Upload, Video, RotateCcw, Check } from 'lucide-react';
import { Experiment } from '../types/lab';
import { RESPECTIVE_EXPERIMENT_VIDEOS, OFFICIAL_DEFAULT_VIDEO, saveCustomDefaultVideo } from '../data/videoService';

interface UploadVideoModalProps {
  experiment: Experiment | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveVideo?: (newUrl: string, newThumb?: string) => void;
  onSaveDefaultVideo?: (newUrl: string, newThumb?: string) => void;
  onResetToDefault?: () => void;
}

export const UploadVideoModal: React.FC<UploadVideoModalProps> = ({
  experiment,
  isOpen,
  onClose,
  onSaveVideo,
  onSaveDefaultVideo,
  onResetToDefault
}) => {
  const [videoUrl, setVideoUrl] = useState(experiment?.videoUrl || OFFICIAL_DEFAULT_VIDEO);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    setVideoUrl(blobUrl);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (experiment && onSaveVideo) {
      onSaveVideo(videoUrl);
    } else if (onSaveDefaultVideo) {
      saveCustomDefaultVideo(videoUrl);
      onSaveDefaultVideo(videoUrl);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn">
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold">
              {experiment ? `Configure Video · Exp ${experiment.expNumber}` : 'Configure Default Lab Video'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleApply} className="p-5 space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition-colors">
            <Upload className="w-7 h-7 text-blue-600 mb-2" />
            <p className="text-xs font-semibold text-slate-700">Upload Local Video File (.mp4 / .webm)</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg"
            >
              Choose Video File
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Or Select Built-in Curriculum Video
            </label>
            <select
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            >
              <option value={OFFICIAL_DEFAULT_VIDEO}>Default Lab Overview ({OFFICIAL_DEFAULT_VIDEO})</option>
              {RESPECTIVE_EXPERIMENT_VIDEOS.map((v) => (
                <option key={v.expNumber} value={v.videoUrl}>
                  Exp {v.expNumber}: {v.title}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            {onResetToDefault ? (
              <button
                type="button"
                onClick={() => {
                  onResetToDefault();
                  onClose();
                }}
                className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Respective</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply Video</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
