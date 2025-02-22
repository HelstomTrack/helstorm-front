import {getToken} from "@/utils/cookieDecode";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const programApi = {
    async getPrograms() {
        const response = await fetch(`${API_BASE_URL}/program`);
        return response.json();
    },
    async getProgramById(id) {
        const response = await fetch(`${API_BASE_URL}//${id}`);
        return response.json();
    },
};

export const userApi = {
    async getUserById(id) {
        const response = await fetch(`${API_BASE_URL}/api/user/${id}`,{
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        });

        return response.json();
    },
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
}
