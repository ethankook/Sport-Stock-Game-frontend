"use client";

import { InputHTMLAttributes, ButtonHTMLAttributes } from "react";
import { colors } from "@/lib/theme";

// ─── Input ─────────────────────────────────────────────────────────────────

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function Input({ label, ...props }: InputProps) {
    return (
        <div className="space-y-1.5">
            <label
                className="block text-[11px] tracking-[0.08em] uppercase font-semibold"
                style={{ color: colors.textMuted, fontFamily: "var(--font-mono)" }}
            >
                {label}
            </label>
            <input
                {...props}
                className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all duration-200"
                style={{
                    background: colors.bg,
                    border: `1.5px solid ${colors.border}`,
                    color: colors.text,
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = "rgba(62,207,142,0.4)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(62,207,142,0.08)";
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = colors.border;
                    e.target.style.boxShadow = "none";
                    props.onBlur?.(e);
                }}
            />
        </div>
    );
}

// ─── Button ────────────────────────────────────────────────────────────────

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    fullWidth?: boolean;
}

export function Button({
    variant = "primary",
    fullWidth = false,
    children,
    className = "",
    ...props
}: ButtonProps) {
    const base =
        "py-3.5 rounded-xl text-[14px] font-bold tracking-wide transition-all duration-200 active:scale-[0.98]";
    const width = fullWidth ? "w-full" : "";

    const style =
        variant === "primary"
            ? {
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`,
                boxShadow: `0 4px 16px ${colors.accentGlow}`,
                color: "white",
            }
            : {
                background: colors.bg,
                border: `1.5px solid ${colors.border}`,
                color: colors.textMuted,
            };

    return (
        <button
            className={`${base} ${width} ${variant === "primary" ? "hover:brightness-110" : ""} ${className}`}
            style={style}
            {...props}
        >
            {children}
        </button>
    );
}