import React from 'react';
import { patientProfile } from '../data/patientData';
import { sounds } from '../utils/audio';
import { Activity, FileText, Pill, Dna, ShieldCheck, UserCheck, ChevronRight } from 'lucide-react';

export default function Sidebar({ activeTab, onTabChange }) {
  const navItems = [
    { id: 'overview', label: '3D Digital Twin & Vitals', icon: Activity, badge: 'Live 3D' },
    { id: 'records', label: 'Medical Records & EHR', icon: FileText, badge: '4 Synced' },
    { id: 'labs', label: 'Diagnostic Lab Hub', icon: ShieldCheck, badge: '88 Markers' },
    { id: 'rx', label: 'Prescriptions & Pharmacy', icon: Pill, badge: 'Daily' },
    { id: 'genomics', label: 'Genomics & Aging Clock', icon: Dna, badge: '-5.6 Yrs' },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-950/70 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-slate-800/80 p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Navigation list */}
        <nav className="space-y-1.5 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sounds.click();
                  onTabChange(item.id);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/10 text-cyan-200 border border-cyan-400/30 shadow-glow-cyan/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-900 text-slate-400'}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                <span className={`hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  isActive ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-900 text-slate-500'
                }`}>
                  {item.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Patient Profile Card */}
      <div className="hidden lg:block pt-4 border-t border-slate-800/80">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
              EV
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">{patientProfile.name}</div>
              <div className="text-[10px] font-mono text-cyan-400">Bio Age: {patientProfile.biologicalAge} yrs</div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between pt-1 border-t border-slate-800/60">
            <span>Score: {patientProfile.healthScore}/100</span>
            <span className="text-emerald-400 font-semibold">{patientProfile.summaryBadge}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
