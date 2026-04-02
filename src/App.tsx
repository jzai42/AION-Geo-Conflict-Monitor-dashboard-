/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Globe, 
  Languages,
  ShieldAlert, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  Info,
  Anchor,
  Zap as Energy,
  Target,
  Compass,
  Ship,
  Sword,
  Users,
  Sun,
  Moon
} from 'lucide-react';
import { DATA_ZH, DATA_EN, TRANSLATIONS, type DashboardData, type KeyEvent, type RiskFactor, type SituationCard } from './data';
import { cn } from './lib/utils';

// --- Components ---

const TopBanner = ({ t }: { t: any }) => (
  <div className="bg-green-500/10 border-b border-green-500/20 px-12 py-3 flex items-center justify-between text-[12px] font-sans font-bold tracking-tight">
    <div className="flex items-center gap-3 text-green-500">
      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      <span className="uppercase tracking-widest">{t.bannerSignal}</span>
    </div>
    <div className="flex items-center gap-3 text-aion-red">
      <AlertTriangle className="w-4 h-4" />
      <span className="uppercase tracking-widest">{t.bannerWarning}</span>
    </div>
  </div>
);

const Header = ({ date, version, warPhase, language, setLanguage, theme, setTheme, t }: { 
  date: string, 
  version: string, 
  warPhase: DashboardData['warPhase'],
  language: 'zh' | 'en',
  setLanguage: (l: 'zh' | 'en') => void,
  theme: 'dark' | 'light',
  setTheme: (t: 'dark' | 'light') => void,
  t: any
}) => {
  const [time, setTime] = useState(new Date().toISOString().replace('T', ' ').split('.')[0] + ' UTC');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toISOString().replace('T', ' ').split('.')[0] + ' UTC');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex items-center justify-between px-12 py-10 border-b border-aion-gray bg-aion-bg sticky top-0 z-50 backdrop-blur-3xl bg-opacity-80">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-aion-orange rounded-lg flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter font-sans text-aion-text">{t.title}</h1>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-[13px] font-sans font-bold text-aion-text tracking-tight">{t.conflictName}</span>
            <span className="w-1 h-1 rounded-full bg-aion-gray" />
            <span className="text-[13px] font-sans font-bold text-aion-orange uppercase tracking-widest">{t.dayCount}</span>
            <span className="w-1 h-1 rounded-full bg-aion-gray" />
            <span className="text-[13px] font-sans font-medium text-aion-text-dim">{date}</span>
            <span className="w-1 h-1 rounded-full bg-aion-gray" />
            <span className="text-[13px] font-sans font-medium text-aion-text-dim">{version}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-3 rounded-xl border border-aion-gray hover:bg-aion-text/5 transition-all text-aion-text-dim hover:text-aion-text"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-1 bg-aion-text/5 p-1.5 rounded-xl border border-aion-gray/50">
            <button 
              onClick={() => setLanguage('zh')}
              className={cn(
                "px-5 py-2 rounded-lg text-[14px] font-sans font-bold transition-all",
                language === 'zh' 
                  ? "bg-aion-orange text-white shadow-lg" 
                  : "text-aion-text-dim hover:text-aion-text"
              )}
            >
              中文
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={cn(
                "px-5 py-2 rounded-lg text-[14px] font-sans font-bold transition-all",
                language === 'en' 
                  ? "bg-aion-orange text-white shadow-lg" 
                  : "text-aion-text-dim hover:text-aion-text"
              )}
            >
              EN
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 font-sans text-[14px] font-bold">
            <div className="w-2 h-2 rounded-full bg-aion-orange animate-pulse" />
            <span className="text-aion-text uppercase tracking-widest">{t.realtime}</span>
            <span className="text-aion-text-dim font-medium ml-1">{time}</span>
          </div>
          <div className="flex items-center gap-3 text-[12px] font-sans font-bold text-aion-text-dim uppercase tracking-widest">
            <span>{t.phaseTransition}：{warPhase.level} → {warPhase.targetLevel}</span>
            <span className="w-1 h-1 rounded-full bg-aion-gray" />
            <span className="text-aion-orange">{t.node406}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const StatCard = ({ label, value, unit, color }: { label: string, value: string, unit: string, color: string, key?: React.Key }) => {
  return (
    <div 
      className="aion-card flex flex-col items-center justify-center text-center min-h-[180px] group transition-all hover:scale-[1.02] p-8"
      style={{ borderColor: `${color}40`, backgroundColor: `${color}08` }}
    >
      <div className="text-6xl font-sans font-bold tracking-tighter mb-3" style={{ color }}>{value}</div>
      <div className="aion-label mb-3 text-[14px] font-bold" style={{ color: `${color}cc` }}>{unit}</div>
      <div className="text-[12px] text-aion-text-dim font-sans font-bold uppercase tracking-widest">{label}</div>
    </div>
  );
};

const TrendChart = ({ trend }: { trend: DashboardData['scoreTrend'] }) => {
  // Use a baseline to make differences more obvious
  const minScore = Math.min(...trend.map(t => t.score)) - 5;
  const maxScore = Math.max(...trend.map(t => t.score)) + 5;
  const range = maxScore - minScore;

  return (
    <div className="flex items-end justify-between gap-2 h-32 w-full mt-8 px-2">
      {trend.map((t, i) => (
        <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
          <span className={cn(
            "text-[12px] font-sans font-semibold mb-2 transition-colors", 
            t.active ? "text-aion-green drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]" : "text-aion-text-dim group-hover:text-aion-text/70"
          )}>
            {t.score}
          </span>
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: `${((t.score - minScore) / range) * 60 + 20}%` }}
            transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
            className={cn(
              "w-full max-w-[40px] rounded-t-lg transition-all duration-500",
              t.active 
                ? "bg-aion-green shadow-[0_0_20px_rgba(57,255,20,0.6)]" 
                : "bg-aion-gray border-t border-x border-aion-text/5"
            )}
          />
          <span className="text-[10px] font-sans font-medium text-aion-text-dim mt-3">{t.date}</span>
        </div>
      ))}
    </div>
  );
};

const RiskGauge = ({ score, prev, trend, t }: { score: number, prev: number, trend: DashboardData['scoreTrend'], t: any }) => {
  const delta = score - prev;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="aion-card flex flex-col items-center justify-center p-10 relative overflow-hidden">
      <div className="aion-label mb-8 text-center whitespace-pre-line text-[15px] font-semibold tracking-tight">{t.riskScoreTitle}</div>
      
      <div className="relative flex items-center justify-center">
        <svg className="w-56 h-56 transform -rotate-90">
          <circle cx="112" cy="112" r={radius} stroke="currentColor" strokeWidth="14" fill="transparent" className="text-aion-gray" />
          <motion.circle 
            cx="112" cy="112" r={radius} 
            stroke="currentColor" strokeWidth="14" 
            fill="transparent" 
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-aion-orange"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-6xl font-sans font-bold tracking-tighter text-aion-text">{score}</span>
          <span className="aion-label text-[12px] mt-2">{t.weightedScore}</span>
        </div>
      </div>

      <div className="mt-10 w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="aion-label text-[11px] font-semibold">{t.trendTitle}</div>
          <div className="flex items-center gap-2">
            <span className={cn("text-[13px] font-sans font-bold", delta > 0 ? "text-aion-red" : "text-aion-green")}>
              {delta > 0 ? '▲' : '▼'} {Math.abs(delta)}
            </span>
            <span className="text-[11px] font-sans text-aion-text-dim">{t.vsPrev}</span>
          </div>
        </div>
        <TrendChart trend={trend} />
      </div>
    </div>
  );
};

const WarPhase = ({ phase, keyChange, t }: { phase: DashboardData['warPhase'], keyChange: string, t: any }) => {
  return (
    <div className={cn(
      "aion-card flex-1 flex flex-col p-10 border-t-4 transition-all",
      phase.targetLevel.includes('5') ? "border-t-green-500 border-x-green-500/10 border-b-green-500/10 bg-green-500/5" : "border-t-aion-red border-x-aion-red/10 border-b-aion-red/10 bg-aion-red/5"
    )}>
      <div className="flex items-center justify-between mb-8">
        <div className="aion-label text-[15px] font-semibold tracking-tight">{t.conflictPhase}</div>
        <div className="flex items-center gap-2 bg-aion-orange/10 border border-aion-orange/30 px-4 py-1.5 rounded-xl">
          <Clock className="w-4 h-4 text-aion-orange" />
          <span className="text-[12px] font-sans font-semibold text-aion-orange uppercase tracking-wider">{t.node406}</span>
        </div>
      </div>

      <div className="flex items-baseline gap-6 mb-4">
        <span className="text-4xl font-sans font-bold text-aion-red tracking-tighter">{phase.level}</span>
        <span className="text-2xl font-sans font-medium text-aion-text-dim">→</span>
        <span className="text-4xl font-sans font-bold text-green-500 tracking-tighter">{phase.targetLevel}</span>
      </div>
      <div className="text-2xl font-sans font-bold text-aion-text mb-2 tracking-tight">{phase.title}</div>
      <div className="text-[15px] font-sans font-medium text-aion-text-dim mb-8">{phase.subTitle}</div>

      <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl mb-8">
        <div className="text-[12px] font-sans font-bold text-green-500 uppercase mb-3 tracking-wider">{t.importantChange}</div>
        <div className="text-[16px] text-aion-text font-sans leading-relaxed">{keyChange}</div>
      </div>

      <div className="space-y-4 mb-8">
        {phase.points.map((point, i) => (
          <div key={i} className="bg-aion-text/5 border border-aion-gray px-4 py-3 rounded-xl flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-aion-orange" />
            <span className="text-[14px] font-sans font-medium text-aion-text">{point}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto p-5 rounded-xl bg-aion-amber/10 border border-aion-amber/30">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-aion-amber" />
          <span className="text-[12px] font-sans font-bold text-aion-amber uppercase tracking-wider">STATUS NOTE</span>
        </div>
        <p className="text-[14px] font-sans font-medium text-aion-amber leading-relaxed">{phase.note}</p>
      </div>
    </div>
  );
};

const EventItem = ({ event, index, t }: { event: KeyEvent, index: number, t: any, key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(
      "border-b border-aion-gray last:border-0 transition-all",
      event.critical && "bg-aion-red/5"
    )}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-aion-text/5 transition-colors text-left"
      >
        <div className="flex items-center gap-8">
          <span className="font-sans text-[12px] font-bold text-aion-text-dim uppercase tracking-widest">{t.event} {String(index + 1).padStart(2, '0')}</span>
          <div className="flex items-center gap-4">
            {event.verification === 'confirmed' && (
              <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                <span className="text-[10px] font-sans font-bold text-green-500 uppercase tracking-wider">{t.verified}</span>
              </div>
            )}
            {event.verification === 'single' && (
              <div className="flex items-center gap-1.5 bg-aion-red/10 border border-aion-red/30 px-3 py-1 rounded-full">
                <AlertCircle className="w-3.5 h-3.5 text-aion-red" />
                <span className="text-[10px] font-sans font-bold text-aion-red uppercase tracking-wider">{t.singleSource}</span>
              </div>
            )}
            {event.highlight && (
              <div className="flex items-center gap-1.5 bg-aion-orange/10 border border-aion-orange/30 px-3 py-1 rounded-full">
                <Zap className="w-3.5 h-3.5 text-aion-orange" />
                <span className="text-[10px] font-sans font-bold text-aion-orange uppercase tracking-wider">{t.keyChange}</span>
              </div>
            )}
            <h3 className="text-[16px] font-sans font-bold tracking-tight text-aion-text">{event.title}</h3>
          </div>
        </div>
        <ChevronDown className={cn("w-5 h-5 text-aion-text-dim transition-transform", isOpen && "rotate-180")} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-24 pb-8 pt-2">
              <p className="text-[15px] text-aion-text/80 font-sans leading-relaxed max-w-3xl mb-6">
                {event.description}
              </p>
              {event.significance && (
                <div className="bg-aion-text/5 p-5 rounded-xl border border-aion-gray mb-6">
                  <div className="text-[11px] font-sans font-bold text-aion-text-dim uppercase mb-2 tracking-wider">{t.judgementSignificance}</div>
                  <p className="text-[14px] text-aion-text font-sans italic leading-relaxed">{event.significance}</p>
                </div>
              )}
              <div className="flex items-center gap-6">
                <span className="text-[11px] font-sans font-bold text-aion-text-dim uppercase tracking-wider">{t.source}: {event.verification === 'confirmed' ? t.verified : t.singleSource}</span>
                <span className="text-[11px] font-sans font-bold text-aion-text-dim uppercase tracking-wider">{t.time}: {event.timestamp}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RiskFactorRow = ({ factor, t }: { factor: RiskFactor, t: any, key?: React.Key }) => {
  const delta = factor.score - factor.prev;
  
  return (
    <div className="py-6 border-b border-aion-gray last:border-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h4 className="text-[16px] font-sans font-bold tracking-tight text-aion-text">{factor.name}</h4>
          <div className="flex items-center gap-2">
            {factor.status === 'AT CEILING' && (
              <div className="px-3 py-1 rounded-full text-[10px] font-sans font-bold bg-aion-red/10 border border-aion-red/30 text-aion-red flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                {t.atCeiling}
              </div>
            )}
            {factor.change === 'structural' && (
              <div className="px-3 py-1 rounded-full text-[10px] font-sans font-bold bg-aion-yellow/10 border border-aion-yellow/30 text-aion-yellow flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                {t.structuralChange}
              </div>
            )}
            {factor.status === 'FAST' && (
              <div className="px-3 py-1 rounded-full text-[10px] font-sans font-bold bg-aion-orange/10 border border-aion-orange/30 text-aion-orange">
                {t.fastVar}
              </div>
            )}
            {factor.status === 'SLOW' && (
              <div className="px-3 py-1 rounded-full text-[10px] font-sans font-bold bg-blue-500/10 border border-blue-500/30 text-blue-400">
                {t.slowVar}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-sans font-bold text-aion-text-dim uppercase tracking-wider">{t.weight}</span>
                <span className="text-[14px] font-sans font-bold text-aion-text">{Math.round(factor.weight * 100)}%</span>
              </div>
              {delta !== 0 && (
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-sans font-bold text-aion-text-dim uppercase tracking-wider">CHG</span>
                  <span className={cn("text-[14px] font-sans font-bold", delta > 0 ? "text-aion-red" : "text-green-500")}>
                    {delta > 0 ? '▲' : '▼'}{Math.abs(delta).toFixed(1)}
                  </span>
                </div>
              )}
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-sans font-bold text-aion-text-dim uppercase tracking-wider">SCORE</span>
                <span className="text-3xl font-sans font-bold text-aion-text tracking-tighter">{factor.score.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative h-2 bg-aion-gray rounded-full overflow-hidden mb-4">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(factor.score / 5) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "absolute inset-y-0 left-0 rounded-full",
            factor.status === 'AT CEILING' ? "bg-aion-red" : "bg-aion-orange"
          )}
        />
        {factor.status === 'AT CEILING' && (
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,var(--aion-stripe)_5px,var(--aion-stripe)_10px)] opacity-30" />
        )}
      </div>
      
      <p className="text-[14px] text-aion-text-dim font-sans leading-relaxed">{factor.description}</p>
    </div>
  );
};

const SituationTab = ({ situations, coreContradiction, t }: { situations: SituationCard[], coreContradiction: DashboardData['coreContradiction'], t: any }) => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {situations.map((card, i) => (
          <div 
            key={i} 
            className={cn(
              "aion-card border-t-4 transition-all p-10",
              card.tagColor === 'red' && "border-t-aion-red border-x-aion-red/30 border-b-aion-red/30 bg-aion-red/10",
              card.tagColor === 'yellow' && "border-t-aion-yellow border-x-aion-yellow/30 border-b-aion-yellow/30 bg-aion-yellow/10",
              card.tagColor === 'orange' && "border-t-aion-orange border-x-aion-orange/30 border-b-aion-orange/30 bg-aion-orange/10",
              card.tagColor === 'green' && "border-t-aion-green border-x-aion-green/30 border-b-aion-green/30 bg-aion-green/10"
            )}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                {card.icon === 'Military' && <Sword className={cn("w-6 h-6", card.tagColor === 'red' ? "text-aion-red" : "text-aion-text")} />}
                {card.icon === 'Shipping' && <Anchor className={cn("w-6 h-6", card.tagColor === 'yellow' ? "text-aion-yellow" : "text-aion-text")} />}
                {card.icon === 'Energy' && <Activity className={cn("w-6 h-6", card.tagColor === 'orange' ? "text-aion-orange" : "text-aion-text")} />}
                {card.icon === 'Leadership' && <Compass className={cn("w-6 h-6", card.tagColor === 'green' ? "text-aion-green" : "text-aion-text")} />}
                <h4 className="text-[18px] font-sans font-bold tracking-tight text-aion-text">{card.title}</h4>
              </div>
              {card.tag && (
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-sans font-bold border uppercase tracking-wider",
                  card.tagColor === 'red' && "bg-aion-red/10 border-aion-red/30 text-aion-red",
                  card.tagColor === 'yellow' && "bg-aion-yellow/10 border-aion-yellow/30 text-aion-yellow",
                  card.tagColor === 'orange' && "bg-aion-orange/10 border-aion-orange/30 text-aion-orange",
                  card.tagColor === 'green' && "bg-green-500/10 border-green-500/30 text-green-500"
                )}>
                  {card.tag}
                </div>
              )}
            </div>
            
            <ul className="space-y-4">
              {card.points.map((p, j) => (
                <li key={j} className="flex items-start gap-4 group">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full mt-2 transition-transform group-hover:scale-150",
                    card.tagColor === 'red' && "bg-aion-red",
                    card.tagColor === 'yellow' && "bg-aion-yellow",
                    card.tagColor === 'orange' && "bg-aion-orange",
                    card.tagColor === 'green' && "bg-aion-green"
                  )} />
                  <span className="text-[14px] font-sans font-medium text-aion-text/80 leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="aion-card border-aion-amber/20 bg-aion-amber/5 p-10">
        <div className="flex items-center gap-3 mb-8">
          <Zap className="w-6 h-6 text-aion-amber" />
          <span className="aion-label text-[15px] font-bold text-aion-amber tracking-tight">{t.coreContradiction}</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-12 relative">
          <div className="flex-1 w-full bg-green-500/5 border border-green-500/20 p-8 rounded-xl">
            <div className="text-[12px] font-sans font-bold text-green-500 uppercase mb-6 tracking-wider">{t.politicalLevel}</div>
            <ul className="space-y-3">
              {coreContradiction.political.map((p, i) => (
                <li key={i} className="text-[15px] text-aion-text font-sans leading-relaxed">{p}</li>
              ))}
            </ul>
            <div className="mt-6 text-[12px] font-sans font-bold text-green-500/70 uppercase tracking-wider">{t.deescalationIntent}</div>
          </div>

          <div className="text-4xl font-sans font-bold text-aion-amber">≠</div>

          <div className="flex-1 w-full bg-aion-red/5 border border-aion-red/20 p-8 rounded-xl">
            <div className="text-[12px] font-sans font-bold text-aion-red uppercase mb-6 tracking-wider">{t.militaryLevel}</div>
            <ul className="space-y-3">
              {coreContradiction.military.map((p, i) => (
                <li key={i} className="text-[15px] text-aion-text font-sans leading-relaxed">{p}</li>
              ))}
            </ul>
            <div className="mt-6 text-[12px] font-sans font-bold text-aion-red/70 uppercase tracking-wider">{t.structuralRisk}</div>
          </div>
        </div>

        <p className="mt-10 text-[14px] font-sans font-bold text-aion-amber/80 uppercase tracking-widest leading-relaxed text-center">
          {t.contradictionNote}
        </p>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'events' | 'factors' | 'situations'>('events');
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const systemLang = navigator.language.toLowerCase();
    if (systemLang.startsWith('zh')) {
      setLanguage('zh');
    } else {
      setLanguage('en');
    }
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const data = language === 'zh' ? DATA_ZH : DATA_EN;

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-aion-red selection:text-white bg-aion-bg text-aion-text">
      <TopBanner t={t} />
      <Header 
        date={data.date} 
        version={data.version} 
        warPhase={data.warPhase} 
        language={language} 
        setLanguage={setLanguage} 
        theme={theme}
        setTheme={setTheme}
        t={t}
      />
      
      <main className="flex-1 max-w-[1600px] mx-auto w-full px-10 py-12 space-y-12">
        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.keyStats.map((stat, i) => (
            <StatCard key={i} label={stat.label} value={stat.value} unit={stat.unit} color={stat.color} />
          ))}
        </div>

        {/* Main Dashboard Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Risk Gauge */}
          <div className="lg:col-span-4 flex flex-col">
            <RiskGauge score={data.riskScore} prev={data.prevRiskScore} trend={data.scoreTrend} t={t} />
          </div>

          {/* Center: War Phase */}
          <div className="lg:col-span-5 flex flex-col">
            <WarPhase phase={data.warPhase} keyChange={data.keyChange} t={t} />
          </div>

          {/* Right: Signal & Status */}
          <div className="lg:col-span-3 flex flex-col gap-10">
            <div className="aion-card flex-1 border-l-4 border-l-aion-amber bg-aion-amber/5 p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-aion-amber" />
                <span className="aion-label text-[15px] font-bold text-aion-amber tracking-tight">{t.investmentSignal}</span>
              </div>
              <p className="text-[18px] font-sans font-bold italic leading-relaxed text-aion-text">
                {data.investmentSignal}
              </p>
            </div>

            <div className="aion-card border-l-4 border-l-green-500 bg-green-500/5 p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <span className="aion-label text-[15px] font-bold text-green-500 tracking-tight">{t.verified}</span>
              </div>
              <div className="text-[24px] font-sans font-bold text-aion-text tracking-tight">
                {data.events.filter(e => e.verification === 'confirmed').length} {t.keyEvents}
              </div>
              <div className="text-[14px] font-sans font-medium text-aion-text-dim mt-2">
                {t.node406} {t.verified}
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Detailed View */}
        <div className="aion-card p-0 overflow-hidden">
          <div className="flex border-b border-aion-gray bg-aion-text/5">
            {(['events', 'factors', 'situations'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-12 py-6 text-[13px] font-sans font-bold tracking-widest uppercase transition-all relative",
                  activeTab === tab ? "text-aion-orange" : "text-aion-text-dim hover:text-aion-text"
                )}
              >
                {tab === 'events' && t.keyEvents}
                {tab === 'factors' && t.riskFactors}
                {tab === 'situations' && t.situationAnalysis}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-aion-orange"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-10 bg-aion-card">
            <AnimatePresence mode="wait">
              {activeTab === 'events' && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-1"
                >
                  <div className="flex items-center gap-6 mb-8 text-[12px] font-sans font-bold text-aion-text-dim uppercase tracking-wider">
                    <span>{data.events.filter(e => e.verification === 'confirmed').length} {t.verified}</span>
                    <span>•</span>
                    <span>{data.events.filter(e => e.verification === 'single').length} {t.singleSource}</span>
                    <span>•</span>
                    <span>{t.clickExpand}</span>
                  </div>
                  {data.events.map((event, i) => (
                    <EventItem key={event.id} event={event} index={i} t={t} />
                  ))}
                </motion.div>
              )}

              {activeTab === 'factors' && (
                <motion.div
                  key="factors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                >
                  <div className="lg:col-span-8 space-y-2">
                    <div className="aion-label mb-6 text-[11px] font-bold tracking-widest uppercase text-aion-text-dim">
                      {language === 'zh' ? '加权因子评分 · ▲▼ 较03-28 · 权重占比' : 'Weighted Factor Score · ▲▼ vs 03-28 · Weight'}
                    </div>
                    {data.riskFactors.map((factor) => (
                      <RiskFactorRow key={factor.name} factor={factor} t={t} />
                    ))}
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-8">
                    <div className="aion-card border-aion-gray/50 bg-aion-text/5 flex flex-col items-center justify-center p-10">
                      <div className="aion-label mb-6 text-[13px] font-bold tracking-widest uppercase text-aion-text-dim">
                        {language === 'zh' ? '加 权 综 合 评 分' : 'WEIGHTED COMPOSITE SCORE'}
                      </div>
                      <div className="text-[12px] font-sans font-bold text-aion-text-dim mb-6 tracking-wider">
                        {t.weightedFormula} = 4.300
                      </div>
                      <div className="text-8xl font-sans font-bold text-aion-orange mb-4 tracking-tighter">
                        {data.riskScore}
                      </div>
                      <div className="aion-label text-aion-orange text-[15px] font-bold tracking-tight">
                        {t.riskScoreTitle.replace('\n', ' ')}
                      </div>
                    </div>

                    <div className="aion-card border-aion-gray/50 bg-aion-text/5 p-10">
                      <div className="aion-label mb-6 text-[13px] font-bold tracking-widest uppercase text-aion-text-dim">
                        {t.trendTitle}
                      </div>
                      <TrendChart trend={data.scoreTrend} />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border border-green-500/30 bg-green-500/5 p-4 text-center rounded-xl">
                        <div className="text-green-500 text-[14px] font-sans font-bold mb-1">&lt;40</div>
                        <div className="text-green-500/50 text-[10px] font-sans font-bold uppercase tracking-wider">{t.lowRisk}</div>
                      </div>
                      <div className="border border-aion-yellow/30 bg-aion-yellow/5 p-4 text-center rounded-xl">
                        <div className="text-aion-yellow text-[14px] font-sans font-bold mb-1">40-70</div>
                        <div className="text-aion-yellow/50 text-[10px] font-sans font-bold uppercase tracking-wider">{t.highRisk}</div>
                      </div>
                      <div className="border border-aion-red/50 bg-aion-red/10 p-4 text-center rounded-xl">
                        <div className="text-aion-red text-[14px] font-sans font-bold mb-1">&gt;70</div>
                        <div className="text-aion-red/50 text-[10px] font-sans font-bold uppercase tracking-wider">{t.extremeRisk}</div>
                      </div>
                    </div>

                    <div className="aion-card border-aion-yellow/20 bg-aion-yellow/5 p-10">
                      <div className="flex items-center gap-3 mb-6">
                        <Clock className="w-5 h-5 text-aion-yellow" />
                        <span className="aion-label text-[15px] font-bold text-aion-yellow tracking-tight">{t.observationNodes}</span>
                      </div>
                      <div className="text-4xl font-sans font-bold text-aion-yellow mb-4 tracking-tighter">
                        {language === 'zh' ? '4月6日' : 'April 6'}
                      </div>
                      <ul className="space-y-3">
                        <li className="text-[14px] font-sans font-medium text-aion-text-dim leading-relaxed">• {t.energyDeadline}</li>
                        <li className="text-[14px] font-sans font-medium text-aion-text-dim leading-relaxed">• {t.negotiationValidity}</li>
                        <li className="text-[14px] font-sans font-medium text-aion-text-dim leading-relaxed">• {t.signalConfirmation}</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'situations' && (
                <motion.div
                  key="situations"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <SituationTab situations={data.situations} coreContradiction={data.coreContradiction} t={t} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="px-10 py-8 border-t border-aion-gray bg-aion-bg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-sans font-bold text-aion-text-dim uppercase tracking-widest">
              {t.systemInfo}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="text-[11px] font-sans font-bold text-aion-text-dim uppercase tracking-widest">
            {t.sources}: Reuters · Guardian · The Times · Wired · 2026-04-01
          </span>
        </div>
      </footer>
    </div>
  );
}
