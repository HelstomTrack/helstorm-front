"use client"
import WorkoutProgram from "@/components/Program/WorkoutProgram";

import Cookies from 'js-cookie';
import jwt, {JwtPayload} from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
    id: number;
}

const getUserId = () => {
    const token = Cookies.get('token');
    if (!token) return null;
    try {
        const decoded = jwt.decode(token) as CustomJwtPayload;
        return decoded.id;
    } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        return null;
    }
};

const userId = getUserId();
console.log('ID utilisateur:', getUserId());

export default function plan() {
    return (
        <WorkoutProgram />
    )
}

