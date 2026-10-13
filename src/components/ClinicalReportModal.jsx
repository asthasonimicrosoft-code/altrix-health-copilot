import React from 'react';
import { patientProfile, diagnosticLabs, prescriptionsAndSupplements } from '../data/patientData';
import { sounds } from '../utils/audio';
import { FileText, Printer, Download, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ClinicalReportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.click();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Physician Consultation Brief (HIPAA Formatted)</h3>
              <p className="text-xs text-slate-400 font-mono">Prepared by Altrix AI Personal Health Copilot</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/30 text-xs font-semibold flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => {
                sounds.click();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-slate-950 text-slate-200 font-sans">
          {/* Clinic & Patient Info Banner */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">ALTRIX LABS • CLINICAL COPILOT</div>
              <h2 className="text-xl font-bold text-white mt-1">{patientProfile.name}</h2>
              <div className="text-xs text-slate-400 font-mono mt-1 space-x-2">
                <span>DOB: 1992-04-12 ({patientProfile.age} yrs)</span>
                <span>•</span>
                <span>ID: {patientProfile.id}</span>
                <span>•</span>
                <span>Blood: {patientProfile.bloodType}</span>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-400 font-mono space-y-1">
              <div>Physician: <strong className="text-slate-200">{patientProfile.primaryPhysician}</strong></div>
              <div>Generated: <strong className="text-slate-200">{new Date().toLocaleDateString()}</strong></div>
              <div className="text-emerald-400 flex items-center sm:justify-end gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> FHIR Standard V4.0.1
              </div>
            </div>
          </div>

          {/* Longitudinal Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">1. Executive Copilot Assessment</h4>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs leading-relaxed text-slate-300">
              Patient exhibits high cardiometabolic stability. Biological age is decelerated to <strong>28.4 years</strong> (-5.6 years vs chronological). Atherogenic particle burden is significantly suppressed (ApoB at 68 mg/dL) under low-dose Atorvastatin 10mg without hepatic transaminase elevation. Systemic inflammation (hs-CRP 0.42 mg/L) confirms absence of vascular shear distress.
            </div>
          </div>

          {/* Key Biomarkers Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">2. Recent Laboratory Diagnostics</h4>
            <div className="rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-slate-400 font-mono text-[11px]">
                  <tr>
                    <th className="p-3">Biomarker</th>
                    <th className="p-3">Result</th>
                    <th className="p-3">Reference Optimal</th>
                    <th className="p-3">Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950/60 font-mono">
                  <tr>
                    <td className="p-3 text-slate-200 font-sans">Apolipoprotein B (ApoB)</td>
                    <td className="p-3 text-cyan-300 font-bold">68 mg/dL</td>
                    <td className="p-3 text-slate-400">&lt; 80 mg/dL</td>
                    <td className="p-3 text-emerald-400">Optimal (Top 10th %)</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-200 font-sans">hs-CRP (Inflammation)</td>
                    <td className="p-3 text-cyan-300 font-bold">0.42 mg/L</td>
                    <td className="p-3 text-slate-400">&lt; 1.0 mg/L</td>
                    <td className="p-3 text-emerald-400">Low Risk Baseline</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-200 font-sans">Fasting Glucose / HbA1c</td>
                    <td className="p-3 text-cyan-300 font-bold">84 mg/dL / 5.0%</td>
                    <td className="p-3 text-slate-400">70 - 89 mg/dL</td>
                    <td className="p-3 text-emerald-400">Insulin Sensitive</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-200 font-sans">Vitamin D3 (25-OH)</td>
                    <td className="p-3 text-cyan-300 font-bold">64.2 ng/mL</td>
                    <td className="p-3 text-slate-400">50 - 80 ng/mL</td>
                    <td className="p-3 text-emerald-400">Target Repletion</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Prescriptions & Supplements */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">3. Active Pharmacotherapy & Supplements</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {prescriptionsAndSupplements.prescriptions.map(p => (
                <div key={p.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="font-bold text-white">{p.name} {p.dosage}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{p.timing}</div>
                  <div className="text-[10px] text-cyan-400 mt-1">Adherence: {p.adherence}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
