"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { colors, positionColor } from "@/lib/theme";

export interface Player {
  id: string;
  name: string;
  pos: string;
  team: string;
  number: number;
  price: number;
  change: number;
  volume: number;
  mktCap: number;
}

function PlayerAvatar({ name, pos }: { name: string; pos: string }) {
  const posCol = positionColor(pos);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        borderRadius: 12,
        background: `${posCol}12`,
        border: `1.5px solid ${posCol}30`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        fontWeight: 800,
        color: `${posCol}80`,
        letterSpacing: "-0.03em",
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  );
}

export function PlayerCard({ player }: { player: Player }) {
  const isUp = player.change >= 0;
  const posCol = positionColor(player.pos);

  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "border-color 0.15s",
        cursor: "pointer",
      }}
    >
      {/* Top row: position pill · #number · team */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: posCol,
            background: `${posCol}20`,
            padding: "2px 8px",
            borderRadius: 999,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.04em",
          }}
        >
          {player.pos}
        </span>
        <span
          style={{
            fontSize: 11,
            color: colors.textMuted,
            fontFamily: "var(--font-mono)",
          }}
        >
          #{player.number} · {player.team}
        </span>
      </div>

      {/* Avatar */}
      <PlayerAvatar name={player.name} pos={player.pos} />

      {/* Name */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: colors.text,
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {player.name}
      </div>

      {/* Price + change */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: colors.text,
            fontFamily: "var(--font-mono)",
          }}
        >
          ${player.price.toFixed(2)}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 3,
            fontSize: 11,
            fontWeight: 700,
            color: isUp ? colors.accent : colors.red,
            fontFamily: "var(--font-mono)",
          }}
        >
          {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {isUp ? "+" : ""}
          {player.change}%
        </span>
      </div>

      {/* Buy button */}
      <Button
        size="sm"
        style={{
          background: colors.accent,
          color: colors.bg,
          fontWeight: 700,
          fontSize: 12,
          borderRadius: 8,
          width: "100%",
          border: "none",
        }}
      >
        Buy
      </Button>
    </div>
  );
}
