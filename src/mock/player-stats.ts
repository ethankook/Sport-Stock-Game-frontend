import type { WeekStat } from "@/types/stats";

export type { WeekStat } from "@/types/stats";

// TODO: replace with real portfolio value from user context/session
export const MOCK_PORTFOLIO_VALUE = 14_820;

// ─── QB ───────────────────────────────────────────────────────────────────────

export const QB_STATS: WeekStat[] = [
  { week: 1, projPts: 26.1, actPts: 31.4, passYds: 312, rushYds: 18, passTDs: 3, rushTDs: 0, ints: 0, fumbles: 0 },
  { week: 2, projPts: 24.8, actPts: 21.0, passYds: 248, rushYds: 14, passTDs: 1, rushTDs: 0, ints: 1, fumbles: 0 },
  { week: 3, projPts: 27.3, actPts: 29.7, passYds: 291, rushYds: 22, passTDs: 2, rushTDs: 1, ints: 0, fumbles: 0 },
  { week: 4, projPts: 23.5, actPts: 18.2, passYds: 204, rushYds: 11, passTDs: 1, rushTDs: 0, ints: 2, fumbles: 1 },
  { week: 5, projPts: 25.9, actPts: 33.1, passYds: 338, rushYds: 19, passTDs: 3, rushTDs: 1, ints: 0, fumbles: 0 },
  { week: 6, projPts: 22.4, actPts: 24.6, passYds: 267, rushYds: 16, passTDs: 2, rushTDs: 0, ints: 1, fumbles: 0 },
  { week: 7, projPts: 28.0, actPts: 26.3, passYds: 279, rushYds: 20, passTDs: 2, rushTDs: 0, ints: 0, fumbles: 1 },
  { week: 8, projPts: 24.5, actPts: null, passYds: null, rushYds: null, passTDs: null, rushTDs: null, ints: null, fumbles: null },
];

// ─── RB ───────────────────────────────────────────────────────────────────────

export const RB_STATS: WeekStat[] = [
  { week: 1, projPts: 18.2, actPts: 22.5, rushYds: 124, recYds:  32, rushTDs: 2, recTDs: 0, fumbles: 0 },
  { week: 2, projPts: 16.8, actPts: 14.1, rushYds:  98, recYds:  18, rushTDs: 0, recTDs: 0, fumbles: 1 },
  { week: 3, projPts: 19.4, actPts: 25.8, rushYds: 141, recYds:  44, rushTDs: 2, recTDs: 0, fumbles: 0 },
  { week: 4, projPts: 17.1, actPts: 11.3, rushYds:  83, recYds:  12, rushTDs: 1, recTDs: 0, fumbles: 1 },
  { week: 5, projPts: 20.6, actPts: 28.2, rushYds: 156, recYds:  56, rushTDs: 2, recTDs: 1, fumbles: 0 },
  { week: 6, projPts: 15.9, actPts: 18.4, rushYds: 109, recYds:  28, rushTDs: 1, recTDs: 0, fumbles: 0 },
  { week: 7, projPts: 18.7, actPts: 20.1, rushYds: 118, recYds:  34, rushTDs: 1, recTDs: 0, fumbles: 0 },
  { week: 8, projPts: 17.3, actPts: null, rushYds: null, recYds: null, rushTDs: null, recTDs: null, fumbles: null },
];

// ─── WR ───────────────────────────────────────────────────────────────────────

export const WR_STATS: WeekStat[] = [
  { week: 1, projPts: 15.4, actPts: 19.8, recYds: 112, targets:  8, rec: 6, tds: 1, fumbles: 0 },
  { week: 2, projPts: 13.2, actPts: 10.5, recYds:  74, targets:  6, rec: 4, tds: 0, fumbles: 0 },
  { week: 3, projPts: 16.8, actPts: 22.1, recYds: 138, targets:  9, rec: 7, tds: 2, fumbles: 0 },
  { week: 4, projPts: 12.9, actPts:  8.4, recYds:  56, targets:  5, rec: 3, tds: 0, fumbles: 1 },
  { week: 5, projPts: 17.3, actPts: 24.6, recYds: 159, targets: 10, rec: 8, tds: 2, fumbles: 0 },
  { week: 6, projPts: 14.1, actPts: 16.2, recYds:  98, targets:  7, rec: 5, tds: 1, fumbles: 0 },
  { week: 7, projPts: 15.7, actPts: 13.8, recYds:  88, targets:  8, rec: 5, tds: 0, fumbles: 0 },
  { week: 8, projPts: 14.8, actPts: null, recYds: null, targets: null, rec: null, tds: null, fumbles: null },
];

// ─── TE ───────────────────────────────────────────────────────────────────────

export const TE_STATS: WeekStat[] = [
  { week: 1, projPts: 12.1, actPts: 16.4, recYds:  88, targets: 6, rec: 5, tds: 1, fumbles: 0 },
  { week: 2, projPts: 10.8, actPts:  8.2, recYds:  54, targets: 5, rec: 3, tds: 0, fumbles: 0 },
  { week: 3, projPts: 13.4, actPts: 18.9, recYds:  98, targets: 7, rec: 6, tds: 2, fumbles: 0 },
  { week: 4, projPts:  9.6, actPts:  7.1, recYds:  44, targets: 4, rec: 3, tds: 0, fumbles: 1 },
  { week: 5, projPts: 14.2, actPts: 20.3, recYds: 112, targets: 8, rec: 7, tds: 2, fumbles: 0 },
  { week: 6, projPts: 11.3, actPts: 13.7, recYds:  76, targets: 6, rec: 5, tds: 1, fumbles: 0 },
  { week: 7, projPts: 12.8, actPts: 11.4, recYds:  68, targets: 5, rec: 4, tds: 0, fumbles: 0 },
  { week: 8, projPts: 11.9, actPts: null, recYds: null, targets: null, rec: null, tds: null, fumbles: null },
];
