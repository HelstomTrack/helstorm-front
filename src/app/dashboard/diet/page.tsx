"use client";

import { SWRConfig } from "swr";
import DietProgram from "@/components/DietProgram/DietProgram";

export default function Plan() {
    // ✅ Ne s'exécute que dans le navigateur
    const localStorageProvider = () => {
        const map = new Map<string, any>();

        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("app-cache");
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    parsed.forEach(([key, value]: [string, any]) => map.set(key, value));
                } catch (e) {
                    console.error("Invalid cache in localStorage", e);
                }
            }

            window.addEventListener("beforeunload", () => {
                const appCache = JSON.stringify(Array.from(map.entries()));
                localStorage.setItem("app-cache", appCache);
            });
        }

        return map;
    };

    return (
        <SWRConfig value={{ provider: localStorageProvider }}>
            <DietProgram />
        </SWRConfig>
    );
}
