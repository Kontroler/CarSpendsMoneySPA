import { UnitAdapter } from './../_adapters/UnitAdapter';
import { map } from 'rxjs/operators';
import { Unit } from './../_models/Unit';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  baseUrl = environment.apiUrl + 'units/';

  constructor(private http: HttpClient, private adapter: UnitAdapter) {}

  getAll(): Observable<Unit[]> {
    return this.http
      .get(this.baseUrl)
      .pipe(
        map((items: any[]) => items.map((item) => this.adapter.adapt(item)))
      );
  }
}
