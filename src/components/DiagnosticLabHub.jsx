import React, { useState } from 'react';
import { diagnosticLabs } from '../data/patientData';
import { sounds } from '../utils/audio';
import { Activity, ShieldCheck, AlertTriangle, Sparkles, TrendingDown, TrendingUp, Info } from 'lucide-react';

export default function DiagnosticLabHub({ onAskCopilot }) {
  const [activeCategory, setActiveCategory] = useState(diagnosticLabs[0].category);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-glass flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            Diagnostic Reports & Biomarker Hub
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            88 Biomarkers Monitored • Clinical Reference Ranges • AI Trend Interpretation
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {diagnosticLabs.map((cat) => (
            <button
              key={cat.category}
              onClick={() => {
                sounds.click();
                setActiveCategory(cat.category);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.category
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-semibold'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:text-slate-200'
              }`}
            >
              {cat.category.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Category Panels */}
      {diagnosticLabs.filter(c => c.category === activeCategory).map((cat, idx) => (
        <div key={idx} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cat.tests.map((test, tIdx) => {
              // Calculate percent on visual range bar
              const rangeSpan = test.max - test.min;
              const currentPercent = Math.max(5, Math.min(95, ((test.value - test.min) / rangeSpan) * 100));
              const optMinPercent = Math.max(5, Math.min(95, ((test.optimalMin - test.min) / rangeSpan) * 100));
              const optMaxPercent = Math.max(5, Math.min(95, ((test.optimalMax - test.min) / rangeSpan) * 100));
              const optWidth = Math.max(10, optMaxPercent - optMinPercent);

              return (
                <div
                  key={tIdx}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl hover:border-slate-700 transition-all shadow-glass flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Name and Value */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">{test.name}</h4>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Standard Range: {test.min} – {test.max} {test.unit}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xl font-extrabold text-cyan-300 font-mono tracking-tight">
                          {test.value} <span className="text-xs text-slate-400 font-normal">{test.unit}</span>
                        </div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {test.status}
                        </span>
                      </div>
                    </div>

                    {/* Visual Range Indicator Bar */}
                    <div className="mt-5 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>Min ({test.min})</span>
                        <span className="text-emerald-400 font-semibold">Optimal Target ({test.optimalMin}–{test.optimalMax})</span>
                        <span>Max ({test.max})</span>
                      </div>

                      <div className="relative h-3 w-full rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                        {/* Optimal Green Zone */}
                        <div
                          className="absolute top-0 bottom-0 bg-emerald-500/25 border-x border-emerald-500/40"
                          style={{
                            left: `${optMinPercent}%`,
                            width: `${optWidth}%`
                          }}
                        ></div>

                        {/* Current Value Marker Pin */}
                        <div
                          className="absolute top-0 bottom-0 w-2.5 rounded-full bg-cyan-400 shadow-glow-cyan transform -translate-x-1/2"
                          style={{ left: `${currentPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action & Change Delta */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      {test.change.startsWith('+') ? (
                        <TrendingUp className="w-3 h-3 text-cyan-400" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-emerald-400" />
                      )}
                      <span>vs Previous: <strong>{test.change}</strong></span>
                    </span>

                    <button
                      onClick={() => {
                        sounds.click();
                        onAskCopilot(`Explain my ${test.name} value of ${test.value} ${test.unit} and how it impacts my longevity.`);
                      }}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-[11px] font-medium"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Copilot AI Breakdown</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
