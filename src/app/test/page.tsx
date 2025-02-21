"use client";

import useSWR from "swr";
import {planApi, programApi, userApi} from "@/utils/api";
import {getUserId} from "@/utils/cookieDecode";


const fetcher = async () => await userApi.getUserById(1);
getUserId();
export default function Test() {
    const { data: programs, error } = useSWR("programs", fetcher, {
        suspense: true,
    });
    console.log(programs);

    if (error) return <p>Erreur lors du chargement des données.</p>;
    if (!programs) return <p>Chargement...</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Liste des Programmes</h1>
            <ul className="space-y-4">

            </ul>

        </div>
    );
}
