import React, { useState, useRef, useEffect } from 'react';
import { sampleAIChatMessages, prebuiltQuestions, patientProfile } from '../data/patientData';
import { sounds } from '../utils/audio';
import { Sparkles, Send, X, Bot, User, CheckCircle2, FileText, ArrowRight, CornerDownLeft, ShieldCheck, RefreshCw } from 'lucide-react';

export default function AICopilotDrawer({ isOpen, onClose, initialQuery, onOpenReportModal }) {
  const [messages, setMessages] = useState(sampleAIChatMessages);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('lipid') || q.includes('apob') || q.includes('cholesterol')) {
      return {
        text: `### 🩸 Clinical Review: Lipid & Cardiovascular Panel\n\n**Key Finding**: Your **Apolipoprotein B (ApoB)** is at **68 mg/dL**, placing you in the lowest 10th percentile for cardiovascular event risk over a 30-year horizon.\n\n* **ApoB**: 68 mg/dL *(Optimal Target: < 80 mg/dL)* — Down from 80 mg/dL previously.\n* **LDL-C**: 82 mg/dL *(Calculated)* — Optimal range.\n* **Triglycerides**: 68 mg/dL — High insulin sensitivity confirmed.\n* **Lipoprotein(a)**: 18 nmol/L — Non-elevated genetic risk baseline.\n\n**Plain English Takeaway**:\nYour arteries have extremely low atherogenic particle burden. The combination of your Mediterranean-style dietary fat profile and low-dose Atorvastatin (10mg) is performing with maximum efficacy without elevating liver enzymes.`,
        action: "View Full Lab Panel",
        actionTab: "labs"
      };
    }

    if (q.includes('supplement') || q.includes('prescription') || q.includes('clash') || q.includes('interact')) {
      return {
        text: `### 💊 Drug-Nutrient Synergy & Interaction Audit\n\n**Status: 100% Verified Safe (Zero Contraindications)**\n\nHere is the clinical rationale behind your combined stack:\n\n1. **Atorvastatin (10mg) + Liposomal CoQ10 (200mg)**:\n   * *Synergy*: Statins inhibit the HMG-CoA reductase pathway, which normally reduces endogenous CoQ10 synthesis. Adding Ubiquinol protects mitochondrial bioenergetics and prevents statin-induced myopathy.\n2. **Metformin (500mg ER) + Active Methyl-B12**:\n   * *Synergy*: Metformin can reduce ileal absorption of Vitamin B12 over time. Your methylated B-complex directly safeguards neurological sheath integrity.\n3. **MTHFR Variant + L-5-Methylfolate (1000mcg)**:\n   * *Synergy*: Bypasses your heterozygous MTHFR 677C>T bottleneck, driving homocysteine down to a safe **7.2 µmol/L**.\n\n**Recommendation**: No scheduling adjustments required. Maintain taking morning supplements with food and Magnesium L-Threonate 45 minutes before sleep.`,
        action: "Review Prescriptions",
        actionTab: "rx"
      };
    }

    if (q.includes('biological age') || q.includes('younger') || q.includes('chrono') || q.includes('longevity')) {
      return {
        text: `### 🧬 Biological Age & Epigenetic Horvath Clock Analysis\n\n**Current Calculation**: **28.4 Years** *(Chronological Age: 34 Years — 5.6 Years Age Deceleration)*.\n\n**Top Biological Drivers of Your Decelerated Aging**:\n1. **High Heart Rate Variability (HRV 72 ms)**: Indicates exceptional autonomic nervous system flexibility and youth-like parasympathetic recovery.\n2. **Fasting Insulin (3.8 µIU/mL) & Glycemic Stability**: Zero inflammatory glucose spikes recorded by your Dexcom G7 sensor over 90 days.\n3. **hs-CRP (0.42 mg/L)**: Systemic vascular inflammation is negligible, preserving cellular telomere length.\n4. **VO2 Max (46.8 ml/kg/min)**: Ranks in the top 10% of women in their 20s, reflecting high mitochondrial density.`,
        action: "Inspect Longevity Data",
        actionTab: "genomics"
      };
    }

    if (q.includes('sleep') || q.includes('rem') || q.includes('deep sleep')) {
      return {
        text: `### 🌙 Sleep Architecture & Recovery Strategy\n\nBased on your last 7 nights of Oura Ring telemetry:\n* **Deep (Slow-Wave) Sleep**: 24.2% *(Goal >20%)* — Excellent physical repair & growth hormone secretion.\n* **REM Sleep**: 26.5% *(Goal >20%)* — Optimal memory consolidation.\n* **Resting Heart Rate Nadir**: Occurred at 3:15 AM (early nadir = high recovery).\n\n**Copilot Optimization Protocol for Tonight**:\n* Complete your evening meal 3 hours prior to sleep (finish by 7:30 PM).\n* Take Magnesium L-Threonate (144mg) at 10:00 PM.\n* Keep bedroom temperature between 18°C–19°C (65°F–67°F) for rapid core body temperature drop.`,
        action: "View Sleep Telemetry",
        actionTab: "vitals"
      };
    }

    if (q.includes('doctor') || q.includes('summary') || q.includes('report') || q.includes('consult')) {
      return {
        text: `### 📋 Clinical Summary Drafted for Dr. Aris Thorne\n\nI have compiled your longitudinal health progress into an official, HIPAA-compliant clinical brief covering:\n* **March 2026 Comprehensive 88-Biomarker Quest Panel**\n* **Lipid profile trend (ApoB drop to 68 mg/dL)**\n* **Continuous Glucose Sensor (GMI 92 mg/dL, TIR 99%)**\n* **Current Medication & Supplement Adherence (99% compliance)**\n\nYou can preview or print this clinical brief immediately using the Export Report tool.`,
        action: "Open Official Doctor Report",
        actionReport: true
      };
    }

    // Default intelligent clinical copilot response
    return {
      text: `### 🤖 Altrix Health Copilot Analysis\n\nThank you for asking about "${query}". \n\nI have cross-referenced your **Epic EHR history**, **Quest Diagnostics lab telemetry**, and **wearable biosensors**:\n\n* **Clinical Baseline**: Your vitals are completely stable (Resting HR ${patientProfile.bloodType}, BP 114/74, SpO2 99%).\n* **Metabolic Index**: Fasting glucose and lipid clearance remain within peak longevity targets.\n* **Personalized Insight**: Based on your genetic profile and continuous monitoring, your current health protocol is operating with high resilience.\n\nWould you like me to generate a personalized action item for your calendar or compile this for your primary physician?`,
      action: "Review Health Summary",
      actionTab: "overview"
    };
  };

  const handleSend = (textToSend = null) => {
    const text = textToSend || inputQuery;
    if (!text.trim() || isTyping) return;

    sounds.click();
    const userMsg = {
      role: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI inference & streaming typing
    setTimeout(() => {
      const response = generateAIResponse(text);
      sounds.success();
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          content: response.text,
          action: response.action,
          actionReport: response.actionReport
        }
      ]);
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] lg:w-[540px] bg-slate-950/95 backdrop-blur-2xl border-l border-slate-800 shadow-2xl flex flex-col animate-fade-in">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-blue-950/60 via-slate-900/60 to-purple-950/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-glow-cyan">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white tracking-tight">Altrix Health Copilot</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Longitudinal Medical Agent • HIPAA Tier 1</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.click();
              setMessages(sampleAIChatMessages);
            }}
            title="Reset conversation"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              sounds.click();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Suggested Quick Prompt Pills */}
      <div className="p-3 bg-slate-900/50 border-b border-slate-800/80 overflow-x-auto">
        <div className="flex items-center gap-2 text-xs whitespace-nowrap">
          <span className="text-slate-500 text-[11px] font-mono flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> PROMPTS:
          </span>
          {prebuiltQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-200 border border-slate-700/60 hover:border-cyan-400/40 text-[11px] transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-1.5 mb-1 px-1">
              {msg.role === 'user' ? (
                <>
                  <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                  <span className="text-xs font-semibold text-slate-300">Elena Vance</span>
                </>
              ) : (
                <>
                  <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5" /> Altrix AI Copilot
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                </>
              )}
            </div>

            <div
              className={`max-w-[90%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-none'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
              }`}
            >
              <div className="whitespace-pre-line prose prose-invert prose-xs">
                {msg.content}
              </div>

              {msg.action && (
                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400">ACTIONABLE HEALTH EXTENSION</span>
                  <button
                    onClick={() => {
                      sounds.click();
                      if (msg.actionReport) {
                        onOpenReportModal();
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-medium border border-cyan-400/30 flex items-center gap-1 transition-all"
                  >
                    <span>{msg.action}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs text-cyan-400 w-48">
            <Bot className="w-4 h-4 animate-bounce" />
            <span className="font-mono text-[11px]">Analyzing health records...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask Copilot about your records, labs, or symptoms..."
            className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-slate-900 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="absolute right-2 p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-cyan-400 hover:to-blue-500 transition-all shadow-glow-cyan"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Encrypted with HIPAA/HL7 FHIR
          </span>
          <span>Press Enter to consult</span>
        </div>
      </div>
    </div>
  );
}
