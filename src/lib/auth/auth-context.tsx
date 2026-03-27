"use client"

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser, refreshAccessToken, type RegisterData, } from "@/lib/api/auth";
import { setAccessToken, setOnRefreshFailure } from "@/lib/api/axios";

interface User {
    email: string;
    userId: number;
}

interface AuthContextValue {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (loginId: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function decodeJwtPayload(token: string): User {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    return { email: payload.sub, userId: payload.userId };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const logout = useCallback(() => {
        setAccessToken(null);
        localStorage.removeItem("refreshToken");
        setUser(null);
        router.replace("/login");
    }, [router]);


    useEffect(() => {
        setOnRefreshFailure(logout);
        }, [logout]
    );

    useEffect(() => {
        async function initAuth() {
            const storedRefreshToken = localStorage.getItem("refreshToken");

            if (storedRefreshToken) {
                try {
                    const response = await refreshAccessToken(storedRefreshToken);
                    setAccessToken(response.accessToken);
                    setUser(decodeJwtPayload(response.accessToken));
                } catch {
                    localStorage.removeItem("refreshToken");
                    setUser(null);
                    setAccessToken(null);
                }
            }

            setIsLoading(false);
        }

        initAuth();
    }, []);

    const login = useCallback(
        async (loginId: string, password: string) => {
            const tokens = await loginUser(loginId, password);
            setAccessToken(tokens.accessToken);
            localStorage.setItem("refreshToken", tokens.refreshToken);
            setUser(decodeJwtPayload(tokens.accessToken));
            router.replace("/dashboard");
        }, [router]
    );

    const register = useCallback(
        async (data: RegisterData) => {
            await registerUser(data);
            await login(data.email, data.password);
        }, [login]
    );

    const value = useMemo<AuthContextValue>(() => ({
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
    }),
        [user, isLoading, login, register, logout]);

    return <AuthContext value={value}>{children}</AuthContext>
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}