"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { TrendingUp, TrendingDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { colors, positionColor } from "@/lib/theme";
import type { Player } from "./PlayerCard";

// TODO: replace with real portfolio value from user context
const MOCK_PORTFOLIO_VALUE = 14_820;

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Filler);

// ─── Mock weekly stats ────────────────────────────────────────────────────────

interface WeekStat {
  week: number;
  projPts: number;
  actPts: number | null;
  passYds?: number | null;
  rushYds?: number | null;
  passTDs?: number | null;
  rushTDs?: number | null;
  ints?: number | null;
  fumbles?: number | null;
  recYds?: number | null;
  recTDs?: number | null;
  targets?: number | null;
  rec?: number | null;
  tds?: number | null;
}

interface StatCol {
  header: string;
  value: (s: WeekStat) => number | null | undefined;
}

// ─── QB ───────────────────────────────────────────────────────────────────────

const QB_STATS: WeekStat[] = [
  { week: 1, projPts: 26.1, actPts: 31.4, passYds: 312, rushYds: 18, passTDs: 3, rushTDs: 0, ints: 0, fumbles: 0 },
  { week: 2, projPts: 24.8, actPts: 21.0, passYds: 248, rushYds: 14, passTDs: 1, rushTDs: 0, ints: 1, fumbles: 0 },
  { week: 3, projPts: 27.3, actPts: 29.7, passYds: 291, rushYds: 22, passTDs: 2, rushTDs: 1, ints: 0, fumbles: 0 },
  { week: 4, projPts: 23.5, actPts: 18.2, passYds: 204, rushYds: 11, passTDs: 1, rushTDs: 0, ints: 2, fumbles: 1 },
  { week: 5, projPts: 25.9, actPts: 33.1, passYds: 338, rushYds: 19, passTDs: 3, rushTDs: 1, ints: 0, fumbles: 0 },
  { week: 6, projPts: 22.4, actPts: 24.6, passYds: 267, rushYds: 16, passTDs: 2, rushTDs: 0, ints: 1, fumbles: 0 },
  { week: 7, projPts: 28.0, actPts: 26.3, passYds: 279, rushYds: 20, passTDs: 2, rushTDs: 0, ints: 0, fumbles: 1 },
  { week: 8, projPts: 24.5, actPts: null, passYds: null, rushYds: null, passTDs: null, rushTDs: null, ints: null, fumbles: null },
];

const QB_COLS: StatCol[] = [
  { header: "PsYds", value: (s) => s.passYds },
  { header: "RuYds", value: (s) => s.rushYds },
  { header: "PsTD", value: (s) => s.passTDs },
  { header: "RuTD", value: (s) => s.rushTDs },
  { header: "INT", value: (s) => s.ints },
  { header: "FUM", value: (s) => s.fumbles },
];

// ─── RB ───────────────────────────────────────────────────────────────────────

const RB_STATS: WeekStat[] = [
  { week: 1, projPts: 18.2, actPts: 22.5, rushYds: 124, recYds: 32, rushTDs: 2, recTDs: 0, fumbles: 0 },
  { week: 2, projPts: 16.8, actPts: 14.1, rushYds: 98, recYds: 18, rushTDs: 0, recTDs: 0, fumbles: 1 },
  { week: 3, projPts: 19.4, actPts: 25.8, rushYds: 141, recYds: 44, rushTDs: 2, recTDs: 0, fumbles: 0 },
  { week: 4, projPts: 17.1, actPts: 11.3, rushYds: 83, recYds: 12, rushTDs: 1, recTDs: 0, fumbles: 1 },
  { week: 5, projPts: 20.6, actPts: 28.2, rushYds: 156, recYds: 56, rushTDs: 2, recTDs: 1, fumbles: 0 },
  { week: 6, projPts: 15.9, actPts: 18.4, rushYds: 109, recYds: 28, rushTDs: 1, recTDs: 0, fumbles: 0 },
  { week: 7, projPts: 18.7, actPts: 20.1, rushYds: 118, recYds: 34, rushTDs: 1, recTDs: 0, fumbles: 0 },
  { week: 8, projPts: 17.3, actPts: null, rushYds: null, recYds: null, rushTDs: null, recTDs: null, fumbles: null },
];

const RB_COLS: StatCol[] = [
  { header: "RuYds", value: (s) => s.rushYds },
  { header: "RecYds", value: (s) => s.recYds },
  { header: "RuTD", value: (s) => s.rushTDs },
  { header: "RecTD", value: (s) => s.recTDs },
  { header: "FUM", value: (s) => s.fumbles },
];

// ─── WR ───────────────────────────────────────────────────────────────────────

const WR_STATS: WeekStat[] = [
  { week: 1, projPts: 15.4, actPts: 19.8, recYds: 112, targets: 8, rec: 6, tds: 1, fumbles: 0 },
  { week: 2, projPts: 13.2, actPts: 10.5, recYds: 74, targets: 6, rec: 4, tds: 0, fumbles: 0 },
  { week: 3, projPts: 16.8, actPts: 22.1, recYds: 138, targets: 9, rec: 7, tds: 2, fumbles: 0 },
  { week: 4, projPts: 12.9, actPts: 8.4, recYds: 56, targets: 5, rec: 3, tds: 0, fumbles: 1 },
  { week: 5, projPts: 17.3, actPts: 24.6, recYds: 159, targets: 10, rec: 8, tds: 2, fumbles: 0 },
  { week: 6, projPts: 14.1, actPts: 16.2, recYds: 98, targets: 7, rec: 5, tds: 1, fumbles: 0 },
  { week: 7, projPts: 15.7, actPts: 13.8, recYds: 88, targets: 8, rec: 5, tds: 0, fumbles: 0 },
  { week: 8, projPts: 14.8, actPts: null, recYds: null, targets: null, rec: null, tds: null, fumbles: null },
];

const WR_COLS: StatCol[] = [
  { header: "RecYds", value: (s) => s.recYds },
  { header: "Tgt", value: (s) => s.targets },
  { header: "Rec", value: (s) => s.rec },
  { header: "TD", value: (s) => s.tds },
  { header: "FUM", value: (s) => s.fumbles },
];

// ─── TE ───────────────────────────────────────────────────────────────────────

const TE_STATS: WeekStat[] = [
  { week: 1, projPts: 12.1, actPts: 16.4, recYds: 88, targets: 6, rec: 5, tds: 1, fumbles: 0 },
  { week: 2, projPts: 10.8, actPts: 8.2, recYds: 54, targets: 5, rec: 3, tds: 0, fumbles: 0 },
  { week: 3, projPts: 13.4, actPts: 18.9, recYds: 98, targets: 7, rec: 6, tds: 2, fumbles: 0 },
  { week: 4, projPts: 9.6, actPts: 7.1, recYds: 44, targets: 4, rec: 3, tds: 0, fumbles: 1 },
  { week: 5, projPts: 14.2, actPts: 20.3, recYds: 112, targets: 8, rec: 7, tds: 2, fumbles: 0 },
  { week: 6, projPts: 11.3, actPts: 13.7, recYds: 76, targets: 6, rec: 5, tds: 1, fumbles: 0 },
  { week: 7, projPts: 12.8, actPts: 11.4, recYds: 68, targets: 5, rec: 4, tds: 0, fumbles: 0 },
  { week: 8, projPts: 11.9, actPts: null, recYds: null, targets: null, rec: null, tds: null, fumbles: null },
];

const TE_COLS: StatCol[] = WR_COLS;

// ─── Lookup ───────────────────────────────────────────────────────────────────

function getStats(pos: string): WeekStat[] {
  if (pos === "RB") return RB_STATS;
  if (pos === "WR") return WR_STATS;
  if (pos === "TE") return TE_STATS;
  return QB_STATS;
}

function getCols(pos: string): StatCol[] {
  if (pos === "RB") return RB_COLS;
  if (pos === "WR") return WR_COLS;
  if (pos === "TE") return TE_COLS;
  return QB_COLS;
}

// ─── Price history ────────────────────────────────────────────────────────────

const WEEKS = ["Wk1", "Wk2", "Wk3", "Wk4", "Wk5", "Wk6", "Wk7", "Wk8"];

function getPriceHistory(basePrice: number) {
  const projected = WEEKS.map((_, i) =>
    parseFloat((basePrice * (0.82 + i * 0.025 + Math.sin(i) * 0.02)).toFixed(2))
  );
  // last week is upcoming — use undefined so Chart.js leaves a gap
  const actual: (number | undefined)[] = WEEKS.map((_, i) =>
    i < 7
      ? parseFloat((basePrice * (0.80 + i * 0.028 + Math.cos(i * 0.9) * 0.03)).toFixed(2))
      : undefined
  );
  return { projected, actual };
}

// ─── Player avatar ────────────────────────────────────────────────────────────

function LargeAvatar({ name, pos }: { name: string; pos: string }) {
  const posCol = positionColor(pos);
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "3 / 2",
        borderRadius: 12,
        background: `${posCol}12`,
        border: `1.5px solid ${posCol}30`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 44,
        fontWeight: 800,
        color: `${posCol}70`,
        letterSpacing: "-0.04em",
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  );
}

// ─── Drawer ───────────────────────────────────────────────────────────────────

export function PlayerDrawer({
  player,
  onClose,
}: {
  player: Player | null;
  onClose: () => void;
}) {
  const isOpen = player !== null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(0,0,0,0.4)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.2s ease",
        }}
      />
      {/* Slide-in panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: 460,
          maxWidth: "90vw",
          height: "100vh",
          zIndex: 50,
          background: colors.surface,
          borderLeft: `1px solid ${colors.border}`,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.25s ease",
          overflowY: "auto",
        }}
      >
        {player && <DrawerBody player={player} onClose={onClose} />}
      </div>
    </>
  );
}

// ─── DrawerBody (only rendered when a player is selected) ─────────────────────

function DrawerBody({ player, onClose }: { player: Player; onClose: () => void }) {
  const isUp = player.change >= 0;
  const posCol = positionColor(player.pos);
  const stats = getStats(player.pos);
  const cols = getCols(player.pos);
  const { projected, actual } = getPriceHistory(player.price);

  const maxShares = MOCK_PORTFOLIO_VALUE / player.price;
  const [shares, setShares] = useState(0);
  const [inputVal, setInputVal] = useState("0");

  function applyShares(raw: number) {
    const clamped = Math.max(0, Math.min(raw, maxShares));
    const rounded = Math.round(clamped * 100) / 100;
    setShares(rounded);
    setInputVal(rounded === 0 ? "0" : String(rounded));
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setInputVal(raw); // allow free typing
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) applyShares(parsed);
  }

  function handleInputBlur() {
    const parsed = parseFloat(inputVal);
    applyShares(isNaN(parsed) ? 0 : parsed);
  }

  const totalCost = shares * player.price;

  const chartData = {
    labels: WEEKS,
    datasets: [
      {
        label: "Projected",
        data: projected,
        borderColor: colors.posWR,
        backgroundColor: "transparent",
        borderWidth: 1.5,
        borderDash: [5, 4],
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: "Actual",
        data: actual,
        borderColor: colors.accent,
        backgroundColor: `${colors.accent}18`,
        fill: true,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: colors.accent,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index" as const, intersect: false },
    },
    scales: {
      x: {
        ticks: { color: colors.textDim, font: { size: 9 as const } },
        grid: { color: colors.border },
      },
      y: {
        ticks: {
          color: colors.textDim,
          font: { size: 9 as const },
          callback: (value: string | number) => `$${value}`,
        },
        grid: { color: colors.border },
      },
    },
  };

  return (
    <>
      {/* Header */}
      <div
        style={{
          padding: "20px 22px 18px",
          borderBottom: `1px solid ${colors.border}`,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: colors.text,
              letterSpacing: "-0.02em",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {player.name}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: posCol,
                background: `${posCol}20`,
                padding: "2px 8px",
                borderRadius: 999,
                fontFamily: "var(--font-mono)",
              }}
            >
              {player.pos}
            </span>
            <span style={{ fontSize: 12, color: colors.textMuted, fontFamily: "var(--font-mono)" }}>
              #{player.number} · {player.team}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            border: `1px solid ${colors.border}`,
            background: colors.surfaceLight,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.textMuted,
            flexShrink: 0,
          }}
        >
          <X size={14} />
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 22, overflowY: "auto", flex: 1 }}>
        {/* Avatar + price */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
          <LargeAvatar name={player.name} pos={player.pos} />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 6, paddingTop: 8 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: colors.textMuted,
                fontFamily: "var(--font-mono)",
              }}
            >
              Current Price
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: colors.text,
                fontFamily: "var(--font-mono)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              ${player.price.toFixed(2)}
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                marginTop: 2,
                fontSize: 14,
                fontWeight: 700,
                color: isUp ? colors.accent : colors.red,
                fontFamily: "var(--font-mono)",
              }}
            >
              {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {isUp ? "+" : ""}{player.change}%
            </div>
          </div>
        </div>

        {/* Price history chart */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: colors.text }}>Price History</span>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { color: colors.accent, label: "Actual" },
                { color: colors.posWR, label: "Projected" },
              ].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 18, height: 2, background: l.color, borderRadius: 1 }} />
                  <span style={{ fontSize: 10, color: colors.textMuted, fontFamily: "var(--font-mono)" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: 140 }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Season stats */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: colors.text, marginBottom: 10 }}>
            Season Stats
          </div>
          <div style={{ borderRadius: 10, border: `1px solid ${colors.border}`, overflow: "hidden" }}>
            {/* Header row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `28px 44px 46px repeat(${cols.length}, 1fr)`,
                padding: "7px 12px",
                background: colors.surfaceLight,
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              {["Wk", "Proj", "Act", ...cols.map((c) => c.header)].map((h) => (
                <div
                  key={h}
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: colors.textDim,
                    fontFamily: "var(--font-mono)",
                    textAlign: "right",
                  }}
                >
                  {h}
                </div>
              ))}
            </div>
            {/* Data rows */}
            {stats.map((s, i) => {
              const played = s.actPts !== null;
              const beat = played && (s.actPts as number) > s.projPts;
              return (
                <div
                  key={s.week}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `28px 44px 46px repeat(${cols.length}, 1fr)`,
                    padding: "7px 12px",
                    borderBottom: i < stats.length - 1 ? `1px solid ${colors.border}` : "none",
                    background: i % 2 === 0 ? "transparent" : `${colors.bg}60`,
                    alignItems: "center",
                  }}
                >
                  <Cell>{s.week}</Cell>
                  <Cell muted>{s.projPts.toFixed(1)}</Cell>
                  <Cell color={played ? (beat ? colors.accent : colors.red) : undefined} bold={played}>
                    {played ? (s.actPts as number).toFixed(1) : "—"}
                  </Cell>
                  {cols.map((col) => {
                    const v = col.value(s);
                    return (
                      <Cell key={col.header}>
                        {played ? (v ?? "—") : "—"}
                      </Cell>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Buy footer */}
      <div
        style={{
          padding: "18px 22px",
          borderTop: `1px solid ${colors.border}`,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Shares input + total cost */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: colors.textMuted,
                fontFamily: "var(--font-mono)",
                marginBottom: 6,
              }}
            >
              Shares
            </div>
            <input
              type="number"
              min={0}
              max={maxShares}
              step={0.01}
              value={inputVal}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              style={{
                width: "100%",
                height: 36,
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: 8,
                color: colors.text,
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                fontWeight: 600,
                padding: "0 10px",
                outline: "none",
              }}
            />
          </div>
          <div style={{ textAlign: "right", paddingBottom: 2 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: colors.textMuted,
                fontFamily: "var(--font-mono)",
                marginBottom: 4,
              }}
            >
              Total Cost
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: shares > 0 ? colors.accent : colors.textMuted,
                fontFamily: "var(--font-mono)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              ${totalCost.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Slider */}
        <div>
          <SliderPrimitive.Root
            min={0}
            max={maxShares}
            step={0.01}
            value={[shares]}
            onValueChange={([v]) => applyShares(v)}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: 20,
              userSelect: "none",
              touchAction: "none",
            }}
          >
            <SliderPrimitive.Track
              style={{
                background: colors.surfaceLight,
                borderRadius: 999,
                height: 4,
                flex: 1,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <SliderPrimitive.Range
                style={{
                  position: "absolute",
                  background: colors.accent,
                  height: "100%",
                  borderRadius: 999,
                }}
              />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
              style={{
                display: "block",
                width: 18,
                height: 18,
                background: colors.accent,
                borderRadius: "50%",
                border: `2.5px solid ${colors.surface}`,
                outline: "none",
                cursor: "pointer",
                boxShadow: `0 0 0 3px ${colors.accent}30`,
                flexShrink: 0,
              }}
            />
          </SliderPrimitive.Root>
          {/* Range labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            <span style={{ fontSize: 10, color: colors.textDim, fontFamily: "var(--font-mono)" }}>
              0 shares
            </span>
            <span style={{ fontSize: 10, color: colors.textDim, fontFamily: "var(--font-mono)" }}>
              {maxShares.toFixed(2)} max (${MOCK_PORTFOLIO_VALUE.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Buy button */}
        <Button
          disabled={shares <= 0}
          style={{
            width: "100%",
            background: shares > 0 ? colors.accent : colors.surfaceLight,
            color: shares > 0 ? colors.bg : colors.textMuted,
            fontWeight: 700,
            fontSize: 14,
            borderRadius: 10,
            border: "none",
            height: 42,
            cursor: shares > 0 ? "pointer" : "not-allowed",
            transition: "background 0.15s, color 0.15s",
          }}
        >
          {shares > 0
            ? `Buy ${shares} shares · $${totalCost.toFixed(2)}`
            : `Select shares to buy`}
        </Button>
      </div>
    </>
  );
}

// ─── Tiny table cell helper ───────────────────────────────────────────────────

function Cell({
  children,
  color,
  bold,
  muted,
}: {
  children: React.ReactNode;
  color?: string;
  bold?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      style={{
        fontSize: 11,
        fontFamily: "var(--font-mono)",
        textAlign: "right",
        fontWeight: bold ? 700 : 400,
        color: color ?? (muted ? colors.textDim : colors.text),
      }}
    >
      {children}
    </div>
  );
}
