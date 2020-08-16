import { FormBuilder, Validators } from '@angular/forms';
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

  units: Unit[];

  public onClose: Subject<ExerciseSet>;

  constructor(
    public bsModalRef: BsModalRef,
    private unitService: UnitService,
    private fb: FormBuilder
  ) {}

  formGroup = this.fb.group({
    selectedUnit: ['', [Validators.required]],
    reps: ['', [Validators.required]],
    weight: ['', [Validators.required]]
  });

  ngOnInit() {
    this.loadUnits();
    this.onClose = new Subject();
  }

  private loadUnits() {
    this.unitService.getAll().subscribe((units) => {
      this.units = units;
      if (this.exerciseSet) {
        this.formGroup.get('reps').patchValue(this.exerciseSet.reps);
        this.formGroup.get('weight').patchValue(this.exerciseSet.weight);
        this.formGroup
          .get('selectedUnit')
          .patchValue(
            this.units.find((u) => u.code === this.exerciseSet.unit.code)
          );
      } else {
        this.formGroup.get('selectedUnit').patchValue(this.units[0]);
      }
    });
  }

  onSaveClicked() {
    if (this.exerciseSet) {
      this.exerciseSet.reps = +this.formGroup.get('reps').value;
      this.exerciseSet.weight = +this.formGroup.get('weight').value;
      this.exerciseSet.unit.code = this.formGroup.get('selectedUnit').value.code;
    } else {
      const set = {
        id: null,
        reps: this.formGroup.get('reps').value,
        weight: this.formGroup.get('weight').value,
        unit: this.formGroup.get('selectedUnit').value
      };
      this.onClose.next(set);
    }
    this.bsModalRef.hide();
  }

  onCloseClicked() {
    this.bsModalRef.hide();
  }
}
