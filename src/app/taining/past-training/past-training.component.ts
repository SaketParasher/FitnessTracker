import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { MatTableDataSource, MatSort } from "@angular/material";
import { Excercise } from "../excercise.model";
import { TrainingService } from "../training.service";

import { Subscription } from "rxjs";

@Component({
  selector: "app-past-training",
  templateUrl: "./past-training.component.html",
  styleUrls: ["./past-training.component.css"]
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ["date", "name", "duration", "calories", "state"];
  //dataSource = new MatTableDataSource<Excercise>();
  dataSource;
  dataSourceSubscription: Subscription;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private trainingSVC: TrainingService) {}

  ngOnInit() {
    // this.dataSource = this.trainingSVC.getCompletedOrCancelledExcercises();
    this.dataSourceSubscription = this.trainingSVC.emitFinishedExcercises.subscribe(
      finishedExcersises => {
        this.dataSource = new MatTableDataSource(finishedExcersises);
        this.dataSource.sort = this.sort;
      }
    );
    this.trainingSVC.getCompletedOrCancelledExcercises();
  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {
    this.dataSourceSubscription.unsubscribe();
  }
}
