import React, { useEffect, useRef, useState } from 'react';
import { patientProfile } from '../data/patientData';
import { sounds } from '../utils/audio';
import { Activity, Heart, Zap, Shield, Moon, Clock, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';

export default function VitalsHUD({ isLiveTelemetry, onToggleLiveTelemetry, onOpenCopilot }) {
  const [pulseTick, setPulseTick] = useState(0);
  const [bpm, setBpm] = useState(54);
  const [glucose, setGlucose] = useState(84);
  const canvasRef = useRef(null);

  // Live telemetry micro-variations
  useEffect(() => {
    if (!isLiveTelemetry) return;
    const interval = setInterval(() => {
      setPulseTick(prev => prev + 1);
      // Subtle natural biological fluctuation
      setBpm(54 + Math.floor(Math.sin(Date.now() / 3000) * 3));
      setGlucose(84 + Math.floor(Math.sin(Date.now() / 8000) * 2));
    }, 1200);
    return () => clearInterval(interval);
  }, [isLiveTelemetry]);

  // Animated ECG Canvas Waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      ctx.strokeStyle = '#ff3b69';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = '#ff3b69';
      ctx.shadowBlur = 8;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const cycle = ((x + offset) % 180) / 180;
        let y = midY;

        // P wave
        if (cycle > 0.15 && cycle < 0.25) {
          y -= Math.sin((cycle - 0.15) * 10 * Math.PI) * 4;
        }
        // Q dip
        else if (cycle >= 0.28 && cycle < 0.32) {
          y += 3;
        }
        // R spike (ventricular depolarization)
        else if (cycle >= 0.32 && cycle < 0.36) {
          y -= 26;
        }
        // S dip
        else if (cycle >= 0.36 && cycle < 0.40) {
          y += 8;
        }
        // T wave (repolarization)
        else if (cycle > 0.48 && cycle < 0.62) {
          y -= Math.sin((cycle - 0.48) * (1 / 0.14) * Math.PI) * 7;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      offset += isLiveTelemetry ? 2.5 : 0.8;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isLiveTelemetry]);

  return (
    <div className="space-y-4">
      {/* Top Proactive Alert Banner from Copilot */}
      <div className="relative overflow-hidden p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-purple-950/80 border border-blue-500/30 backdrop-blur-xl shadow-glass flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-glow-cyan/20">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">ALTRIX COPILOT INSIGHT</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">LONGITUDINAL SYNC OK</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
              Biological age dropped <strong className="text-cyan-300">-5.6 years</strong> below chronological age. Endothelial ApoB markers & deep sleep architecture remain in the top 5th percentile.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.click();
            onOpenCopilot();
          }}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 text-xs font-semibold border border-cyan-400/30 transition-all flex items-center gap-1.5 whitespace-nowrap"
        >
          <span>Ask Copilot</span>
          <span className="font-mono">→</span>
        </button>
      </div>

      {/* Grid of Key Glanceable Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* Card 1: Biological Age Clock */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl hover:border-cyan-500/40 transition-all shadow-glass group">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              BIOLOGICAL AGE
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
              -5.6 YRS
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-display tracking-tight text-shadow">
              {patientProfile.biologicalAge}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ Chrono {patientProfile.age}</span>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>Epigenetic Horvath clock verified</span>
          </div>
        </div>

        {/* Card 2: Overall Health Optimization Index */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl hover:border-emerald-500/40 transition-all shadow-glass group">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-mono flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              HEALTH INDEX
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
              {patientProfile.healthScoreDelta}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-300 font-display tracking-tight text-shadow">
              {patientProfile.healthScore}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 100 max</span>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>{patientProfile.summaryBadge}</span>
          </div>
        </div>

        {/* Card 3: Real-Time ECG Heart Rate with live canvas wave */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl hover:border-rose-500/40 transition-all shadow-glass group">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              RESTING HR
            </span>
            <span className="text-[10px] font-mono text-rose-400">ECG LIVE</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-rose-400 font-display tracking-tight">
              {bpm}
            </span>
            <span className="text-xs text-slate-400 font-mono">BPM (HRV 72ms)</span>
          </div>
          <div className="mt-1.5 h-7 w-full overflow-hidden rounded bg-slate-950/60 border border-slate-800/40">
            <canvas ref={canvasRef} width={220} height={28} className="w-full h-full block" />
          </div>
        </div>

        {/* Card 4: Metabolic Glucose & Blood Pressure */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl hover:border-amber-500/40 transition-all shadow-glass group">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-mono flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              GLUCOSE (CGM)
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
              DEXCOM G7
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-display tracking-tight">
              {glucose}
            </span>
            <span className="text-xs text-slate-400 font-mono">mg/dL (HbA1c 5.0%)</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>BP: 114/74 mmHg</span>
            <span className="text-emerald-400 font-medium">Optimal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
