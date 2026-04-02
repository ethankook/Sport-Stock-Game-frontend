"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  Trophy,
  History,
  ChevronLeft,
} from "lucide-react";
import { colors } from "@/lib/theme";

const NAV_ITEMS = [
  { label: "Portfolio", icon: LayoutDashboard, href: "/portfolio" },
  { label: "Market", icon: Users, href: "/market" },
  { label: "Standings", icon: Trophy, href: "/standings" }
];

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
        width: isOpen ? 240 : 0,
        minWidth: isOpen ? 240 : 0,
        overflow: "hidden",
        transition: "width 0.2s ease, min-width 0.2s ease",
        background: colors.surface,
        borderRight: `1px solid ${colors.border}`,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        flexShrink: 0,
      }}
    >
      {/* Inner content — hidden when collapsed */}
      <div
        style={{
          width: 240,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 16px 16px" }}>
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              color: colors.textMuted,
              textDecoration: "none",
              marginBottom: 14,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.06em",
            }}
          >
            <ChevronLeft size={12} />
            All Leagues
          </Link>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: colors.text,
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
            }}
          >
            {leagueName}
          </div>
          {rank !== undefined && (
            <div
              style={{
                marginTop: 8,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                color: colors.gold,
                background: "rgba(245,197,66,0.1)",
                padding: "3px 8px",
                borderRadius: 6,
                whiteSpace: "nowrap",
              }}
            >
              #{rank} in league
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: colors.border, marginBottom: 8 }} />

        {/* Nav label */}
        <div
          style={{
            padding: "0 16px 6px",
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
        <nav style={{ padding: "0 8px", flex: 1 }}>
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
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 8,
                  marginBottom: 2,
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? colors.text : colors.textMuted,
                  background: isActive ? colors.surfaceLight : "transparent",
                  textDecoration: "none",
                  transition: "background 0.15s, color 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                <item.icon
                  size={15}
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
            padding: "16px",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          {portfolioValue !== undefined && (
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: colors.textMuted,
                  fontFamily: "var(--font-mono)",
                  marginBottom: 2,
                  whiteSpace: "nowrap",
                }}
              >
                Portfolio Value
              </div>
              <div
                style={{
                  fontSize: 18,
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
          {userName && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {userName[0].toUpperCase()}
              </div>
              <span
                style={{
                  fontSize: 13,
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
