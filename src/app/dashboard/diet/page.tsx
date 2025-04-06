"use client"
import DietProgram from "@/components/DietProgram/DietProgram";
import {SWRConfig} from "swr";
import {swrConfig} from "@/utils/swrCache";

export default function plan() {
    return (
        <SWRConfig value={swrConfig}>
        <DietProgram />
        </SWRConfig>
    )
}

