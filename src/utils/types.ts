export type Exercise = {
    id: number;
    name: string;
    description: string;
    rest_time: number;
    difficulty: string;
};

export type Program = {
    id: number;
    name: string;
    exercises: Exercise[];
    day: string;
};

export type Plan = {
    id: number;
    name: string;
    programs: Program[];
};
