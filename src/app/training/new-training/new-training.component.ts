import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription} from 'rxjs';
import { Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  private exercises: Exercise[];
  private exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    //this.exercises = this.trainingService.getAvailableExercises();
    //;
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercise => {
      this.exercises = exercise;
    });

    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy()  {
   this.exerciseSubscription.unsubscribe();
  }


}
