import { map } from 'rxjs/operators';
import { Unit } from './../../_models/Unit';
import { Observable, config, Subject } from 'rxjs';
import { UnitService } from './../../_services/unit.service';
import { ExerciseSet } from './../../_models/ExerciseSet';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  Input
} from '@angular/core';

@Component({
  selector: 'app-edit-exercise-set',
  templateUrl: './edit-exercise-set.component.html',
  styleUrls: ['./edit-exercise-set.component.css']
})
export class EditExerciseSetComponent implements OnInit {
  exerciseSet: ExerciseSet;

  selectedUnit: Unit;
  reps = 0;
  weight = 0;

  units: Unit[];

  public onClose: Subject<ExerciseSet>;

  constructor(
    public bsModalRef: BsModalRef,
    private unitService: UnitService
  ) {}

  ngOnInit() {
    this.loadUnits();
    this.onClose = new Subject();
  }

  private loadUnits() {
    this.unitService.getAll().subscribe((units) => {
      this.units = units;
      if (this.exerciseSet) {
        this.reps = this.exerciseSet.reps;
        this.weight = this.exerciseSet.weight;
        this.selectedUnit = this.units.find(
          (u) => u.code === this.exerciseSet.unit.code
        );
      } else {
        this.selectedUnit = this.units[0];
      }
    });
  }

  onSaveClicked() {
    if (this.exerciseSet) {
      this.exerciseSet.reps = +this.reps;
      this.exerciseSet.weight = +this.weight;
      this.exerciseSet.unit.code = this.selectedUnit.code;
    } else {
      const set = {
        reps: this.reps,
        weight: this.weight,
        unit: this.selectedUnit
      };
      this.onClose.next(set);
    }
    this.bsModalRef.hide();
  }

  onCloseClicked() {
    this.bsModalRef.hide();
  }
}
