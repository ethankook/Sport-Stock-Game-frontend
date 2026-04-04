// ─── Game ─────────────────────────────────────────────────────────────────────

export interface GameTeam {
  name: string;
  abbr: string;
  record: string;
}

export interface Game {
  id: string;
  day: string;
  time: string;
  home: GameTeam;
  away: GameTeam;
  moneyline: { home: number; away: number };
  status: "upcoming" | "live" | "final";
}

// ─── Player stock ─────────────────────────────────────────────────────────────

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
