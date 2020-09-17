import { Injectable } from '@angular/core';
import { ExerciseSet } from '../_models/ExerciseSet';
import { Adapter } from './Adapter';

@Injectable({
  providedIn: 'root'
})
export class ExerciseSetAdapter implements Adapter<ExerciseSet> {
  adapt(item: any): ExerciseSet {
    return {
      id: item.id,
      reps: item.reps,
      weight: item.weight,
      unit: { code: item.unit }
    };
  }
}
