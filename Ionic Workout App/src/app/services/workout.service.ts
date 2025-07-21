import { Injectable } from '@angular/core';
import { Workout, Exercise } from '../models/workout.model'; // Importing the Workout and Exercise interfaces

@Injectable({
  providedIn: 'root' // Makes this service available throughout the app
})
export class WorkoutService {
  // Mock data for workouts
  private workouts: Workout[] = [
    {
      id: 1,
      title: 'Weight Loss Program', // Title of the workout
      description: 'A program designed to help you lose weight through cardio and strength training.', // Description of the workout
      exercises: [
        { name: 'Jumping Jacks', duration: '30 seconds', equipment: 'None' }, // Exercise 1
        { name: 'Squats', duration: '3 sets of 12', equipment: 'None' }, // Exercise 2
        { name: 'Push-ups', duration: '3 sets of 10', equipment: 'None' } // Exercise 3
      ],
      image: 'assets/images/workout-1.jpg' // Image for the workout
    },
    {
      id: 2,
      title: 'Muscle Gain Program', // Title of the workout
      description: 'A program focused on building muscle mass through strength training.', // Description of the workout
      exercises: [
        { name: 'Bench Press', duration: '4 sets of 8', equipment: 'Barbell' }, // Exercise 1
        { name: 'Deadlifts', duration: '4 sets of 6', equipment: 'Barbell' }, // Exercise 2
        { name: 'Pull-ups', duration: '3 sets to failure', equipment: 'Pull-up bar' } // Exercise 3
      ],
      image: 'assets/images/workout-2.jpg' // Image for the workout
    },
    {
      id: 3,
      title: 'Cardio Program', // Title of the workout
      description: 'A high-intensity cardio program to improve endurance.', // Description of the workout
      exercises: [
        { name: 'Running', duration: '30 minutes', equipment: 'Treadmill' }, // Exercise 1
        { name: 'Cycling', duration: '20 minutes', equipment: 'Exercise bike' }, // Exercise 2
        { name: 'Rowing', duration: '15 minutes', equipment: 'Rowing machine' } // Exercise 3
      ],
      image: 'assets/images/workout-3.jpg' // Image for the workout
    }
  ];

  constructor() {}

  // Returns the list of all workouts
  getWorkouts(): Workout[] {
    return this.workouts;
  }

  // Returns a specific workout by its ID
  getWorkoutById(id: number): Workout | undefined {
    return this.workouts.find(workout => workout.id === id);
  }
}