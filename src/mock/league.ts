import type { LeagueContext } from "@/types/league";

export type { LeagueContext } from "@/types/league";

// Active league + user context used by sidebar and layouts
// TODO: replace with real session/API data
export const MOCK_LEAGUE: LeagueContext = {
  leagueName: "The Stock Exchange",
  userName: "Jonathan",
  rank: 2,
  portfolioValue: 14_820,
};
