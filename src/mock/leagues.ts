import type { League, PublicLeague } from "@/types/league";

// User's own leagues — shown on the dashboard
export const MOCK_LEAGUES: League[] = [
  {
    id: "1",
    name: "The Stock Exchange",
    memberCount: 8,
    maxMembers: 10,
    season: "2025",
    yourRank: 2,
    portfolioValue: 12_450.75,
    portfolioChange: 4.2,
  },
  {
    id: "2",
    name: "Gridiron Traders",
    memberCount: 12,
    maxMembers: 12,
    season: "2025",
    yourRank: 5,
    portfolioValue: 9_870.30,
    portfolioChange: -1.8,
  },
  {
    id: "3",
    name: "Sunday Stocks",
    memberCount: 6,
    maxMembers: 8,
    season: "2025",
    yourRank: 1,
    portfolioValue: 15_230.50,
    portfolioChange: 7.1,
  },
];

// Public leagues available to join — shown in the join-league modal
export const MOCK_PUBLIC_LEAGUES: PublicLeague[] = [
  { id: "p1", name: "Open Market League",   members:  7, maxMembers: 12, season: "2025" },
  { id: "p2", name: "Reddit Stock Traders", members: 15, maxMembers: 20, season: "2025" },
  { id: "p3", name: "Casual Ballers",       members:  3, maxMembers:  8, season: "2025" },
  { id: "p4", name: "NFL Street Bets",      members:  9, maxMembers: 10, season: "2025" },
];
