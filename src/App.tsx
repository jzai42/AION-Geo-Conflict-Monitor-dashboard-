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

// --- Components (AION v2.4 Force Sync) ---

const TopBanner = ({ t }: { t: any }) => (
  <div className="bg-green-500/10 border-b border-green-500/20 px-6 py-1.5 flex items-center justify-between text-[10px] font-mono">
    <div className="flex items-center gap-2 text-green-500">
      <ChevronDown className="w-3 h-3" />
      <span>{t.bannerSignal}</span>
    </div>
    <div className="flex items-center gap-2 text-aion-red">
      <AlertTriangle className="w-3 h-3" />
      <span>{t.bannerWarning}</span>
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
    <header className="flex items-center justify-between px-6 py-4 border-b border-aion-gray bg-aion-bg sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-[0.2em] font-mono text-aion-text">{t.title}</h1>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="aion-label text-[9px]">{t.conflictName}</span>
            <span className="w-1 h-1 rounded-full bg-aion-gray" />
            <span className="aion-label text-[9px]">{t.dayCount}</span>
            <span className="w-1 h-1 rounded-full bg-aion-gray" />
            <span className="aion-label text-[9px]">{date}</span>
            <span className="w-1 h-1 rounded-full bg-aion-gray" />
            <span className="aion-label text-[9px]">{version}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-sm border border-aion-gray hover:bg-aion-text/5 transition-colors text-aion-text-dim hover:text-aion-text"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-1 bg-aion-text/5 p-1 rounded-sm border border-aion-gray/50">
            <button 
              onClick={() => setLanguage('zh')}
              className={cn(
                "px-3 py-1 rounded-sm text-[10px] font-mono transition-all",
                language === 'zh' 
                  ? "bg-aion-orange text-white font-bold shadow-[0_0_10px_rgba(255,136,0,0.3)]" 
                  : "text-aion-text-dim hover:text-aion-text"
              )}
            >
              中文
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={cn(
                "px-3 py-1 rounded-sm text-[10px] font-mono transition-all",
                language === 'en' 
                  ? "bg-aion-orange text-white font-bold shadow-[0_0_10px_rgba(255,136,0,0.3)]" 
                  : "text-aion-text-dim hover:text-aion-text"
              )}
            >
              EN
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <div className="w-2 h-2 rounded-full bg-aion-orange animate-pulse" />
            <span className="text-aion-text-dim">{t.realtime} ·</span>
            <span className="text-aion-text-dim">{time}</span>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-mono text-aion-text-dim">
            <span>{t.phaseTransition}：{warPhase.level} → {warPhase.targetLevel}</span>
            <span className="w-1 h-1 rounded-full bg-aion-gray" />
            <span>{t.node406}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const StatCard = ({ label, value, unit, color }: { label: string, value: string, unit: string, color: string, key?: React.Key }) => {
  return (
    <div 
      className="aion-card flex flex-col items-center justify-center text-center min-h-[120px] group transition-all"
      style={{ borderColor: `${color}40`, backgroundColor: `${color}08` }}
    >
      <div className="text-4xl font-mono font-bold mb-1" style={{ color, textShadow: `0 0 15px ${color}40` }}>{value}</div>
      <div className="aion-label mb-1" style={{ color: `${color}cc` }}>{unit}</div>
      <div className="text-[10px] text-aion-text-dim font-mono uppercase tracking-tighter">{label}</div>
    </div>
  );
};

const TrendChart = ({ trend }: { trend: DashboardData['scoreTrend'] }) => {
  // Use a baseline to make differences more obvious
  const minScore = Math.min(...trend.map(t => t.score)) - 5;
  const maxScore = Math.max(...trend.map(t => t.score)) + 5;
  const range = maxScore - minScore;

  return (
    <div className="flex items-end justify-between gap-1 h-28 w-full mt-4 px-1">
      {trend.map((t, i) => (
        <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
          <span className={cn(
            "text-[10px] font-mono mb-1 font-bold transition-colors", 
            t.active ? "text-aion-green drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]" : "text-aion-text-dim group-hover:text-aion-text/70"
          )}>
            {t.score}
          </span>
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: `${((t.score - minScore) / range) * 60 + 20}%` }}
            transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
            className={cn(
              "w-full max-w-[36px] rounded-t-[4px] transition-all duration-500",
              t.active 
                ? "bg-aion-green shadow-[0_0_20px_rgba(57,255,20,0.6)]" 
                : "bg-aion-gray border-t border-x border-aion-text/5"
            )}
          />
          <span className="text-[8px] font-mono text-aion-text-dim mt-2">{t.date}</span>
        </div>
      ))}
    </div>
  );
};

const RiskGauge = ({ score, prev, trend, t }: { score: number, prev: number, trend: DashboardData['scoreTrend'], t: any }) => {
  const delta = score - prev;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="aion-card flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="aion-label mb-6 text-center whitespace-pre-line">{t.riskScoreTitle}</div>
      
      <div className="relative flex items-center justify-center">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle cx="96" cy="96" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-aion-gray" />
          <motion.circle
            cx="96" cy="96" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-aion-orange drop-shadow-[0_0_8px_rgba(255,136,0,0.5)]"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-mono font-bold">{score}</span>
          <span className="aion-label text-[10px] mt-1">{t.weightedScore}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4 w-full">
        <div className="bg-green-500/10 border border-green-500/30 px-6 py-1 rounded-sm flex items-center gap-2">
          <ChevronDown className="w-3 h-3 text-green-500" />
          <span className="font-mono text-xs text-green-500">
            {Math.abs(delta)} {t.vsPrev}
          </span>
        </div>

        <div className="w-full pt-4 border-t border-aion-gray">
          <div className="aion-label text-[9px] mb-2">{t.trendTitle}</div>
          <TrendChart trend={trend} />
        </div>
      </div>
    </div>
  );
};

const WarPhase = ({ phase, keyChange, t }: { phase: DashboardData['warPhase'], keyChange: string, t: any }) => {
  return (
    <div className={cn(
      "aion-card flex-1 flex flex-col p-6 border-t-4 transition-all",
      phase.targetLevel.includes('5') ? "border-t-green-500 border-x-green-500/10 border-b-green-500/10 bg-green-500/5" : "border-t-aion-red border-x-aion-red/10 border-b-aion-red/10 bg-aion-red/5"
    )}>
      <div className="flex items-center justify-between mb-6">
        <div className="aion-label">{t.conflictPhase}</div>
        <div className="flex items-center gap-2 bg-aion-orange/10 border border-aion-orange/30 px-3 py-1 rounded-sm">
          <Clock className="w-3 h-3 text-aion-orange" />
          <span className="text-[10px] font-mono text-aion-orange uppercase tracking-widest">{t.node406}</span>
        </div>
      </div>

      <div className="flex items-baseline gap-4 mb-2">
        <span className="text-2xl font-mono font-bold text-aion-red">{phase.level}</span>
        <span className="text-xl font-mono text-aion-text-dim">→</span>
        <span className="text-2xl font-mono font-bold text-green-500">{phase.targetLevel}</span>
        <span className="text-sm font-mono text-aion-text tracking-widest uppercase ml-2">{phase.title}</span>
      </div>
      <div className="text-xs font-mono text-aion-orange mb-6 tracking-widest">{phase.subTitle}</div>

      <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-sm mb-6">
        <div className="text-[9px] font-mono text-green-500 uppercase mb-2 tracking-widest">{t.importantChange}</div>
        <div className="text-sm text-aion-text/90 font-mono leading-relaxed">{keyChange}</div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {phase.points.map((point, i) => (
          <div key={i} className="bg-aion-text/5 border border-aion-gray px-3 py-2 rounded-sm flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-aion-text-dim rotate-45" />
            <span className="text-[10px] text-aion-text-dim">{point}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 text-aion-orange">
        <span className="text-lg">↳</span>
        <span className="text-[11px] font-mono italic">
          {phase.note}
        </span>
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
        className="w-full flex items-center justify-between p-4 hover:bg-aion-text/5 transition-colors text-left"
      >
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] text-aion-text-dim">{t.event} {String(index + 1).padStart(2, '0')}</span>
          <div className="flex items-center gap-3">
            {event.verification === 'confirmed' && (
              <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded-sm">
                <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
                <span className="text-[8px] font-mono text-green-500 uppercase">{t.verified}</span>
              </div>
            )}
            {event.verification === 'single' && (
              <div className="flex items-center gap-1 bg-aion-red/10 border border-aion-red/30 px-2 py-0.5 rounded-sm">
                <AlertCircle className="w-2.5 h-2.5 text-aion-red" />
                <span className="text-[8px] font-mono text-aion-red uppercase">{t.singleSource}</span>
              </div>
            )}
            {event.highlight && (
              <div className="flex items-center gap-1 bg-aion-orange/10 border border-aion-orange/30 px-2 py-0.5 rounded-sm">
                <Zap className="w-2.5 h-2.5 text-aion-orange" />
                <span className="text-[8px] font-mono text-aion-orange uppercase">{t.keyChange}</span>
              </div>
            )}
            <h3 className="text-sm font-mono tracking-tight text-aion-text">{event.title}</h3>
          </div>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-aion-text-dim transition-transform", isOpen && "rotate-180")} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-16 pb-6 pt-2">
              <p className="text-xs text-aion-text/70 leading-relaxed max-w-3xl mb-4">
                {event.description}
              </p>
              {event.significance && (
                <div className="bg-aion-text/5 p-3 rounded-sm border border-aion-gray mb-4">
                  <div className="text-[8px] font-mono text-aion-text-dim uppercase mb-1 tracking-widest">{t.judgementSignificance}</div>
                  <p className="text-[11px] text-aion-text-dim font-mono italic">{event.significance}</p>
                </div>
              )}
              <div className="flex items-center gap-4">
                <span className="text-[9px] font-mono text-aion-text-dim uppercase">{t.source}: {event.verification === 'confirmed' ? t.verified : t.singleSource}</span>
                <span className="text-[9px] font-mono text-aion-text-dim uppercase">{t.time}: {event.timestamp}</span>
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
    <div className="py-4 border-b border-aion-gray last:border-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <h4 className="text-sm font-mono tracking-widest text-aion-text">{factor.name}</h4>
          {factor.status === 'AT CEILING' && (
            <div className="px-2 py-0.5 rounded-sm text-[8px] font-mono bg-aion-red/10 border border-aion-red/30 text-aion-red flex items-center gap-1">
              <AlertTriangle className="w-2.5 h-2.5" />
              {t.atCeiling}
            </div>
          )}
          {factor.change === 'structural' && (
            <div className="px-2 py-0.5 rounded-sm text-[8px] font-mono bg-aion-yellow/10 border border-aion-yellow/30 text-aion-yellow flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" />
              {t.structuralChange}
            </div>
          )}
          {factor.status === 'FAST' && (
            <div className="px-2 py-0.5 rounded-sm text-[8px] font-mono bg-aion-orange/10 border border-aion-orange/30 text-aion-orange">
              {t.fastVar}
            </div>
          )}
          {factor.status === 'SLOW' && (
            <div className="px-2 py-0.5 rounded-sm text-[8px] font-mono bg-blue-500/10 border border-blue-500/30 text-blue-400">
              {t.slowVar}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-aion-text-dim">{t.weight}:{Math.round(factor.weight * 100)}%</span>
              {delta !== 0 && (
                <span className={cn("text-[10px] font-mono", delta > 0 ? "text-aion-red" : "text-green-500")}>
                  {delta > 0 ? '▲' : '▼'}{Math.abs(delta).toFixed(1)}
                </span>
              )}
              <span className="text-2xl font-mono font-bold text-aion-red">{factor.score.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative h-1.5 bg-aion-gray rounded-full overflow-hidden mb-2">
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
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,var(--aion-stripe)_5px,var(--aion-stripe)_10px)]" />
        )}
      </div>
      
      <p className="text-[10px] text-aion-text-dim font-mono leading-relaxed">{factor.description}</p>
    </div>
  );
};

const SituationTab = ({ situations, coreContradiction, t }: { situations: SituationCard[], coreContradiction: DashboardData['coreContradiction'], t: any }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {situations.map((card, i) => (
          <div 
            key={i} 
            className={cn(
              "aion-card border-t-4 transition-all",
              card.tagColor === 'red' && "border-t-aion-red border-x-aion-red/30 border-b-aion-red/30 bg-aion-red/10",
              card.tagColor === 'yellow' && "border-t-aion-yellow border-x-aion-yellow/30 border-b-aion-yellow/30 bg-aion-yellow/10",
              card.tagColor === 'orange' && "border-t-aion-orange border-x-aion-orange/30 border-b-aion-orange/30 bg-aion-orange/10",
              card.tagColor === 'green' && "border-t-aion-green border-x-aion-green/30 border-b-aion-green/30 bg-aion-green/10"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {card.icon === 'Military' && <Sword className={cn("w-5 h-5", card.tagColor === 'red' ? "text-aion-red" : "text-aion-text")} />}
                {card.icon === 'Shipping' && <Anchor className={cn("w-5 h-5", card.tagColor === 'yellow' ? "text-aion-yellow" : "text-aion-text")} />}
                {card.icon === 'Energy' && <Activity className={cn("w-5 h-5", card.tagColor === 'orange' ? "text-aion-orange" : "text-aion-text")} />}
                {card.icon === 'Leadership' && <Compass className={cn("w-5 h-5", card.tagColor === 'green' ? "text-aion-green" : "text-aion-text")} />}
                <h4 className="text-sm font-mono font-bold tracking-widest text-aion-text">{card.title}</h4>
              </div>
              {card.tag && (
                <div className={cn(
                  "px-2 py-0.5 rounded-sm text-[8px] font-mono border",
                  card.tagColor === 'red' && "bg-aion-red/10 border-aion-red/30 text-aion-red",
                  card.tagColor === 'yellow' && "bg-aion-yellow/10 border-aion-yellow/30 text-aion-yellow",
                  card.tagColor === 'orange' && "bg-aion-orange/10 border-aion-orange/30 text-aion-orange",
                  card.tagColor === 'green' && "bg-green-500/10 border-green-500/30 text-green-500"
                )}>
                  {card.tag}
                </div>
              )}
            </div>
            <ul className="space-y-2">
              {card.points.map((p, j) => (
                <li key={j} className="flex items-start gap-2">
                  <div className={cn(
                    "w-1 h-1 mt-1.5 rotate-45 shrink-0",
                    card.tagColor === 'red' && "bg-aion-red",
                    card.tagColor === 'yellow' && "bg-aion-yellow",
                    card.tagColor === 'orange' && "bg-aion-orange",
                    card.tagColor === 'green' && "bg-aion-green"
                  )} />
                  <span className="text-[11px] text-aion-text-dim font-mono leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="aion-card border-aion-amber/20 bg-aion-amber/5 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-4 h-4 text-aion-amber" />
          <span className="aion-label text-aion-amber">{t.coreContradiction}</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative">
          <div className="flex-1 w-full bg-green-500/5 border border-green-500/20 p-6 rounded-sm">
            <div className="text-[10px] font-mono text-green-500 uppercase mb-4">{t.politicalLevel}</div>
            <ul className="space-y-2">
              {coreContradiction.political.map((p, i) => (
                <li key={i} className="text-xs text-aion-text/80 font-mono">{p}</li>
              ))}
            </ul>
            <div className="mt-4 text-[10px] font-mono text-green-500/70">{t.deescalationIntent}</div>
          </div>

          <div className="text-3xl font-mono text-aion-amber">≠</div>

          <div className="flex-1 w-full bg-aion-red/5 border border-aion-red/20 p-6 rounded-sm">
            <div className="text-[10px] font-mono text-aion-red uppercase mb-4">{t.militaryLevel}</div>
            <ul className="space-y-2">
              {coreContradiction.military.map((p, i) => (
                <li key={i} className="text-xs text-aion-text/80 font-mono">{p}</li>
              ))}
            </ul>
            <div className="mt-4 text-[10px] font-mono text-aion-red/70">{t.structuralRisk}</div>
          </div>
        </div>

        <p className="mt-8 text-[10px] font-mono text-aion-amber/80 italic leading-relaxed">
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
      
      <main className="flex-1 max-w-[1600px] mx-auto w-full p-6 space-y-6">
        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.keyStats.map((stat, i) => (
            <StatCard key={i} label={stat.label} value={stat.value} unit={stat.unit} color={stat.color} />
          ))}
        </div>

        {/* Main Dashboard Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Risk Gauge */}
          <div className="lg:col-span-3">
            <RiskGauge score={data.riskScore} prev={data.prevRiskScore} trend={data.scoreTrend} t={t} />
          </div>

          {/* Right: War Phase & Signal */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            <WarPhase phase={data.warPhase} keyChange={data.keyChange} t={t} />
            
            <div className="aion-card border-l-4 border-l-aion-amber bg-aion-amber/5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-aion-amber" />
                <span className="aion-label text-aion-amber">{t.investmentSignal}</span>
              </div>
              <p className="text-sm font-mono italic leading-relaxed text-aion-text/90">
                {data.investmentSignal}
              </p>
            </div>
          </div>
        </div>

        {/* Tabbed Detailed View */}
        <div className="aion-card p-0 overflow-hidden">
          <div className="flex border-b border-aion-gray">
            {(['events', 'factors', 'situations'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-8 py-4 text-[11px] font-mono tracking-[0.2em] uppercase transition-all relative",
                  activeTab === tab ? "text-aion-orange" : "text-aion-text-dim hover:text-aion-text"
                )}
              >
                {tab === 'events' && t.keyEvents}
                {tab === 'factors' && t.riskFactors}
                {tab === 'situations' && t.situationAnalysis}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-aion-orange"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 bg-aion-card">
            <AnimatePresence mode="wait">
              {activeTab === 'events' && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-1"
                >
                  <div className="flex items-center gap-4 mb-6 text-[10px] font-mono text-aion-text-dim">
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
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  <div className="lg:col-span-7 space-y-2">
                    <div className="aion-label mb-4 text-[9px]">{language === 'zh' ? '加权因子评分 · ▲▼ 较04-03 · 权重占比' : 'Weighted Factor Score · ▲▼ vs 04-03 · Weight'}</div>
                    {data.riskFactors.map((factor) => (
                      <RiskFactorRow key={factor.name} factor={factor} t={t} />
                    ))}
                  </div>

                  <div className="lg:col-span-5 flex flex-col border-l border-aion-gray pl-8">
                    <div className="aion-card border-aion-gray/50 bg-aion-text/5 mb-6 flex flex-col items-center justify-center py-8">
                      <div className="aion-label mb-4">{language === 'zh' ? '加 权 综 合 评 分' : 'WEIGHTED COMPOSITE SCORE'}</div>
                      <div className="text-[10px] font-mono text-aion-text-dim mb-4">{t.weightedFormula} = 3.400</div>
                      <div className="text-8xl font-mono font-bold text-aion-orange mb-2">{data.riskScore}</div>
                      <div className="aion-label text-aion-orange">{t.riskScoreTitle.replace('\n', ' ')}</div>
                    </div>

                    <div className="aion-card border-aion-gray/50 bg-aion-text/5 mb-6">
                      <div className="aion-label mb-4">{t.trendTitle}</div>
                      <TrendChart trend={data.scoreTrend} />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className="border border-green-500/30 bg-green-500/5 p-3 text-center rounded-sm">
                        <div className="text-green-500 text-[10px] font-mono mb-1">&lt;40</div>
                        <div className="text-green-500/50 text-[8px] font-mono">{t.lowRisk}</div>
                      </div>
                      <div className="border border-aion-yellow/30 bg-aion-yellow/5 p-3 text-center rounded-sm">
                        <div className="text-aion-yellow text-[10px] font-mono mb-1">40-70</div>
                        <div className="text-aion-yellow/50 text-[8px] font-mono">{t.highRisk}</div>
                      </div>
                      <div className="border border-aion-red/50 bg-aion-red/10 p-3 text-center rounded-sm">
                        <div className="text-aion-red text-[10px] font-mono mb-1">&gt;70</div>
                        <div className="text-aion-red/50 text-[8px] font-mono">{t.extremeRisk}</div>
                      </div>
                    </div>

                    <div className="aion-card border-aion-yellow/20 bg-aion-yellow/5">
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-aion-yellow" />
                        <span className="aion-label text-aion-yellow">{t.observationNodes}</span>
                      </div>
                      <div className="text-4xl font-mono font-bold text-aion-yellow mb-2">{language === 'zh' ? '4月6日' : 'April 6'}</div>
                      <ul className="space-y-1">
                        <li className="text-[10px] font-mono text-aion-text-dim">{t.energyDeadline}</li>
                        <li className="text-[10px] font-mono text-aion-text-dim">{t.negotiationValidity}</li>
                        <li className="text-[10px] font-mono text-aion-text-dim">{t.signalConfirmation}</li>
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
      <footer className="px-6 py-4 border-t border-aion-gray bg-aion-bg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-aion-text-dim uppercase tracking-widest">
              {t.systemInfo}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-mono text-aion-text-dim uppercase tracking-widest">
            {t.sources}: Reuters (primary) · 2026-04-06
          </span>
        </div>
      </footer>
    </div>
  );
}
