"use client";

import { useState } from "react";
import { PanelLeftIcon } from "lucide-react";
import { AppSidebar, SIDEBAR_WIDTH, HEADER_HEIGHT } from "@/components/layout/SideBar";
import { colors } from "@/lib/theme";
import { MOCK_LEAGUE } from "@/mock/league";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarWidth = sidebarOpen ? SIDEBAR_WIDTH : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        fontFamily: "var(--font-sans)",
      }}
    >
      <AppSidebar isOpen={sidebarOpen} {...MOCK_LEAGUE} />

      {/* Full-width fixed header — sidebar (z-index 20) sits on top of it */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          zIndex: 15,
          display: "flex",
          alignItems: "center",
          gap: 12,
          paddingLeft: sidebarWidth + 14,
          paddingRight: 20,
          borderBottom: `1px solid ${colors.border}`,
          background: colors.surface,
          transition: "padding-left 0.2s ease",
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

      {/* Page content — offset below fixed header and right of sidebar */}
      <div
        style={{
          marginLeft: sidebarWidth,
          paddingTop: HEADER_HEIGHT,
          transition: "margin-left 0.2s ease",
          minHeight: "100vh",
        }}
      >
        <main style={{ padding: "28px 32px" }}>{children}</main>
      </div>
    </div>
  );
}
