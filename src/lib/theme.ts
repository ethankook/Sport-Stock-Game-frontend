export const colors = {
    bg: "#151829",
    surface: "#1e2235",
    surfaceLight: "#262a40",
    border: "rgba(255,255,255,0.06)",
    text: "#e2e4ed",
    textMuted: "#7f849b",
    textDim: "#4e5268",
    accent: "#3ecf8e",
    accentGlow: "rgba(62, 207, 142, 0.2)",
    accentDark: "#2ab578",
    red: "#ff6b6b",
    posQB: "#ff6b8a",
    posRB: "#36d8b7",
    posWR: "#5ba8ff",
    posTE: "#c4a0ff",
    posK: "#ffb86c",
    gold: "#f5c542",
    error: "rgba(239,68,68,0.9)",
} as const;

export function positionColor(pos: string): string {
    switch (pos) {
        case "QB": return colors.posQB;
        case "RB": return colors.posRB;
        case "WR": return colors.posWR;
        case "TE": return colors.posTE;
        case "K": return colors.posK;
        default: return colors.textMuted;
    }
}