"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            router.replace(isAuthenticated ? "/dashboard" : "/auth");
        }
    }, [isAuthenticated, isLoading, router]);

    return null;
}
