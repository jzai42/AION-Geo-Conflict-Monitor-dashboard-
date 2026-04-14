/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
  Moon,
} from 'lucide-react';
import { DATA_ZH, DATA_EN, TRANSLATIONS, type DashboardData, type KeyEvent, type RiskFactor, type SituationCard } from './data';
import { cn } from './lib/utils';
import {
  buildShareUrl,
  isLocationSyncedWithState,
  parseShareUrlState,
  shareViewToTab,
  tabToShareView,
  type ShareUrlState,
} from './lib/share-url';
import { ShareMenu } from './components/ShareMenu';
import PdfGeoMonitor from './pages/PdfGeoMonitor';

function s(v: unknown, fb = ""): string {
  return typeof v === "string" ? v : fb;
}

// --- Components (AION v2.4 Force Sync) ---

const TopBanner = ({ t, delta }: { t: any; delta: number }) => (
  <div className={cn(
    "border-b px-6 py-1.5 flex items-center justify-between text-[10px] font-mono",
    delta > 0 ? "bg-aion-red/10 border-aion-red/20" : delta < 0 ? "bg-green-500/10 border-green-500/20" : "bg-aion-gray/10 border-aion-gray/20"
  )}>
    <div className={cn("flex items-center gap-2", delta > 0 ? "text-aion-red" : delta < 0 ? "text-green-500" : "text-aion-text-dim")}>
      {delta > 0 ? <ChevronUp className="w-3 h-3" /> : delta < 0 ? <ChevronDown className="w-3 h-3" /> : null}
      <span>{t.bannerSignal}</span>
    </div>
    <div className="flex items-center gap-2 text-aion-red">
      <AlertTriangle className="w-3 h-3" />
      <span>{t.bannerWarning}</span>
    </div>
  </div>
);

const Header = ({ date, version, warPhase, language, setLanguage, theme, setTheme, t, share }: { 
  date: string, 
  version: string, 
  warPhase: DashboardData['warPhase'],
  language: 'zh' | 'en',
  setLanguage: (l: 'zh' | 'en') => void,
  theme: 'dark' | 'light',
  setTheme: (t: 'dark' | 'light') => void,
  t: any,
  share: React.ReactNode,
}) => {
  const [time, setTime] = useState(new Date().toISOString().replace('T', ' ').split('.')[0] + ' UTC');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toISOString().replace('T', ' ').split('.')[0] + ' UTC');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex min-w-0 flex-col gap-4 border-b border-aion-gray bg-aion-bg px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sticky top-0 z-50">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-[0.2em] font-mono text-aion-text">{t.title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
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
      
      <div className="flex min-w-0 w-full flex-wrap items-center justify-start gap-x-4 gap-y-2 sm:w-auto sm:justify-end sm:gap-6">
        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="shrink-0 rounded-sm border border-aion-gray p-2 text-aion-text-dim transition-colors hover:bg-aion-text/5 hover:text-aion-text"
            title={
              language === 'zh'
                ? theme === 'dark'
                  ? '切换为浅色模式'
                  : '切换为深色模式'
                : theme === 'dark'
                  ? 'Switch to Light Mode'
                  : 'Switch to Dark Mode'
            }
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
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
          {share}
        </div>
        <div className="flex min-w-0 max-w-full flex-col items-start gap-1 text-left sm:items-end sm:text-right">
          <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-0.5 font-mono text-[11px] sm:justify-end">
            <div className="w-2 h-2 shrink-0 rounded-full bg-aion-orange animate-pulse" />
            <span className="text-aion-text-dim">{t.realtime} ·</span>
            <span className="min-w-0 break-words text-aion-text-dim">{time}</span>
          </div>
          <div className="flex max-w-full flex-wrap items-center justify-start gap-x-2 gap-y-0.5 text-[9px] font-mono text-aion-text-dim sm:justify-end">
            <span className="break-words">{t.phaseTransition}：{warPhase.level} → {warPhase.targetLevel}</span>
            <span className="w-1 h-1 shrink-0 rounded-full bg-aion-gray" />
            <span className="break-words">{t.node406}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

/** 单行显示：过长时缩小字号而非换行（用于顶部指标卡） */
const StatCardFitLine = ({
  text,
  className,
  style,
  maxPx,
  minPx,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  maxPx: number;
  minPx: number;
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const el = textRef.current;
    if (!wrap || !el) return;

    const fit = () => {
      const w = wrap.clientWidth;
      if (w <= 0) return;
      let size = maxPx;
      el.style.fontSize = `${size}px`;
      while (size > minPx && el.scrollWidth > w) {
        size -= 0.25;
        el.style.fontSize = `${size}px`;
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [text, maxPx, minPx]);

  return (
    <div ref={wrapRef} className="w-full min-w-0 max-w-full px-0.5">
      <div
        ref={textRef}
        className={cn("font-mono whitespace-nowrap text-center leading-tight", className)}
        style={{ ...style, fontSize: maxPx }}
      >
        {text}
      </div>
    </div>
  );
};

/** 风险档指示条：区间在上、标签在下，字号略大并在格内自适应缩小 */
const RiskLegendCell = ({
  range,
  label,
  barClass,
  textClass,
}: {
  range: string;
  label: string;
  barClass: string;
  textClass: string;
}) => (
  <div
    className={cn(
      "flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-md border px-1 py-2 sm:px-1.5",
      barClass,
    )}
  >
    <StatCardFitLine
      text={range}
      maxPx={15}
      minPx={8}
      className={cn("font-mono font-semibold tabular-nums", textClass)}
    />
    <StatCardFitLine
      text={label}
      maxPx={12}
      minPx={7}
      className={cn("font-mono leading-tight", textClass)}
    />
  </div>
);

const StatCard = ({ label, value, unit, color }: { label: string, value: string, unit: string, color: string, key?: React.Key }) => {
  return (
    <div 
      className="aion-card flex min-h-[120px] min-w-0 flex-col items-center justify-center text-center group transition-all"
      style={{ borderColor: `${color}40`, backgroundColor: `${color}08` }}
    >
      <StatCardFitLine
        text={value}
        maxPx={36}
        minPx={8}
        className="mb-1 font-bold"
        style={{ color, textShadow: `0 0 15px ${color}40` }}
      />
      <StatCardFitLine
        text={unit}
        maxPx={12}
        minPx={7}
        className="aion-label mb-1"
        style={{ color: `${color}cc` }}
      />
      <StatCardFitLine
        text={label}
        maxPx={10}
        minPx={6}
        className="font-mono text-aion-text-dim uppercase tracking-tighter"
      />
    </div>
  );
};

const TrendChart = ({ trend, compact }: { trend: DashboardData['scoreTrend']; compact?: boolean }) => {
  const scores = (trend ?? []).map((x) => Number(x.score)).filter((n) => Number.isFinite(n));
  if (scores.length === 0) {
    return (
      <div className={cn("flex w-full items-center justify-center px-1 text-[10px] text-aion-text-dim", compact ? "mt-2 h-24" : "mt-4 h-28")}>
        —
      </div>
    );
  }
  // Use a baseline to make differences more obvious
  const minScore = Math.min(...scores) - 5;
  const maxScore = Math.max(...scores) + 5;
  const range = Math.max(maxScore - minScore, 1e-6);

  return (
    <div className={cn("flex items-end justify-between gap-1 w-full px-1", compact ? "mt-2 h-24" : "mt-4 h-28")}>
      {trend.map((t, i) => {
        const sc = Number(t.score);
        const safe = Number.isFinite(sc) ? sc : minScore;
        return (
        <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
          <span className={cn(
            "text-[10px] font-mono mb-1 font-bold transition-colors", 
            t.active ? "text-aion-green drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]" : "text-aion-text-dim group-hover:text-aion-text/70"
          )}>
            {Number.isFinite(sc) ? t.score : '—'}
          </span>
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: `${((safe - minScore) / range) * 60 + 20}%` }}
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
        );
      })}
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
        <div className={cn(
          "px-6 py-1 rounded-sm flex items-center gap-2 border",
          delta > 0 ? "bg-aion-red/10 border-aion-red/30" : delta < 0 ? "bg-green-500/10 border-green-500/30" : "bg-aion-gray/20 border-aion-gray/40"
        )}>
          {delta > 0 ? <ChevronUp className="w-3 h-3 text-aion-red" /> : delta < 0 ? <ChevronDown className="w-3 h-3 text-green-500" /> : null}
          <span className={cn("font-mono text-xs", delta > 0 ? "text-aion-red" : delta < 0 ? "text-green-500" : "text-aion-text-dim")}>
            {delta === 0 ? "—" : Math.abs(delta)} {t.vsPrev}
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
  // level → targetLevel 表示「当前阶段评估 → 目标/走向」，箭头仅为阶段关系，不是涨跌；勿用 targetLevel.includes('5')（中文阶段名不含数字）
  return (
    <div className={cn(
      "aion-card flex-1 flex flex-col p-6 border-t-4 transition-all",
      "border-t-aion-orange border-x-aion-gray/20 border-b-aion-gray/20 bg-aion-text/5"
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

function formatEventTimestamp(
  raw: string | undefined,
  reportDate: string,
  language: 'zh' | 'en',
) {
  const v = s(raw).trim();
  if (!v || v === 'AUTO') {
    return language === 'zh'
      ? `${reportDate}（当日公开报道）`
      : `${reportDate} (same-day reporting)`;
  }
  return v;
}

const EventItem = ({
  event,
  index,
  t,
  reportDate,
  language,
}: {
  event: KeyEvent;
  index: number;
  t: any;
  reportDate: string;
  language: 'zh' | 'en';
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeLine = formatEventTimestamp(event.timestamp, reportDate, language);
  const desc = s(event.description).trim();

  return (
    <div className={cn(
      "border-b border-aion-gray last:border-0 transition-all",
      event.critical && "bg-aion-red/5"
    )}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between gap-3 p-4 text-left transition-colors hover:bg-aion-text/5"
      >
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium leading-snug tracking-tight text-aion-text sm:text-[15px]">
            {event.title?.trim() ? event.title : `${t.event} ${String(index + 1).padStart(2, '0')}`}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="shrink-0 font-mono text-[10px] text-aion-text-dim">
              {t.event} {String(index + 1).padStart(2, '0')}
            </span>
            {event.verification === 'confirmed' && (
              <div className="flex shrink-0 items-center gap-1 rounded-sm border border-green-500/30 bg-green-500/10 px-2 py-0.5">
                <CheckCircle2 className="h-2.5 w-2.5 text-green-500" />
                <span className="text-[8px] font-mono uppercase text-green-500">{t.verified}</span>
              </div>
            )}
            {event.verification === 'single' && (
              <div className="flex shrink-0 items-center gap-1 rounded-sm border border-aion-red/30 bg-aion-red/10 px-2 py-0.5">
                <AlertCircle className="h-2.5 w-2.5 text-aion-red" />
                <span className="text-[8px] font-mono uppercase text-aion-red">{t.singleSource}</span>
              </div>
            )}
            {event.verification === 'partial' && (
              <div className="flex shrink-0 items-center gap-1 rounded-sm border border-aion-orange/30 bg-aion-orange/10 px-2 py-0.5">
                <AlertCircle className="h-2.5 w-2.5 text-aion-orange" />
                <span className="text-[8px] font-mono uppercase text-aion-orange">{t.partialVerify}</span>
              </div>
            )}
            {event.highlight && (
              <div className="flex shrink-0 items-center gap-1 rounded-sm border border-aion-orange/30 bg-aion-orange/10 px-2 py-0.5">
                <Zap className="h-2.5 w-2.5 text-aion-orange" />
                <span className="text-[8px] font-mono uppercase text-aion-orange">{t.keyChange}</span>
              </div>
            )}
          </div>
        </div>
        <ChevronDown className={cn("mt-0.5 h-4 w-4 shrink-0 text-aion-text-dim transition-transform", isOpen && "rotate-180")} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-aion-gray/50 px-4 pb-6 pt-3 sm:pl-4">
              <div className="text-[8px] font-mono uppercase tracking-widest text-aion-text-dim mb-2">
                {t.eventDetails}
              </div>
              <p className="mb-4 max-w-3xl text-xs leading-relaxed text-aion-text/80">
                {desc || t.noEventDescription}
              </p>
              {event.significance && (
                <div className="bg-aion-text/5 p-3 rounded-sm border border-aion-gray mb-4">
                  <div className="text-[8px] font-mono text-aion-text-dim uppercase mb-1 tracking-widest">{t.judgementSignificance}</div>
                  <p className="text-[11px] text-aion-text-dim font-mono italic">{event.significance}</p>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="text-[9px] font-mono text-aion-text-dim uppercase">
                  {t.source}: {event.verification === 'confirmed' ? t.verified : event.verification === 'partial' ? t.partialVerify : t.singleSource}
                </span>
                <span className="text-[9px] font-mono text-aion-text-dim">
                  <span className="uppercase">{t.time}</span>
                  {': '}
                  <span className="normal-case text-aion-text/90">{timeLine}</span>
                </span>
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
    <div className="py-3 border-b border-aion-gray last:border-0">
      <div className="flex items-end justify-between gap-4 mb-2">
        <div className="flex min-h-[2.25rem] flex-wrap items-end gap-x-3 gap-y-1.5">
          <h4 className="text-sm font-mono leading-none tracking-widest text-aion-text">{factor.name}</h4>
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
          {factor.sourceVerification === 'confirmed' && (
            <div className="px-2 py-0.5 rounded-sm text-[8px] font-mono bg-green-500/10 border border-green-500/30 text-green-500 flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" />
              {t.factorVerified}
            </div>
          )}
          {factor.sourceVerification === 'partial' && (
            <div className="px-2 py-0.5 rounded-sm text-[8px] font-mono bg-aion-orange/10 border border-aion-orange/30 text-aion-orange flex items-center gap-1">
              <AlertCircle className="w-2.5 h-2.5" />
              {t.factorPartial}
            </div>
          )}
          {factor.sourceVerification === 'unverified' && (
            <div className="px-2 py-0.5 rounded-sm text-[8px] font-mono bg-aion-red/10 border border-aion-red/30 text-aion-red flex items-center gap-1">
              <AlertCircle className="w-2.5 h-2.5" />
              {t.factorUnverified}
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-end justify-end">
          <div className="text-right">
            <div className="flex items-end gap-2">
              <span className="pb-0.5 text-[9px] font-mono leading-none text-aion-text-dim">{t.weight}:{Math.round(factor.weight * 100)}%</span>
              {delta !== 0 && (
                <span className={cn("pb-0.5 text-[10px] font-mono leading-none", delta > 0 ? "text-aion-red" : "text-green-500")}>
                  {delta > 0 ? '▲' : '▼'}{Math.abs(delta).toFixed(1)}
                </span>
              )}
              <span className="text-2xl font-mono font-bold leading-none text-aion-red">
                {(Number.isFinite(Number(factor.score)) ? Number(factor.score) : 0).toFixed(1)}
              </span>
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
  const [pdfMode] = useState(() =>
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pdf') === 'geo-monitor'
  );

  const [activeTab, setActiveTab] = useState<'events' | 'factors' | 'situations'>(() => {
    if (typeof window === 'undefined') return 'events';
    const p = parseShareUrlState(window.location.search);
    if (p.view) return shareViewToTab(p.view);
    return 'events';
  });

  const [language, setLanguage] = useState<'zh' | 'en'>(() => {
    if (typeof window === 'undefined') return 'zh';
    const p = parseShareUrlState(window.location.search);
    if (p.lang) return p.lang;
    return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  });

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const data = language === 'zh' ? DATA_ZH : DATA_EN;

  /** 仅当地址栏与当前 lang / 数据 / Tab 不一致时再 replace，避免与带参链接「抢写」导致体感未更新 */
  useEffect(() => {
    if (pdfMode) return;
    const desired: ShareUrlState = {
      lang: language,
      date: data.date,
      version: data.version,
      view: tabToShareView(activeTab),
    };
    if (isLocationSyncedWithState(desired)) return;
    window.history.replaceState(null, '', buildShareUrl(desired));
  }, [pdfMode, language, activeTab, data.date, data.version]);

  /** 浏览器前进/后退时从 URL 恢复语言与 Tab */
  useEffect(() => {
    if (pdfMode) return;
    const apply = () => {
      const p = parseShareUrlState(window.location.search);
      if (p.lang === 'zh' || p.lang === 'en') setLanguage(p.lang);
      if (p.view) setActiveTab(shareViewToTab(p.view));
    };
    window.addEventListener('popstate', apply);
    return () => window.removeEventListener('popstate', apply);
  }, [pdfMode]);

  if (pdfMode) {
    return <PdfGeoMonitor />;
  }
  const t = TRANSLATIONS[language];
  const prevTrendDate = data.scoreTrend.length > 1 ? data.scoreTrend[data.scoreTrend.length - 2].date : '--';
  const weightedAvg = data.riskFactors.reduce((sum, factor) => sum + factor.score * factor.weight, 0).toFixed(3);
  const [year, month, day] = data.date.split('-').map(Number);
  const observationDate = language === 'zh'
    ? `${month}月${day}日`
    : new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' });

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-aion-red selection:text-white bg-aion-bg text-aion-text">
      <TopBanner t={t} delta={data.riskScore - data.prevRiskScore} />
      <Header 
        date={data.date} 
        version={data.version} 
        warPhase={data.warPhase} 
        language={language} 
        setLanguage={setLanguage} 
        theme={theme}
        setTheme={setTheme}
        t={t}
        share={<ShareMenu data={data} language={language} activeTab={activeTab} />}
      />
      
      <main className="flex-1 max-w-[1600px] mx-auto w-full p-6 space-y-6">
        {/* Top Stats Grid */}
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 [&>*]:min-w-0">
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
                    {data.events.filter(e => e.verification === 'partial').length > 0 && (
                      <>
                        <span>•</span>
                        <span>{data.events.filter(e => e.verification === 'partial').length} {t.partialVerify}</span>
                      </>
                    )}
                    <span>•</span>
                    <span>{t.clickExpand}</span>
                  </div>
                  {/* webSearchQueries / webSources 仍写入 data.ts 供内部核对，不在此展示 */}
                  {data.events.map((event, i) => (
                    <div key={event.id}>
                      <EventItem
                        event={event}
                        index={i}
                        t={t}
                        reportDate={data.date}
                        language={language}
                      />
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'factors' && (
                <motion.div
                  key="factors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-5"
                >
                  <div className="lg:col-span-7 space-y-1.5">
                    <div className="aion-label mb-3 text-[9px]">{language === 'zh' ? `加权因子评分 · ▲▼ 较${prevTrendDate} · 权重占比` : `Weighted Factor Score · ▲▼ vs ${prevTrendDate} · Weight`}</div>
                    {data.riskFactors.map((factor) => (
                      <RiskFactorRow key={factor.name} factor={factor} t={t} />
                    ))}
                  </div>

                  <div className="lg:col-span-5 flex flex-col border-l border-aion-gray pl-8">
                    <div className="aion-card border-aion-gray/50 bg-aion-text/5 mb-4 flex flex-col items-center justify-center px-4 py-5">
                      <div className="aion-label mb-2">{language === 'zh' ? '加 权 综 合 评 分' : 'WEIGHTED COMPOSITE SCORE'}</div>
                      <div className="text-[10px] font-mono text-aion-text-dim mb-2">{t.weightedFormula} = {weightedAvg}</div>
                      <div className="text-7xl font-mono font-bold text-aion-orange mb-1">{data.riskScore}</div>
                      <div className="aion-label text-aion-orange">{t.riskScoreTitle.replace('\n', ' ')}</div>
                    </div>

                    <div className="aion-card border-aion-gray/50 bg-aion-text/5 mb-4 p-4">
                      <div className="aion-label mb-2">{t.trendTitle}</div>
                      <TrendChart trend={data.scoreTrend} compact />
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-stretch lg:gap-4">
                      {/* 与右侧观察卡同高：左列拉满行高，三格竖向撑满 */}
                      <div className="flex min-h-[168px] w-full flex-col lg:min-h-0 lg:h-full">
                        <div className="flex h-full min-h-[168px] w-full gap-2 lg:min-h-0">
                          <RiskLegendCell
                            range="<40"
                            label={t.lowRisk}
                            barClass="border-green-500/30 bg-green-500/5"
                            textClass="text-green-400"
                          />
                          <RiskLegendCell
                            range="40-70"
                            label={t.highRisk}
                            barClass="border-aion-yellow/35 bg-aion-yellow/5"
                            textClass="text-aion-yellow"
                          />
                          <RiskLegendCell
                            range=">70"
                            label={t.extremeRisk}
                            barClass="border-aion-red/45 bg-aion-red/10"
                            textClass="text-aion-red"
                          />
                        </div>
                      </div>

                      <div className="aion-card flex h-full min-h-0 flex-col border-aion-yellow/25 bg-aion-yellow/5 !p-0 !px-4 !py-4">
                        <div className="mb-2.5 flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 shrink-0 text-aion-yellow" />
                          <span className="aion-label leading-snug text-aion-yellow">{t.observationNodes}</span>
                        </div>
                        <div className="mb-3 text-2xl font-mono font-bold leading-tight tracking-tight text-aion-yellow">
                          {observationDate}
                        </div>
                        <ul className="mt-auto space-y-2 text-[11px] leading-relaxed">
                          <li className="break-words font-mono text-white">{t.energyDeadline}</li>
                          <li className="break-words font-mono text-white">{t.negotiationValidity}</li>
                          <li className="break-words font-mono text-white">{t.signalConfirmation}</li>
                        </ul>
                      </div>
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
      <footer className="flex flex-col gap-3 border-t border-aion-gray bg-aion-bg px-4 py-4 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:gap-4 md:text-left">
        <span className="max-w-full break-words text-[9px] font-mono uppercase tracking-widest text-aion-text-dim">
          {t.systemInfo}
        </span>
        <span className="max-w-full break-words text-[9px] font-mono uppercase tracking-widest text-aion-text-dim">
          {t.sources}: Reuters (primary), tier-1 cross-verified · {data.date}
        </span>
      </footer>
    </div>
  );
}
