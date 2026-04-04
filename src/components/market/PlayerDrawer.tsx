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

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Filler);

import {
  MOCK_PORTFOLIO_VALUE,
  QB_STATS, RB_STATS, WR_STATS, TE_STATS,
} from "@/mock/player-stats";
import type { WeekStat } from "@/mock/player-stats";

// ─── Column definitions (UI config, not data) ─────────────────────────────────

interface StatCol {
  header: string;
  value: (s: WeekStat) => number | null | undefined;
}

const QB_COLS: StatCol[] = [
  { header: "PsYds", value: (s) => s.passYds },
  { header: "RuYds", value: (s) => s.rushYds },
  { header: "PsTD",  value: (s) => s.passTDs },
  { header: "RuTD",  value: (s) => s.rushTDs },
  { header: "INT",   value: (s) => s.ints },
  { header: "FUM",   value: (s) => s.fumbles },
];

const RB_COLS: StatCol[] = [
  { header: "RuYds",  value: (s) => s.rushYds },
  { header: "RecYds", value: (s) => s.recYds },
  { header: "RuTD",   value: (s) => s.rushTDs },
  { header: "RecTD",  value: (s) => s.recTDs },
  { header: "FUM",    value: (s) => s.fumbles },
];

const WR_COLS: StatCol[] = [
  { header: "RecYds", value: (s) => s.recYds },
  { header: "Tgt",    value: (s) => s.targets },
  { header: "Rec",    value: (s) => s.rec },
  { header: "TD",     value: (s) => s.tds },
  { header: "FUM",    value: (s) => s.fumbles },
];

const TE_COLS: StatCol[] = WR_COLS;

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
          width: 580,
          maxWidth: "92vw",
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
          padding: "24px 28px 20px",
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
              fontSize: 26,
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
            width: 34,
            height: 34,
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
      <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 26, overflowY: "auto", flex: 1 }}>
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
                fontSize: 38,
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
            <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>Price History</span>
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
          <div style={{ height: 170 }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Season stats */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 10 }}>
            Season Stats
          </div>
          <div style={{ borderRadius: 10, border: `1px solid ${colors.border}`, overflow: "hidden" }}>
            {/* Header row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `28px 44px 46px repeat(${cols.length}, 1fr)`,
                padding: "9px 16px",
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
                    padding: "9px 16px",
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
          padding: "20px 28px",
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
                fontSize: 24,
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
            height: 48,
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
        fontSize: 12,
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
