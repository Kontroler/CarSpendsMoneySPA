import { Unit } from './../_models/Unit';
import { Exercise } from './../_models/Exercise';
import { Training } from './../_models/Training';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  baseUrl = environment.apiUrl + 'trainings/';

  constructor(private http: HttpClient) {}

  save(training: Training) {
    return this.http.post(this.baseUrl, {
      Name: training.name,
      Date: training.date,
      Exercises: this.getExercisesToSave(training)
    });
  }

  private getExercisesToSave(training: Training) {
    const exercises = [];
    training.exercises.forEach((e) => {
      const sets = [];
      e.sets.forEach((s) => {
        sets.push({
          Reps: s.reps,
          Weight: s.weight,
          Unit: s.unit.code
        });
      });
      exercises.push({
        Exercise: {
          Name: e.name
        },
        Sets: sets
      });
    });
    console.log(exercises);
    return exercises;
  }
}
