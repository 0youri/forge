import type { Exercise } from "./Exercise";

export interface Stat {
    id: number,
    documentId: string,
    date: Date,
    reps: string,
    weight: string,
    exercise: Exercise
}