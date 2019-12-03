import { Injectable, Output, EventEmitter } from "@angular/core";
import { Excercise } from './excercise.model';
import { Subject } from "rxjs";

//@Injectable({ providedIn: 'root' })
export class TrainingService {


    emitTrainingStarted = new Subject<Excercise>();

    availableExcercises: Excercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
    excercises: Excercise[] = [];
    ongoingExcercise: Excercise;

    getExcercises() {
        return this.availableExcercises.slice();
    }
    startExcercise(selectedId) {
        this.ongoingExcercise = this.availableExcercises.find(ex => ex.id == selectedId);
        this.emitTrainingStarted.next({ ...this.ongoingExcercise });
    }
    getOngoingExcercise() {
        return { ...this.ongoingExcercise };
    }
    completeExcercise() {
        this.emitTrainingStarted.next(null);
        this.excercises.push({ ...this.ongoingExcercise, date: new Date(), state: 'completed' });
        this.ongoingExcercise = null;
    }

    cancelExcercise(progress: number) {
        this.emitTrainingStarted.next(null);
        this.excercises.push({
            ...this.ongoingExcercise, date: new Date(), state: 'cancelled',
            duration: this.ongoingExcercise.duration * (progress / 100),
            calories: this.ongoingExcercise.calories * (progress / 100)
        });
        this.ongoingExcercise = null;
    }

    getCompletedOrCancelledExcercises() {
        return this.excercises.slice();
    }
}