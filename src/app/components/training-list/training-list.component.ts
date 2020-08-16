import { AlertifyService } from './../../_services/alertify.service';
import { Training } from './../../_models/Training';
import { TrainingService } from './../../_services/training.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {
  constructor(
    private trainingService: TrainingService,
    private alertifyService: AlertifyService
  ) {}

  trainings: Training[] = [];

  ngOnInit() {
    this.refreshTrainings();
  }

  deleteTraining(id: number) {
    this.trainingService.delete(id).subscribe(
      (next) => {
        this.alertifyService.success('Training was deleted.');
        this.refreshTrainings();
      },
      (error) => {
        this.alertifyService.error('Training delete error');
        console.error(error);
      }
    );
  }

  private refreshTrainings() {
    this.trainingService.getAll().subscribe(
      (next) => {
        this.trainings = next;
      },
      (error) => {
        this.alertifyService.error('Loading data error');
        console.error(error);
      }
    );
  }
}
