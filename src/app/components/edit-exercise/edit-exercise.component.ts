import { ExerciseSet } from './../../_models/ExerciseSet';
import { EditExerciseSetComponent } from './../edit-exercise-set/edit-exercise-set.component';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Exercise } from 'src/app/_models/Exercise';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.css']
})
export class EditExerciseComponent implements OnInit {
  selected = '';
  exercises: string[] = ['Exercise 1', 'Exercise 2'];

  isCollapsed = false;

  @Input() exercise: Exercise;
  @Output() removeExercise = new EventEmitter<boolean>();
  @Output() removeExerciseSet = new EventEmitter<number>();

  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService, private fb: FormBuilder) {}

  formGroup = this.fb.group({
    exerciseName: ['', [Validators.required]]
  });

  ngOnInit() {
    this.updateExerciseName();
  }

  private updateExerciseName() {
    this.formGroup
      .get('exerciseName')
      .valueChanges.subscribe((x) => (this.exercise.name = x));
  }

  addSet() {
    this.bsModalRef = this.modalService.show(EditExerciseSetComponent, {});
    this.bsModalRef.content.onClose.subscribe((set: ExerciseSet) => {
      this.exercise.sets.push(set);
    });
  }

  editSet(set: ExerciseSet) {
    const initialState = {
      exerciseSet: set
    };
    this.bsModalRef = this.modalService.show(EditExerciseSetComponent, {
      initialState
    });
  }

  onRemoveExerciseClicked() {
    this.removeExercise.emit(true);
  }

  onRemoveExerciseSetClicked(index: number) {
    this.removeExerciseSet.emit(index);
  }
}
