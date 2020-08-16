import { Training } from './../../_models/Training';
import { TrainingService } from './../../_services/training.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {
  constructor(private trainingService: TrainingService) {}

  trainings: Observable<Training[]>;

  ngOnInit() {
    this.trainings = this.trainingService.getAll();
  }


}
