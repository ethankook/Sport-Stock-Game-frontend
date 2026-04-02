"use client";

import { useState } from "react";
import { PanelLeftIcon } from "lucide-react";
import { AppSidebar } from "@/components/layout/SideBar";
import { colors } from "@/lib/theme";

// TODO: Replace with real league/user data from API or route params
const MOCK_LEAGUE = {
  leagueName: "The Stock Exchange",
  userName: "Jonathan",
  rank: 2,
  portfolioValue: 14_820,
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: colors.bg,
        fontFamily: "var(--font-sans)",
      }}
    >
      <AppSidebar isOpen={sidebarOpen} {...MOCK_LEAGUE} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 20px",
            borderBottom: `1px solid ${colors.border}`,
            background: colors.surface,
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.textMuted,
              flexShrink: 0,
            }}
          >
            <PanelLeftIcon size={18} />
          </button>
          <div style={{ width: 1, height: 18, background: colors.border }} />
          <span
            style={{
              fontSize: 13,
              color: colors.textMuted,
              fontFamily: "var(--font-mono)",
              whiteSpace: "nowrap",
            }}
          >
            Sport Stocks
          </span>
        </header>

        {/* Page content */}
        <main style={{ padding: "28px 32px", flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
