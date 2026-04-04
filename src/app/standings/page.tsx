"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { colors } from "@/lib/theme";
import { MOCK_TRADERS, WEEKS } from "@/mock/standings";
import type { Trader } from "@/mock/standings";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Filler
);

// ─── Sort types ───────────────────────────────────────────────────────────────

type SortKey = "rank" | "record" | "portfolioValue";
type SortDir = "asc" | "desc";

function recordScore(t: Trader) {
  return t.wins - t.losses;
}

function sortTraders(traders: Trader[], key: SortKey, dir: SortDir): Trader[] {
  return [...traders].sort((a, b) => {
    let diff = 0;
    if (key === "record") diff = recordScore(a) - recordScore(b);
    else if (key === "portfolioValue") diff = a.portfolioValue - b.portfolioValue;
    else diff = 0; // rank = default order
    return dir === "asc" ? diff : -diff;
  });
}

// ─── Trader avatar ─────────────────────────────────────────────────────────────

function TraderAvatar({ name }: { name: string }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        fontWeight: 700,
        color: "white",
        flexShrink: 0,
      }}
    >
      {name[0].toUpperCase()}
    </div>
  );
}

// ─── Sort header button ────────────────────────────────────────────────────────

function SortBtn({
  label,
  active,
  dir,
  onClick,
}: {
  label: string;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
}) {
  const Icon = active ? (dir === "desc" ? ArrowDown : ArrowUp) : ArrowUpDown;
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: active ? colors.accent : colors.textDim,
        fontFamily: "var(--font-mono)",
        padding: 0,
      }}
    >
      {label}
      <Icon size={10} />
    </button>
  );
}

// ─── Bar chart — portfolio sizes ──────────────────────────────────────────────

function PortfolioBarChart({ traders }: { traders: Trader[] }) {
  const sorted = [...traders].sort((a, b) => b.portfolioValue - a.portfolioValue);
  const data = {
    labels: sorted.map((t) => t.name.slice(0, 8)),
    datasets: [
      {
        data: sorted.map((t) => t.portfolioValue),
        backgroundColor: sorted.map((t) =>
          t.name === "Jonathan" ? colors.accent + "cc" : colors.accent + "44"
        ),
        borderColor: sorted.map((t) =>
          t.name === "Jonathan" ? colors.accent : colors.accent + "88"
        ),
        borderWidth: 1.5,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: {
      callbacks: {
        label: (ctx: { raw: unknown }) => ` $${(ctx.raw as number).toLocaleString()}`,
      },
    }},
    scales: {
      x: {
        ticks: { color: colors.textDim, font: { size: 9 } },
        grid: { color: colors.border },
      },
      y: {
        ticks: {
          color: colors.textDim,
          font: { size: 9 },
          callback: (v: unknown) => `$${((v as number) / 1000).toFixed(0)}k`,
        },
        grid: { color: colors.border },
      },
    },
  } as const;

  return <Bar data={data} options={options} />;
}

// ─── Line chart — weekly portfolio history ────────────────────────────────────

function WeeklyLineChart({ traders }: { traders: Trader[] }) {
  const palette = [
    colors.accent,
    colors.posWR,
    colors.posQB,
    colors.posTE,
    colors.posRB,
    colors.gold,
    colors.textMuted,
    colors.textDim,
  ];

  const data = {
    labels: WEEKS,
    datasets: traders.map((t, i) => ({
      label: t.name,
      data: t.weeklyHistory,
      borderColor: palette[i % palette.length],
      backgroundColor: "transparent",
      borderWidth: t.name === "Jonathan" ? 2.5 : 1.5,
      pointRadius: 0,
      tension: 0.3,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: {
      callbacks: {
        label: (ctx: { dataset: { label: string }; raw: unknown }) =>
          ` ${ctx.dataset.label}: $${(ctx.raw as number).toLocaleString()}`,
      },
    }},
    scales: {
      x: {
        ticks: { color: colors.textDim, font: { size: 9 } },
        grid: { color: colors.border },
      },
      y: {
        ticks: {
          color: colors.textDim,
          font: { size: 9 },
          callback: (v: unknown) => `$${((v as number) / 1000).toFixed(0)}k`,
        },
        grid: { color: colors.border },
      },
    },
  } as const;

  return <Line data={data} options={options} />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StandingsPage() {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const sorted = sortTraders(MOCK_TRADERS, sortKey, sortDir);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      {/* Page title */}
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: colors.text,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Standings
        </h1>
        <p style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
          The Stock Exchange · Season 2025
        </p>
      </div>

      {/* Two-column layout: table left, charts right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* ── Standings table ── */}
        <div
          style={{
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 1fr 140px 140px",
              gap: 0,
              padding: "10px 18px",
              borderBottom: `1px solid ${colors.border}`,
              background: colors.surfaceLight,
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: colors.textDim, fontFamily: "var(--font-mono)" }}>
              #
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: colors.textDim, fontFamily: "var(--font-mono)" }}>
              Trader
            </div>
            <div style={{ textAlign: "right" }}>
              <SortBtn
                label="Record"
                active={sortKey === "record"}
                dir={sortDir}
                onClick={() => handleSort("record")}
              />
            </div>
            <div style={{ textAlign: "right" }}>
              <SortBtn
                label="Portfolio"
                active={sortKey === "portfolioValue"}
                dir={sortDir}
                onClick={() => handleSort("portfolioValue")}
              />
            </div>
          </div>

          {/* Rows */}
          {sorted.map((trader, idx) => {
            const isMe = trader.name === "Jonathan";
            const defaultIdx = MOCK_TRADERS.findIndex((t) => t.id === trader.id);
            const rank = sortKey === "rank" ? defaultIdx + 1 : idx + 1;
            const winPct = trader.wins / (trader.wins + trader.losses);

            return (
              <div
                key={trader.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr 140px 140px",
                  gap: 0,
                  padding: "13px 18px",
                  borderBottom: `1px solid ${colors.border}`,
                  background: isMe ? `${colors.accent}08` : "transparent",
                  alignItems: "center",
                }}
              >
                {/* Rank */}
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: rank <= 3 ? 700 : 500,
                    color: rank === 1 ? colors.gold : rank <= 3 ? colors.text : colors.textMuted,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {rank}
                </div>

                {/* Trader */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <TraderAvatar name={trader.name} />
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: isMe ? 700 : 500,
                        color: isMe ? colors.accent : colors.text,
                      }}
                    >
                      {trader.name}
                      {isMe && (
                        <span
                          style={{
                            marginLeft: 6,
                            fontSize: 10,
                            fontWeight: 600,
                            color: colors.accent,
                            background: `${colors.accent}18`,
                            padding: "1px 6px",
                            borderRadius: 4,
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          you
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Record */}
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: colors.text,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {trader.wins}–{trader.losses}
                  </span>
                  {/* Win % bar */}
                  <div
                    style={{
                      marginTop: 4,
                      height: 3,
                      borderRadius: 2,
                      background: colors.surfaceLight,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${winPct * 100}%`,
                        background: winPct >= 0.5 ? colors.accent : colors.red,
                        borderRadius: 2,
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>
                </div>

                {/* Portfolio value */}
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: colors.text,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    ${trader.portfolioValue.toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Right column: charts ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Portfolio sizes bar chart */}
          <div
            style={{
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: 14,
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: colors.text,
                letterSpacing: "-0.01em",
                marginBottom: 14,
              }}
            >
              Portfolio Values
            </div>
            <div style={{ height: 160 }}>
              <PortfolioBarChart traders={MOCK_TRADERS} />
            </div>
          </div>

          {/* Weekly performance line chart */}
          <div
            style={{
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: 14,
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: colors.text,
                letterSpacing: "-0.01em",
                marginBottom: 4,
              }}
            >
              Weekly Performance
            </div>
            <div
              style={{
                fontSize: 10,
                color: colors.textMuted,
                fontFamily: "var(--font-mono)",
                marginBottom: 14,
              }}
            >
              All traders · last 8 weeks
            </div>
            <div style={{ height: 160 }}>
              <WeeklyLineChart traders={MOCK_TRADERS} />
            </div>
            {/* Legend */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px 12px",
                marginTop: 12,
              }}
            >
              {MOCK_TRADERS.map((t, i) => {
                const palette = [
                  colors.accent, colors.posWR, colors.posQB, colors.posTE,
                  colors.posRB, colors.gold, colors.textMuted, colors.textDim,
                ];
                return (
                  <div
                    key={t.id}
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 2,
                        borderRadius: 1,
                        background: palette[i % palette.length],
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 9,
                        color: colors.textMuted,
                        fontFamily: "var(--font-mono)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t.name.slice(0, 10)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
