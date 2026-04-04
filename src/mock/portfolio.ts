import type { Holding } from "@/types/user";

export type { Holding } from "@/types/user";

export const MOCK_HOLDINGS: Holding[] = [
  { id: "1", name: "Patrick Mahomes", position: "QB", team: "KC",  shares: 4, buyPrice: 820, currentPrice: 940, change:  14.6 },
  { id: "2", name: "CeeDee Lamb",     position: "WR", team: "DAL", shares: 6, buyPrice: 610, currentPrice: 580, change:  -4.9 },
  { id: "3", name: "Saquon Barkley",  position: "RB", team: "PHI", shares: 3, buyPrice: 490, currentPrice: 560, change:  14.3 },
  { id: "4", name: "Sam LaPorta",     position: "TE", team: "DET", shares: 5, buyPrice: 210, currentPrice: 245, change:  16.7 },
];

export const PORTFOLIO_VALUE  = 14_820;
export const PORTFOLIO_CHANGE = 8.4;
export const CASH             = 2_180;
