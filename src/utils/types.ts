
export type Food = {
    name: string;
};


type Exercise = { nom: string; series?: number; repetitions?: string | number; repos?: string; conseils?: string }
type SportDay = { jour: string; type_seance?: string; duree?: string | number; intensite?: string; zones_ciblees?: string[]; exercices?: Exercise[] }
export type Meal = { type: string; description: string; calories?: number }
type FoodDay = { jour: string; repas?: Meal[] }
type ProgramDTO = { programme_sportif?: SportDay[]; programme_alimentaire?: FoodDay[]; conseils?: string[] }
