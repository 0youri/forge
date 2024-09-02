import type { Exercise } from "./Exercise";

export interface Stat {
    id: number,
    date: Date,
    reps: string,
    weight: string,
    exercise: Exercise
    
}