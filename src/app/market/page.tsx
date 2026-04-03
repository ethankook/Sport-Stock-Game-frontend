"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GameCard } from "@/components/market/GameCard";
import { PlayerCard, type Player } from "@/components/market/PlayerCard";
import { PlayerDrawer } from "@/components/market/PlayerDrawer";
import { MOCK_GAMES, MOCK_PLAYERS } from "./data";
import { colors } from "@/lib/theme";

// ─── Page ─────────────────────────────────────────────────────────────────────

type PositionFilter = "all" | "QB" | "RB" | "WR" | "TE";

const POSITION_FILTERS: { value: PositionFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "QB",  label: "QB" },
  { value: "RB",  label: "RB" },
  { value: "WR",  label: "WR" },
  { value: "TE",  label: "TE" },
];

export default function MarketPage() {
  const [posFilter, setPosFilter] = useState<PositionFilter>("all");
  const [search, setSearch] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const filteredPlayers = MOCK_PLAYERS.filter((p) => {
    const matchPos = posFilter === "all" || p.pos === posFilter;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.team.toLowerCase().includes(search.toLowerCase());
    return matchPos && matchSearch;
  });

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
          Market
        </h1>
        <p style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
          Week 18 · Apr 6–7, 2026
        </p>
      </div>

      {/* ── Games ── */}
      <section style={{ marginBottom: 48 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: colors.text, letterSpacing: "-0.01em" }}>
            This Week&apos;s Games
          </span>
          <span style={{ fontSize: 11, color: colors.textMuted, fontFamily: "var(--font-mono)" }}>
            {MOCK_GAMES.length} games
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
          }}
        >
          {MOCK_GAMES.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      </section>

      {/* ── Player stocks ── */}
      <section>
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: colors.text, letterSpacing: "-0.01em" }}>
            Player Stocks
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Oval position filter pills */}
            <div style={{ display: "flex", gap: 6 }}>
              {POSITION_FILTERS.map(({ value, label }) => {
                const active = posFilter === value;
                return (
                  <button
                    key={value}
                    onClick={() => setPosFilter(value)}
                    style={{
                      padding: "4px 14px",
                      borderRadius: 999,
                      border: `1px solid ${active ? colors.accent : colors.border}`,
                      background: active ? colors.accent : "transparent",
                      color: active ? colors.bg : colors.textMuted,
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: "var(--font-mono)",
                      cursor: "pointer",
                      transition: "background 0.15s, color 0.15s, border-color 0.15s",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div style={{ position: "relative" }}>
              <Search
                size={13}
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: colors.textMuted,
                  pointerEvents: "none",
                }}
              />
              <Input
                placeholder="Search players..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  height: 32,
                  paddingLeft: 30,
                  fontSize: 12,
                  background: colors.surfaceLight,
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                  borderRadius: 999,
                  width: 180,
                }}
              />
            </div>
          </div>
        </div>

        {/* Card grid */}
        {filteredPlayers.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 12,
            }}
          >
            {filteredPlayers.map((p) => (
              <PlayerCard key={p.id} player={p} onClick={() => setSelectedPlayer(p)} />
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "40px 0",
              textAlign: "center",
              color: colors.textMuted,
              fontSize: 13,
            }}
          >
            No players found
          </div>
        )}
      </section>

      <PlayerDrawer player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
    </div>
  );
}
