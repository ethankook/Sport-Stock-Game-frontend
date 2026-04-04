// A trader in a league's standings
export interface Trader {
  id: string;
  name: string;
  wins: number;
  losses: number;
  portfolioValue: number;
  weeklyHistory: number[];
}

// A player stock holding in the user's portfolio
export interface Holding {
  id: string;
  name: string;
  position: string;
  team: string;
  shares: number;
  buyPrice: number;
  currentPrice: number;
  change: number;
}
