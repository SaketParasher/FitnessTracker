import { Injectable, Output, EventEmitter } from "@angular/core";
import { Excercise } from "./excercise.model";
import { Subject, Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { AngularFirestore } from "@angular/fire/firestore";

@Injectable()
export class TrainingService {
  emitTrainingStarted = new Subject<Excercise>();

  // to emit allExcercises after fetching from firestore
  emitAllExcercises = new Subject<Excercise[]>();

  // to emit finished excercises after fetching from firestore
  emitFinishedExcercises = new Subject<Excercise[]>();

  // Auth Subscriptions Array to unsubscribe while we logout
  authSubscriptionsArray: Subscription[] = [];

  availableExcercises: Excercise[];

  excercises: Excercise[] = [];
  ongoingExcercise: Excercise;

  constructor(private db: AngularFirestore) {}

  getExcercises() {
    return this.availableExcercises.slice();
  }

  fetchAvailableExcercises() {
    this.authSubscriptionsArray.push(
      this.db
        .collection("availableExcercises")
        .snapshotChanges()
        .pipe(
          map(allExcercises => {
            return allExcercises.map(singleExcercise => {
              return {
                id: singleExcercise.payload.doc.id,
                name: singleExcercise.payload.doc.data()["name"],
                duration: singleExcercise.payload.doc.data()["duration"],
                calories: singleExcercise.payload.doc.data()["calories"]
              };
            });
          })
        )
        .subscribe(finalExcercises => {
          this.availableExcercises = finalExcercises;
          this.emitAllExcercises.next([...this.availableExcercises]);
        })
    );
  }

  startExcercise(selectedId) {
    this.ongoingExcercise = this.availableExcercises.find(
      ex => ex.id == selectedId
    );
    this.emitTrainingStarted.next({ ...this.ongoingExcercise });
  }
  getOngoingExcercise() {
    return { ...this.ongoingExcercise };
  }
  completeExcercise() {
    this.emitTrainingStarted.next(null);
    this.addDataToDb({
      ...this.ongoingExcercise,
      date: new Date(),
      state: "completed"
    });
    this.ongoingExcercise = null;
  }

  cancelExcercise(progress: number) {
    this.emitTrainingStarted.next(null);
    this.addDataToDb({
      ...this.ongoingExcercise,
      date: new Date(),
      state: "cancelled",
      duration: this.ongoingExcercise.duration * (progress / 100),
      calories: this.ongoingExcercise.calories * (progress / 100)
    });
    this.ongoingExcercise = null;
  }

  getCompletedOrCancelledExcercises() {
    //return this.excercises.slice();
    this.authSubscriptionsArray.push(
      this.db
        .collection("finishedExcercises")
        .valueChanges()
        .pipe(
          map(results => {
            return results.map(ex => {
              return {
                name: ex["name"],
                duration: ex["duration"],
                calories: ex["calories"],
                id: ex["id"],
                date: new Date(ex["date"].seconds * 1000)
              };
            });
          })
        )
        .subscribe((finishedExs: Excercise[]) => {
          console.log(finishedExs);
          this.emitFinishedExcercises.next(finishedExs);
        })
    );
  }

  private addDataToDb(excercise: Excercise) {
    this.db
      .collection("finishedExcercises")
      .add(excercise)
      .then(success => {
        console.log("Finished Excercises Added to DB");
        console.log(success);
      })
      .catch(err => {
        console.log("Error in adding finished excercises in DB");
        console.log(err);
      });
  }

  cancelAllSubscriptions() {
    for (let subs of this.authSubscriptionsArray) {
      subs.unsubscribe();
    }
  }
}
