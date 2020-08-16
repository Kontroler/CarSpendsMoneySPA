import { Unit } from './Unit';

export interface ExerciseSet {
  id: number;
  reps: number;
  weight: number;
  unit: Unit;
}
