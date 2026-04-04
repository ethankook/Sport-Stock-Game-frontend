// Weekly performance row for a player — position-specific fields are optional
export interface WeekStat {
  week: number;
  projPts: number;
  actPts: number | null;
  // QB
  passYds?: number | null;
  rushYds?: number | null;
  passTDs?: number | null;
  rushTDs?: number | null;
  ints?: number | null;
  fumbles?: number | null;
  // RB
  recYds?: number | null;
  recTDs?: number | null;
  // WR / TE
  targets?: number | null;
  rec?: number | null;
  tds?: number | null;
}
