"use client";

import { colors } from "@/lib/theme";

export interface League {
  id: string;
  name: string;
  memberCount: number;
  maxMembers: number;
  season: string;
  yourRank?: number;
  portfolioValue?: number;
  portfolioChange?: number;
}

export function LeagueCard({ league }: { league: League }) {
  const changePositive = (league.portfolioChange ?? 0) >= 0;

  return (
    <div
      onClick={() => {
        // TODO: navigate to /dashboard/leagues/[leagueId]
      }}
      style={{
        borderRadius: 16,
        padding: 24,
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* League name + season badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: colors.text, margin: 0 }}>
          {league.name}
        </h3>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: 8,
            background: "rgba(62, 207, 142, 0.1)",
            color: colors.accent,
            fontFamily: "var(--font-mono)",
          }}
        >
          {league.season}
        </span>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: colors.textDim, fontFamily: "var(--font-mono)", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 4 }}>
            Members
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>
            {league.memberCount}/{league.maxMembers}
          </div>
        </div>
        {league.yourRank != null && (
          <div>
            <div style={{ fontSize: 11, color: colors.textDim, fontFamily: "var(--font-mono)", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 4 }}>
              Your Rank
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: colors.gold }}>
              #{league.yourRank}
            </div>
          </div>
        )}
      </div>

      {/* Portfolio value */}
      {league.portfolioValue != null && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderRadius: 12,
            background: colors.surfaceLight,
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: colors.textDim, fontFamily: "var(--font-mono)", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 2 }}>
              Portfolio Value
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>
              ${league.portfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              color: changePositive ? colors.accent : colors.red,
            }}
          >
            {changePositive ? "▲" : "▼"} {changePositive ? "+" : ""}
            {league.portfolioChange?.toFixed(1)}%
          </div>
        </div>
      )}
    </div>
  );
}