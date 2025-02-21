"use client"
import WorkoutProgram from "@/components/Program/WorkoutProgram";

import Cookies from 'js-cookie';
import {getUserId} from "@/utils/cookieDecode";


const userId = getUserId();
console.log('ID utilisateur:', getUserId());


export default function plan() {
    return (
        <WorkoutProgram />
    )
}

