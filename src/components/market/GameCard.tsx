"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { colors } from "@/lib/theme";

export interface Game {
  id: string;
  day: string;
  time: string;
  home: { name: string; abbr: string; record: string };
  away: { name: string; abbr: string; record: string };
  moneyline: { home: number; away: number };
  status: "upcoming" | "live" | "final";
}

function formatOdds(odds: number): string {
  return odds > 0 ? `+${odds}` : `${odds}`;
}

function TeamPickBtn({
  abbr,
  name,
  record,
  odds,
  selected,
  onSelect,
}: {
  abbr: string;
  name: string;
  record: string;
  odds: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      style={{
        flex: 1,
        height: 120,
        padding: "0 10px",
        borderRadius: 10,
        border: `1.5px solid ${selected ? colors.accent : colors.border}`,
        background: selected ? `${colors.accent}14` : colors.surfaceLight,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        transition: "border-color 0.15s, background 0.15s",
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      <span
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: selected ? colors.accent : colors.text,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {abbr}
      </span>
      <span
        style={{
          fontSize: 10,
          color: colors.textMuted,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontSize: 10,
          color: colors.textDim,
          fontFamily: "var(--font-mono)",
          flexShrink: 0,
        }}
      >
        {record}
      </span>
      <span
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: selected ? colors.accent : colors.textMuted,
          fontFamily: "var(--font-mono)",
          flexShrink: 0,
        }}
      >
        {formatOdds(odds)}
      </span>
    </button>
  );
}

export function GameCard({ game }: { game: Game }) {
  const [pick, setPick] = useState<"home" | "away" | null>(null);

  function handlePick(side: "home" | "away") {
    setPick((prev) => (prev === side ? null : side));
  }

  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        padding: "16px 16px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {/* Date / time */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: colors.textMuted,
            fontFamily: "var(--font-mono)",
          }}
        >
          {game.day}
        </span>
        <span
          style={{
            fontSize: 10,
            color: colors.textMuted,
            fontFamily: "var(--font-mono)",
          }}
        >
          {game.time} ET
        </span>
      </div>

      {/* Pick buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        <TeamPickBtn
          abbr={game.away.abbr}
          name={game.away.name}
          record={game.away.record}
          odds={game.moneyline.away}
          selected={pick === "away"}
          onSelect={() => handlePick("away")}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 11,
            fontWeight: 700,
            color: colors.textDim,
            fontFamily: "var(--font-mono)",
            flexShrink: 0,
          }}
        >
          @
        </div>
        <TeamPickBtn
          abbr={game.home.abbr}
          name={game.home.name}
          record={game.home.record}
          odds={game.moneyline.home}
          selected={pick === "home"}
          onSelect={() => handlePick("home")}
        />
      </div>

      {/* CTA — only shown when a pick is made */}
      <Button
        disabled={pick === null}
        style={{
          background: pick ? colors.accent : colors.surfaceLight,
          color: pick ? colors.bg : colors.textDim,
          fontWeight: 700,
          fontSize: 13,
          width: "100%",
          borderRadius: 8,
          border: "none",
          cursor: pick ? "pointer" : "default",
          transition: "background 0.15s, color 0.15s",
        }}
      >
        {pick
          ? `Bet on ${pick === "away" ? game.away.abbr : game.home.abbr} to win`
          : "Pick a winner"}
      </Button>
    </div>
  );
}
