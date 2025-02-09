"use client";

import useSWR from "swr";
import { programApi } from "@/utils/api";
import {Program} from "@/utils/types";

const fetcher = async () => await programApi.getPrograms();

export default function Test() {
    const { data: programs, error } = useSWR("programs", fetcher, {
        suspense: true,
    });

    if (error) return <p>Erreur lors du chargement des données.</p>;
    if (!programs) return <p>Chargement...</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Liste des Programmes</h1>
            <ul className="space-y-4">
                {programs?.map((program: Program) => (
                    <li key={program.id} className="p-4 border rounded-lg shadow">
                        <h2 className="text-lg font-semibold">{program.name}</h2>
                    </li>
                ))}
            </ul>

        </div>
    );
}
