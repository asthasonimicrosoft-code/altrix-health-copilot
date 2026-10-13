import React, { useState } from 'react';
import { medicalRecordsTimeline } from '../data/patientData';
import { sounds } from '../utils/audio';
import { FileText, Search, Filter, Calendar, MapPin, User, Download, Sparkles, UploadCloud, ChevronRight, Eye } from 'lucide-react';

export default function MedicalRecordsTimeline({ onAskCopilot, onOpenUploadModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [expandedRecord, setExpandedRecord] = useState('REC-2026-03');

  const filteredRecords = medicalRecordsTimeline.filter(rec => {
    const matchesSearch = rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rec.physician.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rec.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || rec.type === selectedType;
    return matchesSearch && matchesType;
  });

  const types = ['All', 'Diagnostic Lab', 'Cardiovascular', 'Imaging', 'Genomics'];

  return (
    <div className="space-y-6">
      {/* Top Banner & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-glass">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            Medical Records & Healthcare Journey
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            EHR Integration via HL7 FHIR • 4 Synced Records • AI Longitudinal Synthesis
          </p>
        </div>

        <button
          onClick={() => {
            sounds.click();
            onOpenUploadModal();
          }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-glow-cyan transition-all shrink-0 self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Record / Lab PDF</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records, doctors, diagnoses..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 md:pb-0">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => {
                sounds.click();
                setSelectedType(type);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedType === type
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:text-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-slate-800/80 ml-4 sm:ml-6 space-y-6">
        {filteredRecords.map((record) => {
          const isExpanded = expandedRecord === record.id;
          return (
            <div key={record.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Node Icon */}
              <div 
                className="absolute -left-[17px] top-4 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-glow-cyan/50 transition-transform group-hover:scale-110"
              >
                <Calendar className="w-3.5 h-3.5" />
              </div>

              {/* Record Card */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl hover:border-slate-700 transition-all shadow-glass">
                {/* Top metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-cyan-400">{record.date}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {record.type}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-cyan-200 transition-colors">
                      {record.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>{record.physician}</span>
                  </div>
                </div>

                {/* Facility & Summary */}
                <div className="py-3 text-xs text-slate-300 space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{record.facility}</span>
                  </div>
                  <p className="leading-relaxed text-slate-300">
                    {record.summary}
                  </p>
                </div>

                {/* AI Plain English Copilot Translation */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/40 border border-cyan-500/30 my-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Copilot Plain-English Synthesis
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {record.copilotExplanation}
                  </p>
                </div>

                {/* Detailed Findings & Attachments (Collapsible / Expandable) */}
                {isExpanded && (
                  <div className="space-y-3 pt-3 border-t border-slate-800 animate-fade-in">
                    <div>
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        Clinical Findings & Biomarker Flags:
                      </h4>
                      <ul className="space-y-1.5">
                        {record.findings.map((item, fIdx) => (
                          <li key={fIdx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-cyan-400 font-mono font-bold">›</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        Attached Documents & Imaging series:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {record.attachments.map((att, aIdx) => (
                          <div
                            key={aIdx}
                            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2 font-mono hover:border-cyan-500/40 transition-colors cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{att}</span>
                            <Download className="w-3 h-3 text-slate-500 hover:text-white" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      sounds.click();
                      setExpandedRecord(isExpanded ? null : record.id);
                    }}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 font-mono"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Full Clinical Breakdown'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  <button
                    onClick={() => {
                      sounds.click();
                      onAskCopilot(`Can you explain the clinical significance of my record: "${record.title}" from ${record.date}?`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-300 border border-slate-700 hover:border-cyan-400/40 transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ask Copilot About This</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
