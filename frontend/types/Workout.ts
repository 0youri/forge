// types/Workout.ts

import { type User } from './User';
import { type Exercise } from './Exercise';

export interface Workout {
  id: number;
  documentId: string;
  name: string;
  type: string;
  rank: number;
  exercises: Exercise[];
  user: User;
}
