export type Program = {
    id: number;
    name: string;
    exercise: Exercise[];
}

export type Exercise = {
    id: number;
    name: string;
    description: string;
}