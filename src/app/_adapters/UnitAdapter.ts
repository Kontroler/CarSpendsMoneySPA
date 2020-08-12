import { Injectable } from '@angular/core';
import { Unit } from './../_models/Unit';
import { Adapter } from './Adapter';

@Injectable({
  providedIn: 'root'
})
export class UnitAdapter implements Adapter<Unit> {
  adapt(item: any): Unit {
    return {
      code: item.code
    };
  }
}
