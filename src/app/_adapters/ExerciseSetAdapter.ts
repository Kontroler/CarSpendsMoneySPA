import { UnitAdapter } from './UnitAdapter';
import { Injectable } from '@angular/core';
import { ExerciseSet } from '../_models/ExerciseSet';
import { Adapter } from './Adapter';

@Injectable({
  providedIn: 'root'
})
export class ExerciseSetAdapter implements Adapter<ExerciseSet> {
  constructor(private unitAdapter: UnitAdapter) {}

  adapt(item: any): ExerciseSet {
    return {
      id: item.id,
      reps: item.reps,
      weight: item.weight,
      unit: this.unitAdapter.adapt(item.unit)
    };
  }
}
