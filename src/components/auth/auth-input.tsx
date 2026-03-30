"use client"

import {forwardRef, useState} from "react";
import {colors} from "@/lib/theme";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}


const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
    ({ label, error, ...props }, ref) => {
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
                    ref={ref}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => {
                        setFocused(false);
                        props.onBlur?.(e);
                    }}
                    style={{
                        boxSizing: "border-box" as const,
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 12,
                        fontSize: 14,
                        outline: "none",
                        background: colors.bg,
                        border: error
                            ? `1.5px solid ${colors.red}`
                            : focused
                                ? "1.5px solid rgba(62,207,142,0.4)"
                                : `1.5px solid ${colors.border}`,
                        boxShadow: error
                            ? `0 0 0 3px rgba(255,107,107,0.08)`
                            : focused
                                ? "0 0 0 3px rgba(62,207,142,0.08)"
                                : "none",
                        color: colors.text,
                        transition: "all 0.2s",
                        fontFamily: "var(--font-sans)",
                    }}
                    {...props}
                />
                {error && (
                    <p
                        style={{
                            fontSize: 12,
                            color: colors.red,
                            marginTop: 4,
                            marginBottom: 0,
                        }}
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

AuthInput.displayName = "AuthInput";

export {AuthInput}