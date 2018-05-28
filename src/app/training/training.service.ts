import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TrainingService {


    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private finishedExercises: Exercise[] = [];

    constructor(private db: AngularFirestore) {}

    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();

    fetchAvailableExercises() {
        this.db
        .collection('availableExercises')
        .snapshotChanges()
        .map(docArray => { 
        return docArray.map(doc => {
            return{
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            duration: doc.payload.doc.data().duration,
            calories: doc.payload.doc.data().calories,
            };
        });
        }).subscribe((exercice: Exercise[]) => {
            this.availableExercises = exercice;
            this.exercisesChanged.next([...this.availableExercises]);
        });

    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise,
            state: 'completed',
            date: new Date()
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.duration * (progress / 100),
            state: 'cancelled',
            date: new Date()
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);

    }

    getRunningExercise() {
        return {...this.runningExercise};
    }

    fetchCompletedOrCancelExercises() {
        this.db.collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
            this.finishedExercisesChanged.next(exercises);
        });
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}
