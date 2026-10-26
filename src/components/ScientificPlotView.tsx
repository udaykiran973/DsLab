import React from 'react';

interface ScientificPlotViewProps {
  plotType: string;
}

export const ScientificPlotView: React.FC<ScientificPlotViewProps> = ({ plotType }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 text-xs">
        <span className="font-bold text-slate-800">
          Matplotlib / Seaborn Figure Output ({plotType.toUpperCase()})
        </span>
        <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
          DPI: 300 · Rendered
        </span>
      </div>

      <div className="w-full flex items-center justify-center bg-slate-50 rounded-lg p-4 border border-slate-200/70">
        {plotType === 'bar' ? (
          <svg viewBox="0 0 500 240" className="w-full max-w-xl h-56">
            <line x1="50" y1="20" x2="50" y2="200" stroke="#475569" strokeWidth="2" />
            <line x1="50" y1="200" x2="460" y2="200" stroke="#475569" strokeWidth="2" />
            {[
              { x: 85, h: 130, label: 'Alice', color: '#2563eb' },
              { x: 175, h: 110, label: 'Bob', color: '#0284c7' },
              { x: 265, h: 155, label: 'Charlie', color: '#0d9488' },
              { x: 355, h: 140, label: 'David', color: '#4f46e5' }
            ].map((b, i) => (
              <g key={i}>
                <rect x={b.x} y={200 - b.h} width="50" height={b.h} rx="4" fill={b.color} />
                <text x={b.x + 25} y="220" textAnchor="middle" fontSize="11" fill="#334155">
                  {b.label}
                </text>
              </g>
            ))}
          </svg>
        ) : plotType === 'scatter' || plotType === 'clusters' ? (
          <svg viewBox="0 0 500 240" className="w-full max-w-xl h-56">
            <line x1="50" y1="20" x2="50" y2="200" stroke="#475569" strokeWidth="2" />
            <line x1="50" y1="200" x2="460" y2="200" stroke="#475569" strokeWidth="2" />
            {[
              [90, 160, '#2563eb'], [110, 145, '#2563eb'], [130, 155, '#2563eb'],
              [230, 100, '#10b981'], [255, 85, '#10b981'], [275, 110, '#10b981'],
              [360, 60, '#f59e0b'], [385, 50, '#f59e0b'], [410, 70, '#f59e0b']
            ].map(([cx, cy, c], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="6" fill={String(c)} opacity="0.85" />
            ))}
          </svg>
        ) : (
          <svg viewBox="0 0 500 240" className="w-full max-w-xl h-56">
            <line x1="50" y1="20" x2="50" y2="200" stroke="#475569" strokeWidth="2" />
            <line x1="50" y1="200" x2="460" y2="200" stroke="#475569" strokeWidth="2" />
            <polyline
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              points="60,165 115,135 170,148 225,105 280,118 335,78 390,90 445,52"
            />
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5,5"
              points="60,175 115,150 170,138 225,120 280,108 335,92 390,78 445,64"
            />
          </svg>
        )}
      </div>
    </div>
  );
};
