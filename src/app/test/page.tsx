"use client";
import {programApi} from '@/utils/api';
import {useEffect, useState} from "react";
import { Program } from '@/utils/types';

export default function Test() {
    const [programs, setPrograms] = useState<Program[]>([])
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await programApi.getPrograms();
                console.log('Données récupérées :', data);
                setPrograms(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        }
        fetchData().then(r => r);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Liste des Programmes</h1>
            {programs.length === 0 ? (
                <p>Chargement...</p>
            ) : (
                <ul className="space-y-4">
                    {programs.map((program) => (
                        <li key={program.id} className="p-4 border rounded-lg shadow">
                            <h2 className="text-lg font-semibold">{program.name}</h2>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}