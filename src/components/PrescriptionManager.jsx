import React, { useState } from 'react';
import { prescriptionsAndSupplements } from '../data/patientData';
import { sounds } from '../utils/audio';
import { Pill, CheckCircle2, Clock, AlertCircle, ShieldCheck, Sparkles, RefreshCw, ShoppingBag } from 'lucide-react';

export default function PrescriptionManager({ onAskCopilot }) {
  const [supplements, setSupplements] = useState(prescriptionsAndSupplements.customSupplements);
  const [prescriptions, setPrescriptions] = useState(prescriptionsAndSupplements.prescriptions);

  const toggleSupplement = (id) => {
    sounds.click();
    setSupplements(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, takenToday: !s.takenToday };
      }
      return s;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-glass flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Pill className="w-5 h-5 text-cyan-400" />
            Prescriptions & Personalized Supplement Complex
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Automated Pharmacy Integration • Visible Clinical Rationale • Drug-Nutrient Interaction Guard
          </p>
        </div>

        {/* Safety Badge */}
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>ZERO CONTRAINDICATIONS DETECTED</span>
        </div>
      </div>

      {/* Prescription Medications Section */}
      <div>
        <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span>Active Clinical Prescriptions (EHR Synced)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prescriptions.map((rx) => (
            <div
              key={rx.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl hover:border-slate-700 transition-all shadow-glass space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">{rx.name}</h4>
                  <div className="text-xs text-cyan-300 font-mono mt-0.5">
                    {rx.dosage} • {rx.form}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {rx.adherence}
                </span>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{rx.timing}</span>
                </div>
                <div className="text-slate-400 text-[11px] font-mono">
                  Prescriber: {rx.prescribedBy} • Refills Remaining: {rx.refillsLeft}
                </div>
              </div>

              {/* Visible Clinical Reasoning Card */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 text-xs space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Clinical Reasoning:
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {rx.aiReasoning}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-400">
                  Supply: {rx.pillCount} / {rx.daysSupply} days left
                </span>
                <button
                  onClick={() => {
                    sounds.click();
                    onAskCopilot(`What are the physiological benefits and long term safety profile of my ${rx.name}?`);
                  }}
                  className="text-cyan-400 hover:text-cyan-300 text-[11px] font-medium flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Consult Copilot</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Formulated Personalized Supplement Complex */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <span>AI Formulated Supplement Protocol</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {supplements.filter(s => s.takenToday).length} of {supplements.length} doses logged today
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supplements.map((sup) => (
            <div
              key={sup.id}
              className={`p-5 rounded-2xl border backdrop-blur-xl transition-all shadow-glass space-y-3 ${
                sup.takenToday
                  ? 'bg-slate-900/90 border-emerald-500/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">{sup.name}</h4>
                  <div className="text-xs text-cyan-300 font-mono mt-0.5">
                    {sup.dosage} • {sup.timing}
                  </div>
                </div>

                <button
                  onClick={() => toggleSupplement(sup.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    sup.takenToday
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-glow-green/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${sup.takenToday ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>{sup.takenToday ? 'Taken Today' : 'Mark Taken'}</span>
                </button>
              </div>

              {/* Purpose and Clinical Reasoning */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 text-xs space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Formulation Target:
                </div>
                <p className="text-slate-200 text-xs font-medium">
                  {sup.purpose}
                </p>
                <p className="text-slate-400 text-[11px] leading-relaxed pt-1">
                  {sup.aiReasoning}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
