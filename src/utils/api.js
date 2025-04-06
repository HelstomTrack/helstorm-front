import {getAccessToken, getRefreshToken, removeTokens, setAccessToken} from "@/utils/api/auth/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const programApi = {
    async getPrograms() {
        const response = await fetch(`${API_BASE_URL}/program`);
        return response.json();
    },
    async getProgramById(id) {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        return response.json();
    },
};

export const userApi = {
    async getUserById(id) {
        const token = getAccessToken();

        // Redirection immédiate si aucun token n'est disponible
        if (!token) {
            window.location.href = "/login";
            return null;
        }

        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            // Si le token est expiré, tenter de le rafraîchir
            if (response.status === 401) {
                const refreshedToken = await refreshAccessToken();

                if (!refreshedToken) {
                    window.location.href = "/login";
                    return null;
                }

                response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${id}`, {
                    headers: {
                        authorization: `Bearer ${refreshedToken}`
                    }
                });
            }

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
            return null;
        }
    }
};

export async function refreshAccessToken() {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        console.error('Aucun refresh token disponible');
        return null;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
            throw new Error('Erreur lors du rafraîchissement du token');
        }

        const data = await response.json();
        setAccessToken(data.token);
        return data.token;
    } catch (error) {
        console.error('Erreur lors du rafraîchissement du token :', error);
        removeTokens();
        window.location.href = '/login';
        return null;
    }
}


export const planApi = {
    async getPlans() {
        const response = await fetch(`${API_BASE_URL}/plan`);
        return response.json();
    },
    async getPlanById(id) {
        const response = await fetch(`${API_BASE_URL}/program/user/${id}`);
        return response.json();
    },
    async getDietById(id) {
        const token = getAccessToken();
        const response = await fetch(`${API_BASE_URL}/api/diet-day/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        });

        return response.json();
    },
}
