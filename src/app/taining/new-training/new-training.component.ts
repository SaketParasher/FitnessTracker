import { Component, OnInit } from '@angular/core';
import { TrainingService } from "../training.service";
import { Excercise } from '../excercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  allExcrcises: Excercise[] = [];
  constructor(private trainingSVC: TrainingService) {
    this.allExcrcises = this.trainingSVC.getExcercises();
  }

  ngOnInit() {
  }

  startTarining(form: NgForm) {
    this.trainingSVC.startExcercise(form.value.excercise);
  }

}
