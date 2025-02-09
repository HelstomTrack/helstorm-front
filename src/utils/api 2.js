const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export const programApi = {
    async getPrograms() {
        const response = await fetch(`${API}/program`, {
        cache: 'force-cache'
        });

        return response.json();
    },
    async getProgramById(id) {
        const response = await fetch(`${API_BASE_URL}/programs/${id}`);
        return response.json();
    },
    async createProgram(program) {
        const response = await fetch(`${API_BASE_URL}/programs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(program),
        });
        return response.json();
    },
    async updateProgram(program) {
        const response = await fetch(`${API_BASE_URL}/programs/${program.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(program),
        });
        return response.json();
    },
    async deleteProgram(id) {
        await fetch(`${API_BASE_URL}/programs/${id}`, {
            method: 'DELETE',
        });
    },
};
