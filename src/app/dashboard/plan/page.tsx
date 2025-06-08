"use client"
import WorkoutProgram from "@/components/Program/WorkoutProgram";
import {SWRConfig} from "swr";
import {swrConfig} from "@/utils/swrCache";

export default function plan() {
    return (
        <WorkoutProgram />
    )
}

