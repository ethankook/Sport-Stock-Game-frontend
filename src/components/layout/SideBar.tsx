"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Trophy,
  ChevronLeft,
  Settings,
} from "lucide-react";
import { colors } from "@/lib/theme";

const NAV_ITEMS = [
  { label: "Portfolio", icon: LayoutDashboard, href: "/portfolio" },
  { label: "Market", icon: Users, href: "/market" },
  { label: "Standings", icon: Trophy, href: "/standings" },
];

// Must stay in sync with the layout header height
export const HEADER_HEIGHT = 50;
export const SIDEBAR_WIDTH = 260;

interface AppSidebarProps {
  isOpen: boolean;
  leagueName?: string;
  userName?: string;
  rank?: number;
  portfolioValue?: number;
}

export function AppSidebar({
  isOpen,
  leagueName = "My League",
  userName,
  rank,
  portfolioValue,
}: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: isOpen ? SIDEBAR_WIDTH : 0,
        overflow: "hidden",
        transition: "width 0.2s ease",
        background: colors.surface,
        borderRight: `1px solid ${colors.border}`,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 20,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: SIDEBAR_WIDTH,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Top bar — aligns with the full-width layout header */}
        <div
          style={{
            height: HEADER_HEIGHT,
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            borderBottom: `1px solid ${colors.border}`,
            flexShrink: 0,
          }}
        >
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12,
              color: colors.textMuted,
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.05em",
            }}
          >
            <ChevronLeft size={13} />
            All Leagues
          </Link>
        </div>

        {/* League info */}
        <div style={{ padding: "18px 18px 14px" }}>
          <div
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: colors.text,
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              marginBottom: 6,
            }}
          >
            {leagueName}
          </div>
          {userName && (
            <div
              style={{
                fontSize: 12,
                color: colors.textMuted,
                fontFamily: "var(--font-mono)",
                marginBottom: 8,
                whiteSpace: "nowrap",
              }}
            >
              {userName}
            </div>
          )}
          {rank !== undefined && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontFamily: "var(--font-mono)",
                color: colors.gold,
                background: "rgba(245,197,66,0.1)",
                padding: "3px 10px",
                borderRadius: 6,
                whiteSpace: "nowrap",
              }}
            >
              #{rank} in league
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: colors.border, margin: "0 18px 10px" }} />

        {/* Nav label */}
        <div
          style={{
            padding: "0 18px 8px",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: colors.textMuted,
            fontFamily: "var(--font-mono)",
            whiteSpace: "nowrap",
          }}
        >
          My League
        </div>

        {/* Nav items */}
        <nav style={{ padding: "0 10px", flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/portfolio"
                ? pathname === "/portfolio"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  padding: "9px 12px",
                  borderRadius: 9,
                  marginBottom: 3,
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? colors.text : colors.textMuted,
                  background: isActive ? colors.surfaceLight : "transparent",
                  textDecoration: "none",
                  transition: "background 0.15s, color 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                <item.icon
                  size={16}
                  color={isActive ? colors.accent : colors.textMuted}
                  style={{ flexShrink: 0 }}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: "16px 18px",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          {/* Portfolio value */}
          {portfolioValue !== undefined && (
            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: colors.textMuted,
                  fontFamily: "var(--font-mono)",
                  marginBottom: 3,
                  whiteSpace: "nowrap",
                }}
              >
                Portfolio Value
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: colors.accent,
                  fontFamily: "var(--font-mono)",
                  whiteSpace: "nowrap",
                }}
              >
                ${portfolioValue.toLocaleString()}
              </div>
            </div>
          )}

          {/* Settings link */}
          <Link
            href="/settings"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 0",
              marginBottom: 10,
              fontSize: 13,
              fontWeight: 500,
              color: colors.textMuted,
              textDecoration: "none",
              transition: "color 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            <Settings size={15} color={colors.textMuted} style={{ flexShrink: 0 }} />
            Settings
          </Link>

          {/* User row */}
          {userName && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {userName[0].toUpperCase()}
              </div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.text,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {userName}
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
