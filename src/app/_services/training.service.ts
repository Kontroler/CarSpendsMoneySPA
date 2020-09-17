import { TrainingAdapter } from './../_adapters/TrainingAdapter';
import { Observable } from 'rxjs';
import { Training } from './../_models/Training';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  baseUrl = environment.apiUrl + 'trainings/';

  constructor(
    private http: HttpClient,
    private trainingAdapter: TrainingAdapter
  ) {}

  getNames(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + 'names').pipe(
      map((items: any[]) =>
        items.map((item: any) => {
          return item.name;
        })
      )
    );
  }

  getAll(): Observable<Training[]> {
    return this.http
      .get<Training[]>(this.baseUrl)
      .pipe(
        map((items: any[]) =>
          items.map((item: any) => this.trainingAdapter.adapt(item))
        )
      );
  }

  getById(id: number): Observable<Training> {
    return this.http
      .get<Training>(this.baseUrl + id)
      .pipe(map((item: any) => this.trainingAdapter.adapt(item)));
  }

  delete(trainingId: number) {
    return this.http.delete(this.baseUrl + `delete/${trainingId}`);
  }

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
    return exercises;
  }
}
