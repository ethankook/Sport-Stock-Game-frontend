import type { Game } from "@/components/market/GameCard";

export const MOCK_GAMES: Game[] = [
  {
    id: "g1",
    day: "Sun, Apr 6",
    time: "1:00 PM",
    home: { name: "Kansas City Chiefs", abbr: "KC",  record: "14-3" },
    away: { name: "Buffalo Bills",       abbr: "BUF", record: "13-4" },
    moneyline: { home: -175, away: +148 },
    status: "upcoming",
  },
  {
    id: "g2",
    day: "Sun, Apr 6",
    time: "4:25 PM",
    home: { name: "Philadelphia Eagles", abbr: "PHI", record: "14-3" },
    away: { name: "Detroit Lions",        abbr: "DET", record: "15-2" },
    moneyline: { home: +122, away: -142 },
    status: "upcoming",
  },
  {
    id: "g3",
    day: "Sun, Apr 6",
    time: "8:20 PM",
    home: { name: "San Francisco 49ers", abbr: "SF", record: "12-5" },
    away: { name: "Green Bay Packers",   abbr: "GB", record: "11-6" },
    moneyline: { home: -260, away: +212 },
    status: "upcoming",
  },
  {
    id: "g4",
    day: "Mon, Apr 7",
    time: "8:15 PM",
    home: { name: "Dallas Cowboys",    abbr: "DAL", record: "10-7" },
    away: { name: "Los Angeles Rams",  abbr: "LAR", record: "10-7" },
    moneyline: { home: -138, away: +116 },
    status: "upcoming",
  },
];
