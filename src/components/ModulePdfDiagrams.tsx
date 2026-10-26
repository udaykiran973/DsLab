import React from 'react';

interface ModulePdfDiagramsProps {
  type: string;
}

export const ModulePdfDiagrams: React.FC<ModulePdfDiagramsProps> = ({ type }) => {
  return (
    <div className="my-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center">
      <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-bold mb-2">
        Curriculum Figure · {type.toUpperCase()} Architecture
      </span>
      <svg viewBox="0 0 520 140" className="w-full max-w-lg h-32">
        <rect x="20" y="30" width="130" height="80" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        <text x="85" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
          Data Ingestion
        </text>
        <text x="85" y="83" textAnchor="middle" fontSize="9.5" fill="#1e40af">
          CSV · JSON · SQL
        </text>

        <line x1="150" y1="70" x2="195" y2="70" stroke="#64748b" strokeWidth="2" />

        <rect x="195" y="30" width="130" height="80" rx="10" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
        <text x="260" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">
          Feature Pipeline
        </text>
        <text x="260" y="83" textAnchor="middle" fontSize="9.5" fill="#047857">
          NumPy · Pandas · PCA
        </text>

        <line x1="325" y1="70" x2="370" y2="70" stroke="#64748b" strokeWidth="2" />

        <rect x="370" y="30" width="130" height="80" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="435" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#5b21b6">
          Analytics & ML
        </text>
        <text x="435" y="83" textAnchor="middle" fontSize="9.5" fill="#6d28d9">
          Visuals & Inference
        </text>
      </svg>
    </div>
  );
};
