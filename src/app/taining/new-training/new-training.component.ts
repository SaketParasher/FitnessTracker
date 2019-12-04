import { Component, OnInit, OnDestroy } from "@angular/core";
import { TrainingService } from "../training.service";
import { Excercise } from "../excercise.model";
import { NgForm } from "@angular/forms";

import { Subscription } from "rxjs";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  allExcrcises: Excercise[] = [];
  allExcercisesSubscription: Subscription;

  constructor(private trainingSVC: TrainingService) {}

  ngOnInit() {
    // now we re fetching all excercises from firestore and then subscribing to subject which nexts allExcercises from fetchAvailableExcercises method.
    this.allExcercisesSubscription = this.trainingSVC.emitAllExcercises.subscribe(
      allExs => (this.allExcrcises = allExs)
    );
    this.trainingSVC.fetchAvailableExcercises();
  }

  startTarining(form: NgForm) {
    this.trainingSVC.startExcercise(form.value.excercise);
  }

  ngOnDestroy() {
    this.allExcercisesSubscription.unsubscribe();
  }
}
