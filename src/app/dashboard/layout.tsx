"use client";

import { useState } from "react";
import { colors } from "@/lib/theme";
import { TickerBar } from "@/components/layout/TickerBar";

// ─── Shared styles ─────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
    fontWeight: 600, color: colors.textMuted, fontFamily: "var(--font-mono)", marginBottom: 6,
};
const inputStyle: React.CSSProperties = {
    boxSizing: "border-box", width: "100%", padding: "12px 16px", borderRadius: 12, fontSize: 14,
    outline: "none", background: colors.bg, border: `1.5px solid ${colors.border}`, color: colors.text, fontFamily: "var(--font-sans)",
};
const overlayStyle: React.CSSProperties = {
    position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center",
    justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
};
const modalStyle: React.CSSProperties = {
    width: "100%", maxWidth: 460, borderRadius: 16, padding: 28, background: colors.surface,
    border: `1px solid ${colors.border}`, boxShadow: "0 16px 48px rgba(0,0,0,0.4)", animation: "fadeUp 0.25s ease-out",
};
const btnCancel: React.CSSProperties = {
    flex: 1, padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 600,
    background: colors.bg, border: `1.5px solid ${colors.border}`, color: colors.textMuted,
    cursor: "pointer", fontFamily: "var(--font-sans)",
};
const btnPrimary: React.CSSProperties = {
    flex: 1, padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 700,
    background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`,
    boxShadow: `0 4px 16px ${colors.accentGlow}`, border: "none", color: "white",
    cursor: "pointer", fontFamily: "var(--font-sans)",
};

// ─── Tab toggle (reused in both modals) ────────────────────────────────────
function TabToggle({ tabs, active, onChange }: { tabs: { key: string; label: string }[]; active: string; onChange: (key: string) => void }) {
    return (
        <div style={{ display: "flex", gap: 4, borderRadius: 10, padding: 4, marginBottom: 24, background: colors.bg }}>
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onChange(tab.key)}
                    style={{
                        flex: 1, padding: "9px 0", borderRadius: 8, fontSize: 13, fontWeight: 600,
                        border: "none", cursor: "pointer", transition: "all 0.2s", fontFamily: "var(--font-sans)",
                        background: active === tab.key ? colors.surfaceLight : "transparent",
                        color: active === tab.key ? colors.text : colors.textMuted,
                        boxShadow: active === tab.key ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                    }}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

// ─── Create League Modal ───────────────────────────────────────────────────
function CreateModal({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState("");
    const [maxMembers, setMaxMembers] = useState("10");
    const [visibility, setVisibility] = useState<"public" | "private">("public");

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: colors.text, margin: "0 0 24px 0" }}>Create League</h2>

                <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>League Name</label>
                    <input placeholder="e.g. The Stock Exchange" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Max Members</label>
                    <input type="number" min="2" max="32" value={maxMembers} onChange={(e) => setMaxMembers(e.target.value)} style={inputStyle} />
                </div>

                {/* Visibility toggle */}
                <div style={{ marginBottom: 24 }}>
                    <label style={{ ...labelStyle, marginBottom: 10 }}>Visibility</label>
                    <div style={{ display: "flex", gap: 10 }}>
                        {(["public", "private"] as const).map((opt) => {
                            const selected = visibility === opt;
                            return (
                                <button
                                    key={opt}
                                    onClick={() => setVisibility(opt)}
                                    style={{
                                        flex: 1,
                                        padding: "14px 16px",
                                        borderRadius: 12,
                                        border: selected
                                            ? `1.5px solid ${opt === "public" ? colors.accent : colors.posTE}`
                                            : `1.5px solid ${colors.border}`,
                                        background: selected
                                            ? (opt === "public" ? "rgba(62,207,142,0.08)" : "rgba(196,160,255,0.08)")
                                            : colors.bg,
                                        cursor: "pointer",
                                        textAlign: "left" as const,
                                        transition: "all 0.2s",
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                        <span style={{ fontSize: 16 }}>{opt === "public" ? "🌐" : "🔒"}</span>
                                        <span style={{
                                            fontSize: 13, fontWeight: 700, textTransform: "capitalize" as const,
                                            color: selected ? (opt === "public" ? colors.accent : colors.posTE) : colors.textMuted,
                                        }}>
                                            {opt}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: 11, color: colors.textDim, lineHeight: 1.4 }}>
                                        {opt === "public" ? "Anyone can find and join" : "Invite code required to join"}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={onClose} style={btnCancel}>Cancel</button>
                    <button onClick={() => onClose()} style={btnPrimary}>Create</button>
                </div>
            </div>
        </div>
    );
}

// ─── Mock public leagues for the join modal ────────────────────────────────
const MOCK_PUBLIC_LEAGUES = [
    { id: "p1", name: "Open Market League", members: 7, maxMembers: 12, season: "2025" },
    { id: "p2", name: "Reddit Stock Traders", members: 15, maxMembers: 20, season: "2025" },
    { id: "p3", name: "Casual Ballers", members: 3, maxMembers: 8, season: "2025" },
    { id: "p4", name: "NFL Street Bets", members: 9, maxMembers: 10, season: "2025" },
];

// ─── Join League Modal ─────────────────────────────────────────────────────
function JoinModal({ onClose }: { onClose: () => void }) {
    const [tab, setTab] = useState<"public" | "private">("public");
    const [code, setCode] = useState("");
    const [search, setSearch] = useState("");

    const filtered = MOCK_PUBLIC_LEAGUES.filter((l) =>
        l.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={{ ...modalStyle, maxWidth: 500 }} onClick={(e) => e.stopPropagation()}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: colors.text, margin: "0 0 20px 0" }}>Join League</h2>

                <TabToggle
                    tabs={[
                        { key: "public", label: "🌐  Public" },
                        { key: "private", label: "🔒  Private" },
                    ]}
                    active={tab}
                    onChange={(k) => setTab(k as "public" | "private")}
                />

                {tab === "public" ? (
                    <>
                        {/* Search */}
                        <input
                            placeholder="Search public leagues..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ ...inputStyle, marginBottom: 16 }}
                        />

                        {/* League list */}
                        <div style={{ maxHeight: 280, overflowY: "auto" as const, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                            {filtered.length > 0 ? filtered.map((league) => (
                                <div
                                    key={league.id}
                                    style={{
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                        padding: "14px 16px", borderRadius: 12, background: colors.bg,
                                        border: `1px solid ${colors.border}`, cursor: "pointer", transition: "all 0.15s",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; }}
                                >
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: colors.text, marginBottom: 4 }}>
                                            {league.name}
                                        </div>
                                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                            <span style={{ fontSize: 11, color: colors.textMuted, fontFamily: "var(--font-mono)" }}>
                                                {league.members}/{league.maxMembers} members
                                            </span>
                                            <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 6, background: "rgba(62,207,142,0.1)", color: colors.accent, fontFamily: "var(--font-mono)" }}>
                                                {league.season}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // TODO: wire to backend
                                            onClose();
                                        }}
                                        style={{
                                            padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                                            background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`,
                                            border: "none", color: "white", cursor: "pointer", fontFamily: "var(--font-sans)",
                                            whiteSpace: "nowrap" as const,
                                        }}
                                    >
                                        Join
                                    </button>
                                </div>
                            )) : (
                                <div style={{ textAlign: "center" as const, padding: "32px 0", color: colors.textDim, fontSize: 13 }}>
                                    No leagues found
                                </div>
                            )}
                        </div>

                        {/* Cancel */}
                        <div style={{ marginTop: 16 }}>
                            <button onClick={onClose} style={{ ...btnCancel, width: "100%" }}>Cancel</button>
                        </div>
                    </>
                ) : (
                    <>
                        <p style={{ fontSize: 13, color: colors.textMuted, margin: "0 0 20px 0" }}>
                            Enter the invite code from your league commissioner.
                        </p>
                        <div style={{ marginBottom: 24 }}>
                            <label style={labelStyle}>Invite Code</label>
                            <input
                                placeholder="e.g. ABC-123-XYZ"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                style={{ ...inputStyle, fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textAlign: "center" as const }}
                            />
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                            <button onClick={onClose} style={btnCancel}>Cancel</button>
                            <button onClick={() => onClose()} style={btnPrimary}>Join</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// ─── Layout ────────────────────────────────────────────────────────────────
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [showCreate, setShowCreate] = useState(false);
    const [showJoin, setShowJoin] = useState(false);

    return (
        <div style={{ minHeight: "100vh", background: colors.bg, fontFamily: "var(--font-sans)" }}>
            {/* Top bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", borderBottom: `1px solid ${colors.border}`, background: colors.surface }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`, boxShadow: `0 2px 12px ${colors.accentGlow}` }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                            <path d="M3 17L9 9L13 13L21 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 4H21V8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span style={{ fontSize: 17, fontWeight: 700, color: colors.text, letterSpacing: "-0.02em" }}>SportStocks</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setShowCreate(true)} style={{ padding: "7px 18px", borderRadius: 9, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`, boxShadow: `0 2px 12px ${colors.accentGlow}`, color: "white", fontFamily: "var(--font-sans)" }}>Create</button>
                    <button onClick={() => setShowJoin(true)} style={{ padding: "7px 18px", borderRadius: 9, fontSize: 13, fontWeight: 600, background: colors.surfaceLight, border: `1.5px solid ${colors.border}`, color: colors.text, cursor: "pointer", fontFamily: "var(--font-sans)" }}>Join</button>
                </div>
            </div>

            <TickerBar />

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px" }}>
                {children}
            </div>

            {showCreate && <CreateModal onClose={() => setShowCreate(false)} />}
            {showJoin && <JoinModal onClose={() => setShowJoin(false)} />}
        </div>
    );
}