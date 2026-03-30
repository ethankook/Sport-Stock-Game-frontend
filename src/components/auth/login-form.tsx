"use client"

import {z} from "zod";
import {useAuth} from "@/lib/auth/auth-context";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {AxiosError} from "axios";
import {toast} from "sonner";
import {AuthInput} from "@/components/auth/auth-input";
import {colors} from "@/lib/theme";
import type {AuthErrorResponse} from "@/lib/api/auth";

const loginSchema = z.object({
    login: z.string().min(1, { message: "Email or username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
    const { login } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data: LoginFormData) {
        setIsSubmitting(true);
        try {
            await login(data.login, data.password);
        } catch (error) {
            if (error instanceof AxiosError) {
                const response = error.response?.data as AuthErrorResponse | undefined;

                if (response?.code === "INVALID_CREDENTIALS" || error.response?.status === 401) {
                    const message = response?.message ?? "Incorrect username/email or password.";
                    setError("login", { type: "server", message });
                    toast.error(message);
                    return;
                }
            }

            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <AuthInput
                label="Username / Email"
                type="text"
                placeholder="Username / Email"
                error={errors.login?.message}
                {...register("login")}
            />
            <AuthInput
                label="Password"
                type="password"
                placeholder="••••••••••"
                error={errors.password?.message}
                {...register("password")}
            />

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

            <button
                type="submit"
                disabled={isSubmitting}
                style={{
                    width: "100%",
                    padding: "14px 0",
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    color: "white",
                    border: "none",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`,
                    boxShadow: `0 4px 16px ${colors.accentGlow}`,
                    transition: "all 0.2s",
                    fontFamily: "var(--font-sans)",
                }}
            >
                {isSubmitting ? "Logging in..." : "Log In"}
            </button>
        </form>
    );
}
