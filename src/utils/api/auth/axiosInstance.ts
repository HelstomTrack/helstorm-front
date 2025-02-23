import axios from 'axios';
import { getAccessToken, removeTokens } from './auth';
import {refreshAccessToken}  from '../../api';
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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
            const newToken = await refreshAccessToken();
            if (newToken) {
                error.config.headers.Authorization = `Bearer ${newToken}`;
                return axios(error.config);
            }
            removeTokens();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
