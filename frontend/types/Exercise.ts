import { type Workout } from './Workout';
import { type Stat } from './Stat';


export interface Exercise {
  attributes: Record<string, any> | undefined;
  id: number;
  documentId: string;
  muscle: string;
  name: string;
  sets: string;
  reps: number;
  weight: number;
  rest: number;
  rank: number;
  workout: Workout; 
  stats: Stat[];
}
  