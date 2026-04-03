"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GameCard, type Game } from "@/components/market/GameCard";
import { PlayerCard, type Player } from "@/components/market/PlayerCard";
import { colors } from "@/lib/theme";

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_GAMES: Game[] = [
  {
    id: "g1",
    day: "Sun, Apr 6",
    time: "1:00 PM",
    home: { name: "Kansas City Chiefs", abbr: "KC", record: "14-3" },
    away: { name: "Buffalo Bills", abbr: "BUF", record: "13-4" },
    moneyline: { home: -175, away: +148 },
    status: "upcoming",
  },
  {
    id: "g2",
    day: "Sun, Apr 6",
    time: "4:25 PM",
    home: { name: "Philadelphia Eagles", abbr: "PHI", record: "14-3" },
    away: { name: "Detroit Lions", abbr: "DET", record: "15-2" },
    moneyline: { home: +122, away: -142 },
    status: "upcoming",
  },
  {
    id: "g3",
    day: "Sun, Apr 6",
    time: "8:20 PM",
    home: { name: "San Francisco 49ers", abbr: "SF", record: "12-5" },
    away: { name: "Green Bay Packers", abbr: "GB", record: "11-6" },
    moneyline: { home: -260, away: +212 },
    status: "upcoming",
  },
  {
    id: "g4",
    day: "Mon, Apr 7",
    time: "8:15 PM",
    home: { name: "Dallas Cowboys", abbr: "DAL", record: "10-7" },
    away: { name: "Los Angeles Rams", abbr: "LAR", record: "10-7" },
    moneyline: { home: -138, away: +116 },
    status: "upcoming",
  },
];

const MOCK_PLAYERS: Player[] = [
  { id: "p1",  name: "Patrick Mahomes",     pos: "QB", team: "KC",  number: 15, price: 142.50, change:  3.8, volume: 12_480, mktCap: 284_100 },
  { id: "p2",  name: "Lamar Jackson",       pos: "QB", team: "BAL", number:  8, price: 138.60, change:  1.7, volume:  9_230, mktCap: 277_200 },
  { id: "p3",  name: "Jalen Hurts",         pos: "QB", team: "PHI", number:  1, price: 131.20, change:  2.4, volume:  8_750, mktCap: 262_400 },
  { id: "p4",  name: "Ja'Marr Chase",       pos: "WR", team: "CIN", number:  1, price: 122.10, change: -0.3, volume:  7_420, mktCap: 244_200 },
  { id: "p5",  name: "Tyreek Hill",         pos: "WR", team: "MIA", number: 10, price: 125.70, change: -0.9, volume:  6_900, mktCap: 251_400 },
  { id: "p6",  name: "Justin Jefferson",    pos: "WR", team: "MIN", number: 18, price: 118.30, change:  1.2, volume:  8_100, mktCap: 236_600 },
  { id: "p7",  name: "Saquon Barkley",      pos: "RB", team: "PHI", number: 26, price:  89.20, change:  5.2, volume: 15_300, mktCap: 178_400 },
  { id: "p8",  name: "Christian McCaffrey", pos: "RB", team: "SF",  number: 23, price: 108.90, change: -1.5, volume:  5_600, mktCap: 217_800 },
  { id: "p9",  name: "Derrick Henry",       pos: "RB", team: "TEN", number: 22, price:  76.80, change: -2.1, volume:  4_200, mktCap: 153_600 },
  { id: "p10", name: "Sam LaPorta",         pos: "TE", team: "DET", number: 87, price:  58.40, change:  4.6, volume: 11_200, mktCap: 116_800 },
  { id: "p11", name: "Travis Kelce",        pos: "TE", team: "KC",  number: 87, price:  97.30, change:  0.6, volume:  6_700, mktCap: 194_600 },
  { id: "p12", name: "Amon-Ra St. Brown",   pos: "WR", team: "DET", number: 14, price:  97.40, change:  4.1, volume:  9_800, mktCap: 194_800 },
];

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
              <PlayerCard key={p.id} player={p} />
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
    </div>
  );
}
