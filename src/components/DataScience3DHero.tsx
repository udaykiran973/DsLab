import React, { useEffect, useRef, useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Binary, 
  Sigma, 
  Rotate3d, 
  ChevronRight,
  Atom,
  HelpCircle,
  X
} from 'lucide-react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  label?: string;
  color?: string;
}

export const DataScience3DHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [shapeMode, setShapeMode] = useState<'sphere' | 'network' | 'cube'>('network');
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [activeTheoryTab, setActiveTheoryTab] = useState<'overview' | 'math' | 'pipeline'>('overview');

  // Mouse interaction state
  const mouseRef = useRef({ x: 0, y: 0, isHovered: false, rotX: 0, rotY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 320);
    let height = (canvas.height = 200);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 200;
    };
    window.addEventListener('resize', handleResize);

    // Generate 3D nodes based on shape
    const numPoints = 36;
    const points: Point3D[] = [];

    const labels = [
      'X', 'y', 'W', 'b', 'μ', 'σ', 'λ', 'Loss', 'Grad', 'PCA',
      'SVD', 'IQR', 'AUC', 'F1', 'k-Means', 'Tree', 'ReLU', 'Z-Score'
    ];

    const radius = 70;

    for (let i = 0; i < numPoints; i++) {
      let x = 0, y = 0, z = 0;
      if (shapeMode === 'sphere') {
        const phi = Math.acos(-1 + (2 * i) / numPoints);
        const theta = Math.sqrt(numPoints * Math.PI) * phi;
        x = radius * Math.cos(theta) * Math.sin(phi);
        y = radius * Math.sin(theta) * Math.sin(phi);
        z = radius * Math.cos(phi);
      } else if (shapeMode === 'cube') {
        const side = 100;
        x = ((i % 3) - 1) * (side / 2);
        y = ((Math.floor(i / 3) % 3) - 1) * (side / 2);
        z = ((Math.floor(i / 9) % 3) - 1) * (side / 2);
      } else {
        // Network graph / manifold
        const u = (Math.random() - 0.5) * 150;
        const v = (Math.random() - 0.5) * 110;
        const w = Math.sin(u * 0.05) * Math.cos(v * 0.05) * 45;
        x = u;
        y = v;
        z = w;
      }

      points.push({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        vz: (Math.random() - 0.5) * 0.2,
        label: i < labels.length ? labels[i] : undefined,
        color: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#34d399' : '#c084fc'
      });
    }

    let angleY = 0;
    let angleX = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Auto rotation + mouse interaction
      if (!mouseRef.current.isHovered) {
        angleY += 0.008;
        angleX += 0.004;
      } else {
        angleY += (mouseRef.current.rotY - angleY) * 0.05;
        angleX += (mouseRef.current.rotX - angleX) * 0.05;
      }

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 220;

      // Project points to 2D
      const projected = points.map((p) => {
        // Rotate around Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate around X
        let y1 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Perspective scale
        const scale = fov / (fov + z2 + 80);
        const px = cx + x1 * scale;
        const py = cy + y1 * scale;

        return {
          px,
          py,
          scale,
          z: z2,
          color: p.color,
          label: p.label
        };
      });

      // Sort by depth (back to front)
      projected.sort((a, b) => b.z - a.z);

      // 1. Draw glowing connecting lines between nearby points
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].px - projected[j].px;
          const dy = projected[i].py - projected[j].py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = shapeMode === 'network' ? 55 : 45;
          if (dist < maxDist) {
            const alpha = Math.max(0, 1 - dist / maxDist) * 0.45;
            ctx.beginPath();
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[j].px, projected[j].py);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // 2. Draw 3D nodes & labels
      projected.forEach((p) => {
        const radius = Math.max(1.8, 3.5 * p.scale);

        // Outer glow
        const glowAlpha = Math.min(0.5, 0.2 + (p.z + 70) / 200);
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${Math.max(0.05, glowAlpha * 0.3)})`;
        ctx.fill();

        // Node center
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color || '#38bdf8';
        ctx.fill();

        // Optional mathematical symbol label on select nodes
        if (p.label && p.scale > 0.95) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.font = '9px Consolas, monospace';
          ctx.fillText(p.label, p.px + radius + 3, p.py + 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [shapeMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseRef.current.rotY = (x / rect.width) * Math.PI * 1.5;
    mouseRef.current.rotX = -(y / rect.height) * Math.PI * 1.2;
    mouseRef.current.isHovered = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isHovered = false;
  };

  return (
    <div className="space-y-4 pt-2">
      {/* 3D Visualizer & Theory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Left: Interactive 3D Canvas Box */}
        <div className="md:col-span-5 relative bg-sky-950/40 rounded-2xl border border-sky-400/30 overflow-hidden p-3 backdrop-blur-xs group">
          <div className="flex items-center justify-between text-[11px] font-semibold text-sky-200 pb-1.5 border-b border-sky-400/20">
            <span className="flex items-center gap-1.5">
              <Rotate3d className="w-3.5 h-3.5 text-sky-300 animate-spin-slow" />
              <span>3D Data Manifold (Interactive)</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShapeMode('network')}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${
                  shapeMode === 'network' ? 'bg-sky-500 text-white font-bold' : 'text-sky-300 hover:text-white'
                }`}
                title="Neural Graph"
              >
                Graph
              </button>
              <button
                type="button"
                onClick={() => setShapeMode('sphere')}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${
                  shapeMode === 'sphere' ? 'bg-sky-500 text-white font-bold' : 'text-sky-300 hover:text-white'
                }`}
                title="Cluster Sphere"
              >
                Sphere
              </button>
              <button
                type="button"
                onClick={() => setShapeMode('cube')}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${
                  shapeMode === 'cube' ? 'bg-sky-500 text-white font-bold' : 'text-sky-300 hover:text-white'
                }`}
                title="Feature Cube"
              >
                Cube
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative h-44 w-full flex items-center justify-center cursor-grab active:cursor-grabbing">
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full h-full block"
            />
            <div className="absolute bottom-1 right-2 pointer-events-none text-[9px] font-mono text-sky-300/70">
              Drag / Hover to rotate 3D
            </div>
          </div>
        </div>

        {/* Right: Theory Overview Pillars & Formulas */}
        <div className="md:col-span-7 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-200 tracking-wide uppercase">
              <Atom className="w-3.5 h-3.5 text-emerald-300" />
              <span>Core Theory &amp; Mathematical Pillars</span>
            </div>
            <button
              onClick={() => setShowTheoryModal(true)}
              className="text-[11px] font-semibold text-sky-200 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-md border border-white/20 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Detailed Theory</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* 3 Core Theory Badges / Mini Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {/* Pillar 1 */}
            <div className="p-2.5 rounded-xl bg-sky-950/50 border border-sky-400/20 backdrop-blur-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-sky-200 text-[11px]">
                <Sigma className="w-3.5 h-3.5 text-amber-300" />
                <span>1. Statistics &amp; Math</span>
              </div>
              <p className="text-[10px] text-sky-100/80 leading-relaxed">
                Probability mass functions, Z-score distributions, variance, and hypothesis testing (p-value, $t$-tests).
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-2.5 rounded-xl bg-sky-950/50 border border-sky-400/20 backdrop-blur-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-sky-200 text-[11px]">
                <Binary className="w-3.5 h-3.5 text-emerald-300" />
                <span>2. Data Wrangling</span>
              </div>
              <p className="text-[10px] text-sky-100/80 leading-relaxed">
                ETL ingestion (CSV/TSV/JSON), null imputation, outlier filtering, and MultiIndex reshaping.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-2.5 rounded-xl bg-sky-950/50 border border-sky-400/20 backdrop-blur-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-sky-200 text-[11px]">
                <Cpu className="w-3.5 h-3.5 text-purple-300" />
                <span>3. Machine Learning</span>
              </div>
              <p className="text-[10px] text-sky-100/80 leading-relaxed">
                Dimensionality reduction (PCA / SVD), clustering (K-Means), and sentiment prediction pipelines.
              </p>
            </div>
          </div>

          {/* Analytical Pipeline Ribbon */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono bg-sky-900/60 border border-sky-400/20 px-3 py-1.5 rounded-lg text-sky-200 overflow-x-auto">
            <span className="text-amber-300 font-bold shrink-0">Pipeline:</span>
            <span>Ingest</span>
            <span className="text-sky-400">→</span>
            <span>Clean &amp; Impute</span>
            <span className="text-sky-400">→</span>
            <span>Explore (EDA)</span>
            <span className="text-sky-400">→</span>
            <span>Model (SVD/ML)</span>
            <span className="text-sky-400">→</span>
            <span className="text-emerald-300 font-bold">Predict</span>
          </div>
        </div>
      </div>

      {/* Detailed Theory & Mathematical Formulations Modal */}
      {showTheoryModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowTheoryModal(false)}
        >
          <div 
            className="w-full max-w-2xl bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Data Science Theoretical Foundations</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Course Code: 22DS102006 · Academic Syllabus</p>
                </div>
              </div>
              <button
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center border-b border-slate-200 px-5 pt-3 gap-3 bg-slate-50 text-xs">
              <button
                onClick={() => setActiveTheoryTab('overview')}
                className={`pb-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                  activeTheoryTab === 'overview'
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Foundations Overview
              </button>
              <button
                onClick={() => setActiveTheoryTab('math')}
                className={`pb-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                  activeTheoryTab === 'math'
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Mathematical Formulations
              </button>
              <button
                onClick={() => setActiveTheoryTab('pipeline')}
                className={`pb-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                  activeTheoryTab === 'pipeline'
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                The 6 Analytical Tiers
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed">
              {activeTheoryTab === 'overview' && (
                <div className="space-y-4">
                  <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                    <span className="font-bold text-blue-900 text-xs">Definition of Data Science</span>
                    <p className="text-slate-700">
                      Data Science is the systematic study of the generalizable extraction of actionable knowledge from structured, semi-structured, and unstructured data through the fusion of computational engineering, mathematical modeling, and domain inquiry.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                      <span className="font-bold text-slate-900 block">The 3Vs of Big Data</span>
                      <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                        <li><strong>Volume:</strong> Gigabytes to Petabytes scaling.</li>
                        <li><strong>Velocity:</strong> Real-time streaming vs. batch ingestion.</li>
                        <li><strong>Variety:</strong> Tabular (CSV/SQL), JSON records, &amp; text corpora.</li>
                      </ul>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                      <span className="font-bold text-slate-900 block">Core Preprocessing Axioms</span>
                      <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                        <li>Missing values handling (Mean, Median, Forward-fill).</li>
                        <li>Gaussian outlier filtering using 3-Sigma threshold.</li>
                        <li>Hierarchical MultiIndex slicing &amp; unstacking.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTheoryTab === 'math' && (
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 font-mono">
                    <span className="font-bold text-slate-900 text-xs block font-sans">1. Standard Score (Z-Score) for Outlier Detection</span>
                    <div className="p-2 bg-white rounded border border-slate-300 text-center font-bold text-blue-700">
                      Z = (X - μ) / σ
                    </div>
                    <p className="text-[11px] text-slate-600 font-sans">
                      Measures the exact number of standard deviations a data point lies from the population mean $\mu$. Values with $|Z| &gt; 2.5$ or $3.0$ are classified as statistical anomalies.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 font-mono">
                    <span className="font-bold text-slate-900 text-xs block font-sans">2. Singular Value Decomposition (SVD)</span>
                    <div className="p-2 bg-white rounded border border-slate-300 text-center font-bold text-purple-700">
                      X = U · Σ · V^T
                    </div>
                    <p className="text-[11px] text-slate-600 font-sans">
                      Decomposes matrix $X$ into left singular vectors $U$, singular values $\Sigma$, and right singular vectors $V^T$, forming the foundation of Principal Component Analysis (PCA) and rank reduction.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 font-mono">
                    <span className="font-bold text-slate-900 text-xs block font-sans">3. Shannon Information Entropy</span>
                    <div className="p-2 bg-white rounded border border-slate-300 text-center font-bold text-emerald-700">
                      H(X) = - Σ p(x) · log₂(p(x))
                    </div>
                    <p className="text-[11px] text-slate-600 font-sans">
                      Quantifies the average level of information, surprise, or uncertainty inherent in the variable's possible outcomes; used as splitting criterion in Decision Trees and Random Forests.
                    </p>
                  </div>
                </div>
              )}

              {activeTheoryTab === 'pipeline' && (
                <div className="space-y-3">
                  <span className="font-bold text-slate-900 text-xs block">
                    The Six Prescribed Analytical Disciplines (Module 1 Syllabus)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="font-bold text-blue-700 block">1. Descriptive Analytics</span>
                      <p className="text-slate-600 text-[11px]">Aggregations, summary statistics, and historical metric evaluation ("What happened?").</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="font-bold text-amber-700 block">2. Diagnostic Analytics</span>
                      <p className="text-slate-600 text-[11px]">Correlation heatmaps, root cause analysis, and outlier inspection ("Why did it happen?").</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="font-bold text-emerald-700 block">3. Predictive Analytics</span>
                      <p className="text-slate-600 text-[11px]">Supervised regression, classification, and time series forecasts ("What will happen?").</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="font-bold text-purple-700 block">4. Prescriptive Analytics</span>
                      <p className="text-slate-600 text-[11px]">Decision trees, optimization constraints, and recommended actions ("What should be done?").</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="font-bold text-cyan-700 block">5. Exploratory Analytics (EDA)</span>
                      <p className="text-slate-600 text-[11px]">Data profiling, distribution curves (PMF/CDF), and hypothesis formulation.</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="font-bold text-rose-700 block">6. Mechanistic Analytics</span>
                      <p className="text-slate-600 text-[11px]">Causal modeling, exact mathematical simulations, and parameter dynamics.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Curriculum Reference: Mohan Babu University Data Science Lab</span>
              <button
                onClick={() => setShowTheoryModal(false)}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
