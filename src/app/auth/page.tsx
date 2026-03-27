"use client";

import { useState } from "react";
import { colors } from "@/lib/theme";

// ─── Input ─────────────────────────────────────────────────────────────────
function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
}: {
    label: string;
    type?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const [focused, setFocused] = useState(false);

    return (
        <div style={{ marginBottom: 16 }}>
            <label
                style={{
                    display: "block",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase" as const,
                    fontWeight: 600,
                    color: colors.textMuted,
                    fontFamily: "var(--font-mono)",
                    marginBottom: 6,
                }}
            >
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    boxSizing: "border-box" as const,
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 12,
                    fontSize: 14,
                    outline: "none",
                    background: colors.bg,
                    border: focused
                        ? "1.5px solid rgba(62,207,142,0.4)"
                        : `1.5px solid ${colors.border}`,
                    boxShadow: focused ? "0 0 0 3px rgba(62,207,142,0.08)" : "none",
                    color: colors.text,
                    transition: "all 0.2s",
                    fontFamily: "var(--font-sans)",
                }}
            />
        </div>
    );
}

// ─── Social Buttons ────────────────────────────────────────────────────────
function SocialLogins() {
    const buttonStyle: React.CSSProperties = {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "10px 0",
        borderRadius: 12,
        fontSize: 13,
        fontWeight: 500,
        background: colors.bg,
        border: `1.5px solid ${colors.border}`,
        color: colors.textMuted,
        cursor: "pointer",
        transition: "border-color 0.2s",
        fontFamily: "var(--font-sans)",
    };

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
                <div style={{ flex: 1, height: 1, background: colors.border }} />
                <span style={{ fontSize: 11, fontWeight: 500, color: colors.textDim }}>OR</span>
                <div style={{ flex: 1, height: 1, background: colors.border }} />
            </div>
            <div style={{ display: "flex", gap: 12 }}>
                <button style={buttonStyle}>
                    <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                    Google
                </button>
                <button style={buttonStyle}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-2.11 4.45-3.74 4.25z" /></svg>
                    Apple
                </button>
            </div>
        </>
    );
}

// ─── Feature Cards ─────────────────────────────────────────────────────────
function FeatureCards() {
    const features = [
        { icon: "📈", title: "Live Market", desc: "Trade NFL player stocks with your league", gradient: "linear-gradient(135deg, #1a3a4a 0%, #162230 100%)", accent: "#36d8b7" },
        { icon: "🏆", title: "Leagues", desc: "Create or join and compete with friends", gradient: "linear-gradient(135deg, #2a1f3d 0%, #1a1630 100%)", accent: "#c4a0ff" },
        { icon: "💰", title: "Portfolio", desc: "Build your roster, track gains all season", gradient: "linear-gradient(135deg, #3a2a1a 0%, #261e15 100%)", accent: "#f5c542" },
    ];

    return (
        <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            {features.map((f, i) => (
                <div
                    key={i}
                    style={{
                        flex: 1,
                        borderRadius: 16,
                        padding: 16,
                        background: f.gradient,
                        border: `1px solid ${colors.border}`,
                        cursor: "default",
                        animation: `fadeUp 0.5s ease-out ${0.7 + i * 0.1}s backwards`,
                    }}
                >
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: f.accent }}>{f.title}</div>
                    <div style={{ fontSize: 11, lineHeight: 1.6, color: colors.textMuted }}>{f.desc}</div>
                </div>
            ))}
        </div>
    );
}

// ─── Main Auth Page ────────────────────────────────────────────────────────
export default function AuthPage() {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isSignup = mode === "signup";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: wire to backend
    };

    return (
        <>
            {/* Card */}
            <div
                style={{
                    borderRadius: 16,
                    padding: 28,
                    background: colors.surface,
                    border: `1px solid ${colors.border}`,
                    boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
                }}
            >
                {/* Tabs */}
                <div
                    style={{
                        display: "flex",
                        gap: 4,
                        borderRadius: 12,
                        padding: 4,
                        marginBottom: 28,
                        background: colors.bg,
                    }}
                >
                    {(["login", "signup"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setMode(tab)}
                            style={{
                                flex: 1,
                                padding: "10px 0",
                                borderRadius: 8,
                                fontSize: 13,
                                fontWeight: 600,
                                border: "none",
                                cursor: "pointer",
                                transition: "all 0.25s",
                                background: mode === tab ? colors.surfaceLight : "transparent",
                                color: mode === tab ? colors.text : colors.textMuted,
                                boxShadow: mode === tab ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                                fontFamily: "var(--font-sans)",
                            }}
                        >
                            {tab === "login" ? "Log In" : "Sign Up"}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <>
                            <Input
                                label="Email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div style={{ display: "flex", gap: 12 }}>
                                <div style={{ flex: 1 }}>
                                    <Input
                                        label="First Name"
                                        placeholder="John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Input
                                        label="Last Name"
                                        placeholder="Doe"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Input
                                label="Username"
                                placeholder="Your trader name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Input
                                label="Confirm Password"
                                type="password"
                                placeholder="••••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </>
                    )}
                    {!isSignup && (
                        <>
                            <Input
                                label="Username / Email"
                                type="text"
                                placeholder="Username / Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    )}

                    {!isSignup && (
                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: -4, marginBottom: 16 }}>
                            <button
                                type="button"
                                style={{
                                    fontSize: 12,
                                    fontWeight: 500,
                                    color: colors.accent,
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontFamily: "var(--font-sans)",
                                }}
                            >
                                Forgot password?
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "14px 0",
                            borderRadius: 12,
                            fontSize: 14,
                            fontWeight: 700,
                            letterSpacing: "0.02em",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            marginTop: isSignup ? 8 : 0,
                            background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`,
                            boxShadow: `0 4px 16px ${colors.accentGlow}`,
                            transition: "all 0.2s",
                            fontFamily: "var(--font-sans)",
                        }}
                    >
                        {isSignup ? "Create Account" : "Log In"}
                    </button>
                </form>

                <SocialLogins />
            </div>

            <FeatureCards />
        </>
    );
}