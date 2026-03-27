import { colors, positionColor } from "@/lib/theme";

export interface TickerItem {
    name: string;
    pos: string;
    price: string;
    pct: string;
}

// TODO: Replace with real data from API
const PLACEHOLDER_MOVERS: TickerItem[] = [
    { name: "S. Barkley", pos: "RB", price: "89.20", pct: "+5.2" },
    { name: "A. St. Brown", pos: "WR", price: "97.40", pct: "+4.1" },
    { name: "P. Mahomes", pos: "QB", price: "142.50", pct: "+3.8" },
    { name: "J. Hurts", pos: "QB", price: "131.20", pct: "+2.4" },
    { name: "L. Jackson", pos: "QB", price: "138.60", pct: "+1.7" },
    { name: "J. Jefferson", pos: "WR", price: "118.30", pct: "+1.2" },
    { name: "J. Chase", pos: "WR", price: "122.10", pct: "-0.3" },
    { name: "T. Hill", pos: "WR", price: "125.70", pct: "-0.9" },
    { name: "C. McCaffrey", pos: "RB", price: "108.90", pct: "-1.5" },
    { name: "D. Henry", pos: "RB", price: "76.80", pct: "-2.1" },
];

export function TickerBar({ items = PLACEHOLDER_MOVERS }: { items?: TickerItem[] }) {
    // Triple the items so the scroll loops seamlessly even on wide screens
    const tripled = [...items, ...items, ...items];

    return (
        <div
            style={{
                overflow: "hidden",
                background: "rgba(21, 24, 41, 0.6)",
                borderBottom: `1px solid ${colors.border}`,
                position: "relative",
            }}
        >
            {/* Fade edges */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 40, background: `linear-gradient(to right, ${colors.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 40, background: `linear-gradient(to left, ${colors.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />

            <div
                style={{
                    display: "inline-flex",
                    whiteSpace: "nowrap" as const,
                    padding: "10px 0",
                    animation: "tickerScroll 60s linear infinite",
                }}
            >
                {tripled.map((t, i) => {
                    const up = t.pct.startsWith("+");
                    const posCol = positionColor(t.pos);
                    return (
                        <span
                            key={i}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                margin: "0 20px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    padding: "2px 6px",
                                    borderRadius: 4,
                                    background: posCol + "22",
                                    color: posCol,
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                {t.pos}
                            </span>
                            <span style={{ fontSize: 12, fontWeight: 500, color: colors.text }}>
                                {t.name}
                            </span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, fontFamily: "var(--font-mono)" }}>
                                ${t.price}
                            </span>
                            <span
                                style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: up ? colors.accent : colors.red,
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                {up ? "▲" : "▼"} {t.pct}%
                            </span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}