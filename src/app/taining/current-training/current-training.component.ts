import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingDialog } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  interval;

  // @Output()
  // emitTrainingExit = new EventEmitter<any>();

  constructor(private dialog: MatDialog, private trainingSVC: TrainingService) { }


  ngOnInit() {
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    let steps = (this.trainingSVC.getOngoingExcercise().duration) * 10;
    console.log(steps);
    this.interval = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingSVC.completeExcercise();
        clearInterval(this.interval);
      }
    }, steps);
  }

  stop() {
    this.interval = clearInterval(this.interval);
    let dialogRef = this.dialog.open(StopTrainingDialog, { data: { progress: this.progress } });
    dialogRef.afterClosed().subscribe(dialogData => {
      if (dialogData) {
        //this.emitTrainingExit.emit();
        this.trainingSVC.cancelExcercise(this.progress);

      } else {
        this.startOrResumeTraining();
      }
    })
  }

}
