import { ExerciseAdapter } from './ExerciseAdapter';
import { Injectable } from '@angular/core';
import { Adapter } from './Adapter';
import { Training } from './../_models/Training';

@Injectable({
  providedIn: 'root'
})
export class TrainingAdapter implements Adapter<Training> {
  constructor(private exerciseAdapter: ExerciseAdapter) {}

  adapt(item: any): Training {
    return {
      id: item.id,
      name: item.name,
      date: item.date,
      exercises: item.exercises.map((exercise: any) =>
        this.exerciseAdapter.adapt(exercise)
      )
    };
  }
}
