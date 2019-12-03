import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from "./training.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-taining',
  templateUrl: './taining.component.html',
  styleUrls: ['./taining.component.css']
})
export class TainingComponent implements OnInit {

  startTraining: boolean = false;
  excerciseSubscription: Subscription;

  constructor(private trainingSVC: TrainingService) { }

  ngOnInit() {
    this.excerciseSubscription = this.trainingSVC.emitTrainingStarted.subscribe(excercise => {
      if (excercise) {
        this.startTraining = true;
      } else {
        this.startTraining = false;
      }
    })
  }

}
