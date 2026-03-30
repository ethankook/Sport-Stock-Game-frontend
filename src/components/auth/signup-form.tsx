"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { colors } from "@/lib/theme";
import { useAuth } from "@/lib/auth/auth-context";
import { AuthInput } from "@/components/auth/auth-input";
import { AxiosError } from "axios";

const signupSchema = z
    .object({
        email: z.email("Invalid email address"),
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        username: z.string().min(3, "Username must be at least 3 characters"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
    const { register: registerUser } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    async function onSubmit(data: SignupFormData) {
        setIsSubmitting(true);
        try {
            await registerUser({
                email: data.email,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password,
            });
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 409) {
                toast.error("Email or username already in use.");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
            label="Email"
    type="email"
    placeholder="you@example.com"
    error={errors.email?.message}
    {...register("email")}
    />
    <div style={{ display: "flex", gap: 12 }}>
    <div style={{ flex: 1 }}>
    <AuthInput
        label="First Name"
    placeholder="John"
    error={errors.firstName?.message}
    {...register("firstName")}
    />
    </div>
    <div style={{ flex: 1 }}>
    <AuthInput
        label="Last Name"
    placeholder="Doe"
    error={errors.lastName?.message}
    {...register("lastName")}
    />
    </div>
    </div>
    <AuthInput
    label="Username"
    placeholder="Your trader name"
    error={errors.username?.message}
    {...register("username")}
    />
    <AuthInput
    label="Password"
    type="password"
    placeholder="••••••••••"
    error={errors.password?.message}
    {...register("password")}
    />
    <AuthInput
    label="Confirm Password"
    type="password"
    placeholder="••••••••••"
    error={errors.confirmPassword?.message}
    {...register("confirmPassword")}
    />

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
            marginTop: 8,
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`,
            boxShadow: `0 4px 16px ${colors.accentGlow}`,
            transition: "all 0.2s",
            fontFamily: "var(--font-sans)",
    }}
>
    {isSubmitting ? "Creating account..." : "Create Account"}
    </button>
    </form>
);
}