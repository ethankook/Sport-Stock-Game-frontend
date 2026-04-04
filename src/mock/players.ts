import type { Player } from "@/types/market";

export const MOCK_PLAYERS: Player[] = [
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
