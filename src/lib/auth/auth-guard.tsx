"use client"

import {useAuth} from "@/lib/auth/auth-context";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export function AuthGuard({children}: {children: React.ReactNode}) {
    const {isAuthenticated, isLoading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            router.replace("/auth");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="size-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;


}