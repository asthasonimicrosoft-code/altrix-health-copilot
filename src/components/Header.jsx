import React from 'react';
import { patientProfile } from '../data/patientData';
import { sounds } from '../utils/audio';
import { Sparkles, Activity, Volume2, VolumeX, Moon, Sun, UploadCloud, FileText, Bell, Search } from 'lucide-react';

export default function Header({
  isDark,
  onToggleTheme,
  isMuted,
  onToggleSound,
  isLiveTelemetry,
  onToggleLiveTelemetry,
  onOpenCopilot,
  onOpenUploadModal,
  onOpenReportModal
}) {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-600 to-purple-600 p-0.5 shadow-glow-cyan flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-display text-base">
                AL
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">ALTRIX LABS</span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
              AI-Powered Personal Health Copilot
            </h1>
          </div>
        </div>

        {/* Center / Action Status Pill */}
        <div className="hidden xl:flex items-center gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-300">Epic MyChart Synced</span>
            <span className="text-slate-500">({patientProfile.lastSync})</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
            <span className="text-cyan-400">Bio Age: 28.4</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400">Score: 94/100</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Live Telemetry Toggle */}
          <button
            onClick={() => {
              sounds.click();
              onToggleLiveTelemetry();
            }}
            title={isLiveTelemetry ? "Live ECG Telemetry Active" : "Telemetry Paused"}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all ${
              isLiveTelemetry
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 shadow-glow-coral/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className={`w-3.5 h-3.5 ${isLiveTelemetry ? 'animate-pulse text-rose-400' : ''}`} />
            <span>{isLiveTelemetry ? 'LIVE ECG' : 'PAUSED'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              const muted = onToggleSound();
              if (!muted) sounds.click();
            }}
            title={isMuted ? "Audio Muted" : "Audio Feedback On"}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Doctor Report Modal Trigger */}
          <button
            onClick={() => {
              sounds.click();
              onOpenReportModal();
            }}
            title="Generate Clinical Doctor Report"
            className="hidden md:flex p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <FileText className="w-4 h-4" />
          </button>

          {/* Upload Ingestion Trigger */}
          <button
            onClick={() => {
              sounds.click();
              onOpenUploadModal();
            }}
            title="Upload Record / Lab PDF"
            className="hidden md:flex p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <UploadCloud className="w-4 h-4" />
          </button>

          {/* Copilot Launcher CTA */}
          <button
            onClick={() => {
              sounds.click();
              onOpenCopilot();
            }}
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-glow-cyan transition-all"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="hidden xs:inline">Ask Copilot</span>
          </button>
        </div>
      </div>
    </header>
  );
}
