import { AlertifyService } from './../../_services/alertify.service';
import { ExerciseService } from './../../_services/exercise.service';
import { EditExerciseComponent } from './../edit-exercise/edit-exercise.component';
import { Router, ActivatedRoute } from '@angular/router';
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
import { first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, AfterViewInit {
  trainingToEdit: Training;

  trainingNames: Observable<string[]>;
  exerciseNamesTypehead: Observable<string[]>;

  exercises: Exercise[] = [];

  @ViewChildren('editExerciseComponent', { read: EditExerciseComponent })
  editExerciseComponent: QueryList<EditExerciseComponent>;
  private editExerciseComponentKeys: string[] = [];

  constructor(
    private trainingService: TrainingService,
    private exerciseService: ExerciseService,
    private router: Router,
    private fb: FormBuilder,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  formGroup = this.fb.group({
    trainingName: ['', [Validators.required, notBlankValidator()]],
    trainingDate: ['', [Validators.required]]
  });

  ngOnInit() {
    this.trainingNames = this.trainingService.getNames();
    this.exerciseNamesTypehead = this.exerciseService.getNames();

    this.route.queryParams
      .pipe(
        first((params) => params.id),
        switchMap((param) => this.trainingService.getById(param.id))
      )
      .subscribe(
        (next) => {
          if (next) {
            this.trainingToEdit = next;
            this.formGroup
              .get('trainingName')
              .setValue(this.trainingToEdit.name);
            this.formGroup
              .get('trainingDate')
              .setValue(this.trainingToEdit.date);
            this.exercises.push.apply(
              this.exercises,
              this.trainingToEdit.exercises
            );
            console.log(next);
          } else {
            this.formGroup.get('trainingDate').setValue(new Date());
          }
        },
        (error) => {
          this.alertifyService.error('Loading training error');
          console.error(error);
        }
      );
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
      if (this.formGroup.contains(key)) {
        this.formGroup.removeControl(key);
      }
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
      () => {
        this.alertifyService.success('Saved');
        this.router.navigate(['/home']);
      },
      (error) => {
        this.alertifyService.error('Saving error');
        console.error(error);
      }
    );
  }
}
