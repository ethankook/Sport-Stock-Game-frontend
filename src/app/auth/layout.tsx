import { colors } from "@/lib/theme";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                background: colors.bg,
                fontFamily: "var(--font-sans)",
            }}
        >
            {/* Background glows */}
            <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" as const }}>
                <div
                    style={{
                        position: "absolute",
                        width: 800,
                        height: 800,
                        borderRadius: "50%",
                        top: -200,
                        right: -200,
                        background: "radial-gradient(circle, rgba(62, 207, 142, 0.04) 0%, transparent 70%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        width: 600,
                        height: 600,
                        borderRadius: "50%",
                        bottom: -100,
                        left: -100,
                        background: "radial-gradient(circle, rgba(62, 207, 142, 0.03) 0%, transparent 70%)",
                    }}
                />
            </div>

            {/* Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    width: "100%",
                    maxWidth: 440,
                    margin: "0 16px",
                    padding: "48px 0",
                    animation: "fadeUp 0.5s ease-out",
                }}
            >
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
                    <div
                        style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`,
                            boxShadow: `0 4px 20px ${colors.accentGlow}`,
                        }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M3 17L9 9L13 13L21 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 4H21V8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: colors.text, margin: 0 }}>
                            SportStocks
                        </h1>
                        <p style={{ fontSize: 12, marginTop: -2, color: colors.textMuted, margin: 0 }}>
                            The NFL stock market game
                        </p>
                    </div>
                </div>

                {children}
            </div>
        </div>
    );
}