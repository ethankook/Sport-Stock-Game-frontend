import api from "./axios"

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface RegisterData {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export async function loginUser(login: string, password: string) : Promise<TokenResponse> {
    const response = await api.post("/auth/login", {
        login,
        password
    })
    return response.data
}

export async function registerUser(data: RegisterData) : Promise<string> {
    const response = await api.post("/auth/register", data)
    return response.data
}

export async function refreshAccessToken(refreshToken: string) : Promise<TokenResponse> {
    const response = await api.post<TokenResponse>("/auth/refresh", {
        refreshToken
    });
    return response.data
}