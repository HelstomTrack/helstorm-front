import type { SWRConfiguration } from "swr";

export const localStorageProvider = (): Map<string, any> => {
    // Restore cache from localStorage
    const stored = localStorage.getItem("app-cache");
    const map = new Map<string, any>(stored ? JSON.parse(stored) : []);

    window.addEventListener("beforeunload", () => {
        const appCache = JSON.stringify(Array.from(map.entries()));
        localStorage.setItem("app-cache", appCache);
    });

    return map;
};

export const swrConfig: SWRConfiguration = {
    provider: localStorageProvider,
};
