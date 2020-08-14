import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  baseUrl = environment.apiUrl + 'exercises/';

  constructor(private http: HttpClient) {}

  getNames(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + 'names').pipe(
      map((items: any[]) =>
        items.map((item: any) => {
          return item.name;
        })
      )
    );
  }
}
