import React from 'react';
import { organsData } from '../data/patientData';
import { sounds } from '../utils/audio';
import { X, Sparkles, Activity, ShieldCheck, FileText, ArrowRight } from 'lucide-react';

export default function OrganDetailModal({ organId, onClose, onAskCopilot }) {
  if (!organId || !organsData[organId]) return null;
  const organ = organsData[organId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden">
        {/* Header with Glowing Accent */}
        <div 
          className="relative px-6 py-5 border-b border-slate-800 flex items-center justify-between"
          style={{
            background: `radial-gradient(circle at top left, ${organ.color}25, transparent 70%)`
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg"
              style={{
                backgroundColor: `${organ.color}20`,
                borderColor: organ.color,
                color: organ.color
              }}
            >
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight">{organ.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {organ.score}/100 • {organ.status.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{organ.system}</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.click();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* AI Copilot Clinical Assessment Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-blue-500/30">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Altrix AI Copilot Longitudinal Assessment
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {organ.copilotInsight}
            </p>
          </div>

          {/* Real-time Physiological Metrics Grid */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Live Physiological Telemetry
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {organ.metrics.map((metric, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">{metric.name}</div>
                    <div className="text-lg font-bold text-white font-mono mt-0.5">{metric.value}</div>
                  </div>
                  <span className="px-2 py-1 rounded-md text-[11px] font-mono font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                    {metric.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Synced Diagnostic Bloodwork / Biomarkers */}
          {organ.recentLabs && organ.recentLabs.length > 0 && (
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Associated Laboratory Markers (Quest / Epic EHR)
              </h4>
              <div className="space-y-2">
                {organ.recentLabs.map((lab, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-medium text-slate-200">{lab.test}</span>
                      <div className="text-[11px] text-slate-500 font-mono">Reference Range: {lab.normal}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-cyan-300 text-sm">{lab.value}</div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                        <ShieldCheck className="w-3 h-3" /> Within Normal Limit
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              sounds.click();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Close HUD
          </button>

          <button
            onClick={() => {
              sounds.click();
              onAskCopilot(`Can you explain the clinical status and optimization strategy for my ${organ.name}?`);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold flex items-center gap-2 shadow-glow-cyan transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Consult Copilot on {organ.name.split(' ')[0]}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
