import React from 'react';
import { patientProfile } from '../data/patientData';
import { sounds } from '../utils/audio';
import { Dna, Clock, ShieldCheck, Sparkles, Activity, ArrowRight } from 'lucide-react';

export default function GenomicsLongevityView({ onAskCopilot }) {
  const organAges = [
    { organ: 'Cardiovascular System', bioAge: 26.1, chronoAge: 34, delta: '-7.9 yrs', status: 'Youthful Elasticity' },
    { organ: 'Kidneys & Renal Clearance', bioAge: 26.8, chronoAge: 34, delta: '-7.2 yrs', status: 'Peak Filtration' },
    { organ: 'Brain & Nervous System', bioAge: 27.5, chronoAge: 34, delta: '-6.5 yrs', status: 'High Neuroplasticity' },
    { organ: 'Respiratory & Lungs', bioAge: 28.0, chronoAge: 34, delta: '-6.0 yrs', status: 'Superior VO2 Max' },
    { organ: 'Hepatic & Metabolic Engine', bioAge: 29.4, chronoAge: 34, delta: '-4.6 yrs', status: 'Insulin Sensitive' },
    { organ: 'Musculoskeletal Matrix', bioAge: 31.2, chronoAge: 34, delta: '-2.8 yrs', status: 'High Bone Density' },
  ];

  const genomicVariants = [
    {
      gene: 'FOXO3 (rs2802292)',
      phenotype: 'Longevity Forkhead Box Transcription',
      result: 'G/G Homozygous Carrier',
      impact: 'Positive Longevity Trait',
      color: 'emerald',
      description: 'Associated with elevated cellular autophagy, oxidative stress resilience, and human centenarian longevity.'
    },
    {
      gene: 'APOE Genotype',
      phenotype: 'Apolipoprotein E Lipid Clearance',
      result: 'ε3 / ε3 (Standard Baseline)',
      impact: 'Neutral / Normal Risk',
      color: 'cyan',
      description: 'Zero presence of high-risk APOE-ε4 allele. Normal low-density lipoprotein clearance and baseline Alzheimer risk.'
    },
    {
      gene: 'MTHFR (677C>T)',
      phenotype: 'Methylenetetrahydrofolate Reductase',
      result: 'Heterozygous Variant (C/T)',
      impact: 'Compensated via Nutrition',
      color: 'amber',
      description: '~30% reduction in enzymatic folic acid conversion. Fully compensated by active L-Methylfolate in your supplement stack.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900/80 to-blue-950/70 border border-purple-500/30 backdrop-blur-xl shadow-glass flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold flex items-center gap-1.5 mb-1">
            <Dna className="w-4 h-4 text-purple-400" /> WHOLE GENOME & EPIGENETIC CLOCK
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Biological Age: <span className="text-cyan-300 font-mono">{patientProfile.biologicalAge}</span> Years
          </h2>
          <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
            Your physiological biomarker pace is decelerated by <strong>-5.6 years</strong> relative to chronological age {patientProfile.age}. Aging rate benchmark: <strong>0.82 biological years per chronological year</strong>.
          </p>
        </div>

        <button
          onClick={() => {
            sounds.click();
            onAskCopilot("Explain why my biological age is 5.6 years younger than chronological age and how to preserve this pace.");
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask Copilot About Longevity Clock</span>
        </button>
      </div>

      {/* Organ-by-Organ Biological Age Breakdown */}
      <div>
        <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>System-Specific Physiological Age</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {organAges.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl hover:border-slate-700 transition-all shadow-glass flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{item.organ}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {item.delta}
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-cyan-300 font-mono">
                    {item.bioAge}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">yrs (Chrono: {item.chronoAge})</span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span>{item.status}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Genomic Variants & DNA Methylation */}
      <div>
        <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Dna className="w-4 h-4 text-purple-400" />
          <span>Actionable Genomic Variants (30x WGS Sequencing)</span>
        </h3>

        <div className="space-y-3">
          {genomicVariants.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl hover:border-slate-700 transition-all shadow-glass flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white font-mono">{item.gene}</span>
                  <span className="text-xs text-cyan-400 font-mono font-medium">[{item.result}]</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                    {item.impact}
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-medium">{item.phenotype}</div>
                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{item.description}</p>
              </div>

              <button
                onClick={() => {
                  sounds.click();
                  onAskCopilot(`How does my genomic variant ${item.gene} interact with my diet, supplements, and lifestyle?`);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 shrink-0 self-start sm:self-auto transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI Genome Audit</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
