import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import { UploadCloud, FileText, CheckCircle2, X, Sparkles, ArrowRight, Loader2 } from 'lucide-react';

export default function UploadRecordModal({ isOpen, onClose, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: select, 2: scanning, 3: completed
  const [parsedData, setParsedData] = useState(null);

  if (!isOpen) return null;

  const handleSimulatedUpload = () => {
    sounds.click();
    setIsProcessing(true);
    setStep(2);

    setTimeout(() => {
      setStep(3);
      setIsProcessing(false);
      sounds.success();
      setParsedData({
        title: "Quest Diagnostics Comprehensive Metabolic Panel (Simulated Scan)",
        date: "October 12, 2026",
        detectedEntities: [
          { label: "Biomarker: Fasting Glucose", value: "82 mg/dL", status: "Optimal" },
          { label: "Biomarker: HbA1c", value: "4.9%", status: "Optimal" },
          { label: "Biomarker: eGFR", value: "112 mL/min", status: "Juvenile Clearance" },
          { label: "Extracted Clinical Note", value: "Zero signs of metabolic dysfunction. High compliance with prescribed nutrition." }
        ]
      });
    }, 1800);
  };

  const handleFinish = () => {
    sounds.click();
    onUploadSuccess(parsedData);
    onClose();
    setStep(1);
    setFile(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-950/50 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Intelligent Health Record Ingestion</h3>
              <p className="text-xs text-slate-400 font-mono">OCR Text Extraction & Biomarker Normalization</p>
            </div>
          </div>

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

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div 
                onClick={handleSimulatedUpload}
                className="border-2 border-dashed border-slate-700 hover:border-cyan-400/60 rounded-2xl p-8 text-center cursor-pointer transition-all bg-slate-950/50 hover:bg-cyan-500/5 group"
              >
                <UploadCloud className="w-12 h-12 text-slate-500 group-hover:text-cyan-400 mx-auto transition-colors animate-float" />
                <h4 className="mt-3 text-sm font-semibold text-white">
                  Drop your Medical Record, Prescription or Diagnostic PDF here
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Supports Lab PDF, DICOM Imaging, Apple Health XML, Quest/LabCorp reports, or scanned phone images.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 group-hover:bg-cyan-500/20 text-xs font-mono text-cyan-300 border border-slate-700 group-hover:border-cyan-400/40">
                  <Sparkles className="w-3.5 h-3.5" /> Select Sample Lab Report to Scan
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="py-12 text-center space-y-4">
              <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto" />
              <div>
                <h4 className="text-base font-bold text-white">Altrix Neural OCR Processing...</h4>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Extracting biomarker numerical ranges, matching ICD-10 ontology, & syncing 3D Digital Twin...
                </p>
              </div>
            </div>
          )}

          {step === 3 && parsedData && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-300 font-mono">RECORD INGESTED & NORMALIZED</h4>
                  <p className="text-xs text-slate-200 mt-0.5">{parsedData.title}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Extracted Biomarkers & Insights:
                </h5>
                {parsedData.detectedEntities.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                    <span className="text-slate-300 font-medium">{item.label}</span>
                    <span className="font-mono font-bold text-cyan-300">{item.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleFinish}
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-glow-cyan"
              >
                <span>Integrate Into Digital Twin & Close</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
