import type { Trader } from "@/types/user";

export type { Trader } from "@/types/user";

export const WEEKS = ["Wk1", "Wk2", "Wk3", "Wk4", "Wk5", "Wk6", "Wk7", "Wk8"];

export const MOCK_TRADERS: Trader[] = [
  { id: "t1", name: "CeeDeeznuts",  wins: 13, losses:  4, portfolioValue: 18_240, weeklyHistory: [11000, 12400, 13100, 14200, 15000, 16100, 17200, 18240] },
  { id: "t2", name: "Jonathan",     wins: 12, losses:  5, portfolioValue: 14_820, weeklyHistory: [10000, 11200, 11800, 12500, 13100, 13800, 14200, 14820] },
  { id: "t3", name: "GridironGuru", wins: 11, losses:  6, portfolioValue: 13_450, weeklyHistory: [10000, 10500, 11200, 11800, 12400, 12900, 13200, 13450] },
  { id: "t4", name: "TouchdownTom", wins: 10, losses:  7, portfolioValue: 12_100, weeklyHistory: [10000,  9800, 10200, 10900, 11100, 11500, 11800, 12100] },
  { id: "t5", name: "BlitzKrieg99", wins:  9, losses:  8, portfolioValue: 11_670, weeklyHistory: [10000, 10200, 10800, 11000, 10700, 11100, 11400, 11670] },
  { id: "t6", name: "RedZoneRandy", wins:  7, losses: 10, portfolioValue:  9_980, weeklyHistory: [10000, 10300, 10100,  9800,  9600,  9900, 10100,  9980] },
  { id: "t7", name: "FumbleKing",   wins:  5, losses: 12, portfolioValue:  8_350, weeklyHistory: [10000,  9600,  9200,  8900,  8700,  8500,  8400,  8350] },
  { id: "t8", name: "BenchWarmer",  wins:  3, losses: 14, portfolioValue:  6_120, weeklyHistory: [10000,  9100,  8400,  7800,  7200,  6900,  6500,  6120] },
];
