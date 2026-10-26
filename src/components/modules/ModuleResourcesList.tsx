import React, { useState } from 'react';
import { ModuleResourceItem, ResourceType } from '../../data/moduleResourcesData';
import { ExternalLink, Clock, FileText, Video, BookOpen } from 'lucide-react';

interface ModuleResourcesListProps {
  resources: ModuleResourceItem[];
  moduleCode: string;
  moduleTitle: string;
}

export const ModuleResourcesList: React.FC<ModuleResourcesListProps> = ({
  resources
}) => {
  const [filter, setFilter] = useState<'all' | ResourceType>('all');

  const filtered = filter === 'all' ? resources : resources.filter((r) => r.type === filter);

  const getTypeIcon = (type: ResourceType) => {
    if (type === 'video') return <Video className="w-3.5 h-3.5 text-slate-600" />;
    if (type === 'book') return <BookOpen className="w-3.5 h-3.5 text-slate-600" />;
    return <FileText className="w-3.5 h-3.5 text-slate-600" />;
  };

  const getTypeName = (type: ResourceType) => {
    if (type === 'video') return 'Lecture Video';
    if (type === 'book') return 'Reference Text';
    return 'Documentation';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5">
          {(['all', 'doc', 'video', 'book'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filter === tab
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {tab === 'all'
                ? `All (${resources.length})`
                : tab === 'doc'
                ? 'Docs'
                : tab === 'video'
                ? 'Videos'
                : 'Books'}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white overflow-hidden">
        {filtered.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-sans font-medium">
                  {getTypeIcon(item.type)}
                  <span>{getTypeName(item.type)}</span>
                </span>
                <span>·</span>
                <span>{item.source}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.duration_or_read_time}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 group-hover:underline">
                {item.title}
              </h4>
              {item.description && (
                <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
              )}
            </div>

            <div className="flex items-center gap-1 text-xs font-medium text-slate-700 shrink-0">
              <span>Open</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
