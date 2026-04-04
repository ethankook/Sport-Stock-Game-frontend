"use client";

import { colors, positionColor } from "@/lib/theme";
import { MOCK_HOLDINGS, PORTFOLIO_VALUE, PORTFOLIO_CHANGE, CASH } from "@/mock/portfolio";
import type { Holding } from "@/mock/portfolio";

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        padding: "20px 22px",
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: colors.textMuted,
          fontFamily: "var(--font-mono)",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: accent ? colors.accent : colors.text,
          fontFamily: "var(--font-mono)",
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

// ─── Holdings row ─────────────────────────────────────────────────────────────
function HoldingRow({ holding }: { holding: Holding }) {
  const totalValue = holding.shares * holding.currentPrice;
  const gain = (holding.currentPrice - holding.buyPrice) * holding.shares;
  const isUp = holding.change >= 0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto auto auto",
        alignItems: "center",
        gap: 16,
        padding: "14px 18px",
        borderRadius: 12,
        background: colors.surface,
        border: `1px solid ${colors.border}`,
      }}
    >
      {/* Player info */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `${positionColor(holding.position)}22`,
            border: `1.5px solid ${positionColor(holding.position)}55`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 700,
            color: positionColor(holding.position),
            fontFamily: "var(--font-mono)",
            flexShrink: 0,
          }}
        >
          {holding.position}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>{holding.name}</div>
          <div style={{ fontSize: 11, color: colors.textMuted, fontFamily: "var(--font-mono)" }}>
            {holding.team} · {holding.shares} shares
          </div>
        </div>
      </div>

      {/* Price */}
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: colors.text, fontFamily: "var(--font-mono)" }}>
          ${holding.currentPrice}
        </div>
        <div style={{ fontSize: 11, color: colors.textDim, fontFamily: "var(--font-mono)" }}>
          avg ${holding.buyPrice}
        </div>
      </div>

      {/* Change */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: isUp ? colors.accent : colors.red,
          fontFamily: "var(--font-mono)",
          background: isUp ? "rgba(62,207,142,0.1)" : "rgba(255,107,107,0.1)",
          padding: "4px 10px",
          borderRadius: 8,
          textAlign: "right",
        }}
      >
        {isUp ? "+" : ""}{holding.change}%
      </div>

      {/* Total value */}
      <div style={{ textAlign: "right", minWidth: 90 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: colors.text, fontFamily: "var(--font-mono)" }}>
          ${totalValue.toLocaleString()}
        </div>
        <div
          style={{
            fontSize: 11,
            color: gain >= 0 ? colors.accent : colors.red,
            fontFamily: "var(--font-mono)",
          }}
        >
          {gain >= 0 ? "+" : ""}${gain.toLocaleString()}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
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
          My Portfolio
        </h1>
        <p style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
          Season 2025 · Updated just now
        </p>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 14,
          marginBottom: 32,
        }}
      >
        <StatCard
          label="Portfolio Value"
          value={`$${PORTFOLIO_VALUE.toLocaleString()}`}
          sub={`+${PORTFOLIO_CHANGE}% all time`}
          accent
        />
        <StatCard label="Cash Available" value={`$${CASH.toLocaleString()}`} sub="Available to invest" />
        <StatCard label="Holdings" value={`${MOCK_HOLDINGS.length} players`} sub="Across 4 positions" />
      </div>

      {/* Holdings table */}
      <div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: colors.text,
            marginBottom: 12,
            letterSpacing: "-0.01em",
          }}
        >
          Holdings
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {MOCK_HOLDINGS.map((h) => (
            <HoldingRow key={h.id} holding={h} />
          ))}
        </div>
      </div>
    </div>
  );
}
