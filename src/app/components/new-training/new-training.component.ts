import { Router } from '@angular/router';
import { Training } from './../../_models/Training';
import { TrainingService } from './../../_services/training.service';
import { ExerciseSet } from './../../_models/ExerciseSet';
import { Exercise } from './../../_models/Exercise';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  trainingName = '';
  trainingDate = new Date();
  trainings: string[] = ['Training 1', 'Training 2'];

  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService, private router: Router) {}

  ngOnInit() {}

  addExercise() {
    const sets: ExerciseSet[] = [];
    const exercise: Exercise = { name: '', sets };
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
      name: this.trainingName,
      date: this.trainingDate,
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
