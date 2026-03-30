import axios from 'axios';

const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

let accessToken: string | null = null;

export function getAccessToken() : string | null {
    return accessToken;
}

export function setAccessToken(token: string | null) : void {
    accessToken = token;
}

const api = axios.create({
    baseURL: AUTH_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) : void {
    failedQueue.forEach(({resolve, reject}) => {
        if (token) {
            resolve(token);
        }
        else {
            reject(error);
        }
    })

    failedQueue = [];
}

let onRefreshFailure: (() => void) | null = null;

export function setOnRefreshFailure(callback: () => void) : void {
    onRefreshFailure = callback;
}

api.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        const responseData = error.response?.data;
        if (typeof responseData === "string" && responseData === "INVALID_TOKEN") {
            onRefreshFailure?.();
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({resolve, reject});
            }).then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return api(originalRequest);
            });
        }
        originalRequest._retry = true;
        isRefreshing = true;

        const refreshTokenValue = localStorage.getItem("refreshToken");
        if (!refreshTokenValue) {
            isRefreshing = false;
            onRefreshFailure?.();
            return Promise.reject(error);
        }

        try {
            const response = await axios.post(`${AUTH_API_URL}/api/refresh`, {
                refreshToken: refreshTokenValue,
            });
            const {accessToken: newAccessToken} = response.data;
            setAccessToken(newAccessToken);
            processQueue(null, newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);
            onRefreshFailure?.();
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);


export default api;