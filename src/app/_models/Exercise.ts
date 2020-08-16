import { ExerciseSet } from './ExerciseSet';

export interface Exercise {
  id: number;
  name: string;
  sets: ExerciseSet[];
}
