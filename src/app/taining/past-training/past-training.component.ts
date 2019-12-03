import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from "@angular/material";
import { Excercise } from '../excercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  //dataSource = new MatTableDataSource<Excercise>();
  dataSource = new MatTableDataSource(this.trainingSVC.getCompletedOrCancelledExcercises());
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private trainingSVC: TrainingService) { }

  ngOnInit() {
    // this.dataSource = this.trainingSVC.getCompletedOrCancelledExcercises();

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
