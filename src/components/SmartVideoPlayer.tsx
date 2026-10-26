import React, { useState, useRef } from 'react';
import { Play, Video, Upload, Sparkles, RotateCcw, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface SmartVideoPlayerProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title: string;
  onOpenUploadModal?: () => void;
  onOpenDefaultVideoModal?: () => void;
  onLoadDefaultVideo?: () => void;
}

export const SmartVideoPlayer: React.FC<SmartVideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  title,
  onOpenUploadModal,
  onLoadDefaultVideo
}) => {
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const effectiveUrl = videoUrl || '/videos/default_lab_demo.mp4?v=2';

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950 shadow-sm">
      <div className="px-3 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
        <div className="flex items-center gap-1.5 font-semibold truncate">
          <Video className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">Code &amp; Output Execution Video</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {onOpenUploadModal && (
            <button
              onClick={onOpenUploadModal}
              className="px-2 py-0.5 rounded bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 text-[10px] font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Upload className="w-2.5 h-2.5" />
              <span>Replace</span>
            </button>
          )}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleFullscreen}
            className="p-1 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
            title="Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="relative aspect-video bg-slate-950 flex items-center justify-center">
        {!hasError ? (
          <video
            ref={videoRef}
            key={effectiveUrl}
            src={effectiveUrl}
            poster={thumbnailUrl}
            controls
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onError={() => setHasError(true)}
            className="w-full h-full object-contain bg-slate-950"
          />
        ) : (
          <div className="p-6 text-center space-y-2">
            <Play className="w-8 h-8 text-blue-400 mx-auto" />
            <p className="text-xs font-semibold text-slate-200">{title}</p>
            <div className="flex items-center justify-center gap-2 pt-1">
              {onLoadDefaultVideo && (
                <button
                  onClick={() => {
                    setHasError(false);
                    onLoadDefaultVideo();
                  }}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Load Default</span>
                </button>
              )}
              {onOpenUploadModal && (
                <button
                  onClick={onOpenUploadModal}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Upload MP4</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
