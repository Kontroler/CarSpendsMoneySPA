import { Exercise } from './Exercise';

export interface Training {
  id: number;
  name: string;
  date: Date;
  exercises: Exercise[];
}
