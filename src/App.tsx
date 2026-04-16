/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Fragment, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Clock, TrendingUp } from "lucide-react";
import { DATA_ZH, DATA_EN, TRANSLATIONS } from "./data";
import { cn } from "./lib/utils";
import {
  buildShareUrl,
  isLocationSyncedWithState,
  parseShareUrlState,
  shareViewToTab,
  tabToShareView,
  type ShareUrlState,
} from "./lib/share-url";
import { ShareMenu } from "./components/ShareMenu";
import PdfGeoMonitor from "./pages/PdfGeoMonitor";
import { EventItem } from "./components/dashboard/EventItem";
import { Header } from "./components/dashboard/Header";
import { RiskFactorRow } from "./components/dashboard/RiskFactorRow";
import { RiskGauge } from "./components/dashboard/RiskGauge";
import { RiskLegendCell } from "./components/dashboard/RiskLegendCell";
import { SituationTab } from "./components/dashboard/SituationTab";
import { StatCard } from "./components/dashboard/StatCard";
import { TopBanner } from "./components/dashboard/TopBanner";
import { TrendChart } from "./components/dashboard/TrendChart";
import { WarPhase } from "./components/dashboard/WarPhase";

export default function App() {
  const [pdfMode] = useState(
    () => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("pdf") === "geo-monitor",
  );

  const [activeTab, setActiveTab] = useState<"events" | "factors" | "situations">(() => {
    if (typeof window === "undefined") return "events";
    const p = parseShareUrlState(window.location.search);
    if (p.view) return shareViewToTab(p.view);
    return "events";
  });

  const [language, setLanguage] = useState<"zh" | "en">(() => {
    if (typeof window === "undefined") return "zh";
    const p = parseShareUrlState(window.location.search);
    if (p.lang) return p.lang;
    return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
  });

  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  const data = language === "zh" ? DATA_ZH : DATA_EN;

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
    window.history.replaceState(null, "", buildShareUrl(desired));
  }, [pdfMode, language, activeTab, data.date, data.version]);

  /** 浏览器前进/后退时从 URL 恢复语言与 Tab */
  useEffect(() => {
    if (pdfMode) return;
    const apply = () => {
      const p = parseShareUrlState(window.location.search);
      if (p.lang === "zh" || p.lang === "en") setLanguage(p.lang);
      if (p.view) setActiveTab(shareViewToTab(p.view));
    };
    window.addEventListener("popstate", apply);
    return () => window.removeEventListener("popstate", apply);
  }, [pdfMode]);

  if (pdfMode) {
    return <PdfGeoMonitor />;
  }
  const t = TRANSLATIONS[language];
  const prevTrendDate = data.scoreTrend.length > 1 ? data.scoreTrend[data.scoreTrend.length - 2].date : "--";
  const weightedAvg = data.riskFactors.reduce((sum, factor) => sum + factor.score * factor.weight, 0).toFixed(3);
  const [year, month, day] = data.date.split("-").map(Number);
  const observationDate =
    language === "zh"
      ? `${month}月${day}日`
      : new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "UTC" });

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
            <Fragment key={i}>
              <StatCard
                label={stat.label}
                value={stat.value}
                unit={stat.unit}
                color={stat.color}
                layout={stat.layout}
              />
            </Fragment>
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
              <p className="text-sm font-mono italic leading-relaxed text-aion-text/90">{data.investmentSignal}</p>
            </div>
          </div>
        </div>

        {/* Tabbed Detailed View */}
        <div className="aion-card p-0 overflow-hidden">
          <div className="flex border-b border-aion-gray">
            {(["events", "factors", "situations"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-8 py-4 text-[11px] font-mono tracking-[0.2em] uppercase transition-all relative",
                  activeTab === tab ? "text-aion-orange" : "text-aion-text-dim hover:text-aion-text",
                )}
              >
                {tab === "events" && t.keyEvents}
                {tab === "factors" && t.riskFactors}
                {tab === "situations" && t.situationAnalysis}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-aion-orange" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 bg-aion-card">
            <AnimatePresence mode="wait">
              {activeTab === "events" && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-1"
                >
                  <div className="flex items-center gap-4 mb-6 text-[10px] font-mono text-aion-text-dim">
                    <span>
                      {data.events.filter((e) => e.verification === "confirmed").length} {t.verified}
                    </span>
                    <span>•</span>
                    <span>
                      {data.events.filter((e) => e.verification === "single").length} {t.singleSource}
                    </span>
                    {data.events.filter((e) => e.verification === "partial").length > 0 && (
                      <>
                        <span>•</span>
                        <span>
                          {data.events.filter((e) => e.verification === "partial").length} {t.partialVerify}
                        </span>
                      </>
                    )}
                    <span>•</span>
                    <span>{t.clickExpand}</span>
                  </div>
                  {/* webSearchQueries / webSources 仍写入 data.ts 供内部核对，不在此展示 */}
                  {data.events.map((event, i) => (
                    <Fragment key={event.id}>
                      <EventItem
                        event={event}
                        index={i}
                        t={t}
                        reportDate={data.date}
                        language={language}
                      />
                    </Fragment>
                  ))}
                </motion.div>
              )}

              {activeTab === "factors" && (
                <motion.div
                  key="factors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-5"
                >
                  <div className="lg:col-span-7 space-y-1.5">
                    <div className="aion-label mb-3 text-[9px]">
                      {language === "zh"
                        ? `加权因子评分 · ▲▼ 较${prevTrendDate} · 权重占比`
                        : `Weighted Factor Score · ▲▼ vs ${prevTrendDate} · Weight`}
                    </div>
                    {data.riskFactors.map((factor) => (
                      <Fragment key={factor.name}>
                        <RiskFactorRow factor={factor} t={t} />
                      </Fragment>
                    ))}
                  </div>

                  <div className="lg:col-span-5 flex flex-col border-l border-aion-gray pl-8">
                    <div className="aion-card border-aion-gray/50 bg-aion-text/5 mb-4 flex flex-col items-center justify-center px-4 py-5">
                      <div className="aion-label mb-2">{language === "zh" ? "加 权 综 合 评 分" : "WEIGHTED COMPOSITE SCORE"}</div>
                      <div className="text-[10px] font-mono text-aion-text-dim mb-2">
                        {t.weightedFormula} = {weightedAvg}
                      </div>
                      <div className="text-7xl font-mono font-bold text-aion-orange mb-1">{data.riskScore}</div>
                      <div className="aion-label text-aion-orange">{t.riskScoreTitle.replace("\n", " ")}</div>
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

              {activeTab === "situations" && (
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
