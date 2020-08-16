import { ExerciseService } from './../../_services/exercise.service';
import { EditExerciseComponent } from './../edit-exercise/edit-exercise.component';
import { Router } from '@angular/router';
import { Training } from './../../_models/Training';
import { TrainingService } from './../../_services/training.service';
import { ExerciseSet } from './../../_models/ExerciseSet';
import { Exercise } from './../../_models/Exercise';
import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { notBlankValidator } from '../../_shared/NotBlankValidator.directive';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, AfterViewInit {
  trainings: Observable<string[]>;
  exerciseNamesTypehead: Observable<string[]>;

  exercises: Exercise[] = [];

  @ViewChildren('editExerciseComponent', { read: EditExerciseComponent })
  editExerciseComponent: QueryList<EditExerciseComponent>;
  private editExerciseComponentKeys: string[] = [];

  constructor(
    private trainingService: TrainingService,
    private exerciseService: ExerciseService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  formGroup = this.fb.group({
    trainingName: ['', [Validators.required, notBlankValidator()]],
    trainingDate: ['', [Validators.required]]
  });

  ngOnInit() {
    this.trainings = this.trainingService.getNames();
    this.exerciseNamesTypehead = this.exerciseService.getNames();
    this.formGroup.get('trainingDate').setValue(new Date());
  }

  ngAfterViewInit() {
    this.addEditExerciseComponentsFormGroup();
  }

  private addEditExerciseComponentsFormGroup() {
    this.editExerciseComponent.changes.subscribe((x: any) => {
      this.removeOldEditExerciseComponentsFormGroup();
      this.addNewEditExerciseComponentsFormGroup(x);
    });
  }

  private removeOldEditExerciseComponentsFormGroup() {
    this.editExerciseComponentKeys.forEach((key) => {
      this.formGroup.removeControl(key);
    });
    this.editExerciseComponentKeys.length = 0;
  }

  private addNewEditExerciseComponentsFormGroup(x: any) {
    let index = 0;
    const components: EditExerciseComponent[] = x._results;
    components.forEach((component) => {
      const controlName = 'editExerciseComponent' + index;
      this.formGroup.addControl(controlName, component.formGroup);
      component.formGroup.setParent(this.formGroup);
      index++;
    });
  }

  addExercise() {
    const sets: ExerciseSet[] = [];
    const exercise: Exercise = { id: null, name: '', sets };
    this.exercises.push(exercise);
  }

  removeExercise(index: number) {
    this.exercises.splice(index, 1);
  }

  removeExerciseSet(exerciseIndex: number, exerciseSetIndex: number) {
    this.exercises[exerciseIndex].sets.splice(exerciseSetIndex, 1);
  }

  saveTraining() {
    const training: Training = {
      id: null,
      name: this.formGroup.get('trainingName').value,
      date: this.formGroup.get('trainingDate').value,
      exercises: this.exercises
    };
    this.trainingService.save(training).subscribe(
      (next) => {
        console.log('saved');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('save error');
      }
    );
  }
}
