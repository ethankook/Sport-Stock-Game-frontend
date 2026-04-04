// League entity — shown on dashboard cards
export interface League {
  id: string;
  name: string;
  memberCount: number;
  maxMembers: number;
  season: string;
  yourRank?: number;
  portfolioValue?: number;
  portfolioChange?: number;
}

// Public league — shown in the join-league browse list
export interface PublicLeague {
  id: string;
  name: string;
  members: number;
  maxMembers: number;
  season: string;
}

// Current user's active league context (sidebar, layouts)
export interface LeagueContext {
  leagueName: string;
  userName: string;
  rank: number;
  portfolioValue: number;
}
