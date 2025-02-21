import axios from "axios";
import { getAccessToken, setAccessToken, removeAccessToken } from "./auth";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                const refreshResponse = await axios.post("/api/auth/refresh");

                const newToken = refreshResponse.data.token;
                setAccessToken(newToken);

                error.config.headers.Authorization = `Bearer ${newToken}`;
                return axios(error.config);
            } catch (refreshError) {
                console.error("Impossible de rafraîchir le token, déconnexion...");
                removeAccessToken();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
