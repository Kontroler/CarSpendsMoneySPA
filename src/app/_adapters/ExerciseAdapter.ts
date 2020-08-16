import { ExerciseSetAdapter } from './ExerciseSetAdapter';
import { Adapter } from './Adapter';
import { Injectable } from '@angular/core';
import { Exercise } from '../_models/Exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseAdapter implements Adapter<Exercise> {
  constructor(private exerciseSetAdapter: ExerciseSetAdapter) {}

  adapt(item: any): Exercise {
    return {
      id: item.id,
      name: item.exercise.name,
      sets: item.sets.map((set: any) => this.exerciseSetAdapter.adapt(set))
    };
  }
}
