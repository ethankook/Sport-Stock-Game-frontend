"use client";

import { colors } from "@/lib/theme";
import { LeagueCard, League } from "@/components/layout/LeagueCard";
import { MOCK_LEAGUES } from "@/mock";

export default function DashboardPage() {
    const leagues = MOCK_LEAGUES;

    return (
        <div
            style={{
                borderRadius: 16,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                overflow: "hidden",
            }}
        >
            {/* Section header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    borderBottom: `1px solid ${colors.border}`,
                }}
            >
                <div>
                    <h1 style={{ fontSize: 18, fontWeight: 700, color: colors.text, margin: 0 }}>
                        My Leagues
                    </h1>
                    <p style={{ fontSize: 13, color: colors.textMuted, margin: "2px 0 0 0" }}>
                        {leagues.length} active {leagues.length === 1 ? "league" : "leagues"}
                    </p>
                </div>
            </div>

            {/* League cards */}
            {leagues.length > 0 ? (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: 12,
                        padding: 16,
                    }}
                >
                    {leagues.map((league) => (
                        <LeagueCard key={league.id} league={league} />
                    ))}
                </div>
            ) : (
                <div
                    style={{
                        textAlign: "center" as const,
                        padding: "64px 32px",
                    }}
                >
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🏈</div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: colors.text, margin: "0 0 8px 0" }}>
                        No leagues yet
                    </h2>
                    <p style={{ fontSize: 13, color: colors.textMuted, margin: 0, maxWidth: 320, marginLeft: "auto", marginRight: "auto" }}>
                        Create a new league to play with friends or join an existing one with an invite code.
                    </p>
                </div>
            )}
        </div>
    );
}