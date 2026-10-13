import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ThreeDHumanCanvas from './components/ThreeDHumanCanvas';
import VitalsHUD from './components/VitalsHUD';
import OrganDetailModal from './components/OrganDetailModal';
import AICopilotDrawer from './components/AICopilotDrawer';
import MedicalRecordsTimeline from './components/MedicalRecordsTimeline';
import DiagnosticLabHub from './components/DiagnosticLabHub';
import PrescriptionManager from './components/PrescriptionManager';
import GenomicsLongevityView from './components/GenomicsLongevityView';
import UploadRecordModal from './components/UploadRecordModal';
import ClinicalReportModal from './components/ClinicalReportModal';
import { patientProfile } from './data/patientData';
import { sounds } from './utils/audio';
import { Sparkles, Calendar, CheckSquare, ShieldCheck, Heart, FileText, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [systemFilter, setSystemFilter] = useState('all');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotQuery, setCopilotQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isLiveTelemetry, setIsLiveTelemetry] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const handleAskCopilot = (promptText) => {
    setCopilotQuery(promptText);
    setIsCopilotOpen(true);
  };

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    return muted;
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark bg-[#050811] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Top Application Header */}
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        isLiveTelemetry={isLiveTelemetry}
        onToggleLiveTelemetry={() => setIsLiveTelemetry(!isLiveTelemetry)}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Main App Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Dynamic Main Viewport */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Level 1: Glanceable Indicators & Real-Time Pulse */}
              <VitalsHUD
                isLiveTelemetry={isLiveTelemetry}
                onToggleLiveTelemetry={() => setIsLiveTelemetry(!isLiveTelemetry)}
                onOpenCopilot={() => setIsCopilotOpen(true)}
              />

              {/* Centerpiece: Interactive 3D Digital Twin Canvas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    INTERACTIVE 3D ANATOMICAL DIGITAL TWIN (FUSELAB ENGINE)
                  </span>
                  <span className="hidden sm:inline">Orbit: Drag • Zoom: Scroll • Inspect: Click Organ Nodes</span>
                </div>

                <ThreeDHumanCanvas
                  selectedOrgan={selectedOrgan}
                  onSelectOrgan={setSelectedOrgan}
                  systemFilter={systemFilter}
                  onFilterChange={setSystemFilter}
                  isLiveTelemetry={isLiveTelemetry}
                />
              </div>

              {/* Level 2: Bento Grid Quick Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1: Today's Action Plan */}
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-glass flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                      <span className="flex items-center gap-1.5 text-cyan-400">
                        <CheckSquare className="w-4 h-4" /> TODAY'S ACTION PLAN
                      </span>
                      <span className="text-emerald-400 font-bold">2/3 DONE</span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</span>
                        <span className="line-through text-slate-500">Morning Metformin & CoQ10 taken</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</span>
                        <span className="line-through text-slate-500">30 min Zone-2 cardio completed</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-200 font-medium">
                        <span className="w-4 h-4 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">○</span>
                        <span>Magnesium L-Threonate before sleep (10 PM)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('rx')}
                    className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center justify-between"
                  >
                    <span>Manage Protocol</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card 2: Next Clinical Appointment */}
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-glass flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                      <span className="flex items-center gap-1.5 text-purple-400">
                        <Calendar className="w-4 h-4" /> UPCOMING CONSULTATION
                      </span>
                      <span className="text-slate-500">IN 4 DAYS</span>
                    </div>

                    <h4 className="text-sm font-bold text-white">Dr. Aris Thorne, MD</h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">Cardiometabolic & Longevity Review</p>
                    <p className="text-xs text-slate-300 mt-2">
                      Topic: 90-day ApoB titration review & DEXA body composition scan.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-purple-400 hover:text-purple-300 flex items-center justify-between"
                  >
                    <span>Prepare Doctor Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card 3: AI Copilot Proactive Insights */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/60 to-purple-950/60 border border-cyan-500/30 backdrop-blur-xl shadow-glass flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-3">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Sparkles className="w-4 h-4 animate-pulse" /> COPILOT REASONING
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300">Active</span>
                    </div>

                    <h4 className="text-sm font-bold text-white">Vascular Age 7.9 Yrs Younger</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Your pulse wave velocity (5.8 m/s) matches a 26-year-old. Zero arterial stiffness flags detected across historical imaging records.
                    </p>
                  </div>

                  <button
                    onClick={() => handleAskCopilot("What biological factors contribute most to my vascular elasticity?")}
                    className="mt-4 pt-3 border-t border-blue-800/60 text-[11px] font-mono text-cyan-300 hover:text-white flex items-center justify-between"
                  >
                    <span>Ask Copilot for Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <MedicalRecordsTimeline
              onAskCopilot={handleAskCopilot}
              onOpenUploadModal={() => setIsUploadModalOpen(true)}
            />
          )}

          {activeTab === 'labs' && (
            <DiagnosticLabHub onAskCopilot={handleAskCopilot} />
          )}

          {activeTab === 'rx' && (
            <PrescriptionManager onAskCopilot={handleAskCopilot} />
          )}

          {activeTab === 'genomics' && (
            <GenomicsLongevityView onAskCopilot={handleAskCopilot} />
          )}
        </main>
      </div>

      {/* Organ Detail HUD Modal */}
      <OrganDetailModal
        organId={selectedOrgan}
        onClose={() => setSelectedOrgan(null)}
        onAskCopilot={handleAskCopilot}
      />

      {/* AI Copilot Drawer */}
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        initialQuery={copilotQuery}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Upload Medical Record Ingestion Modal */}
      <UploadRecordModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={(data) => {
          setActiveTab('records');
        }}
      />

      {/* Clinical Report / Doctor Consultation Modal */}
      <ClinicalReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
