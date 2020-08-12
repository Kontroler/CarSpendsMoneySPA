import { Exercise } from './Exercise';
export interface Training {
  name: string;
  date: Date;
  exercises: Exercise[];
}
