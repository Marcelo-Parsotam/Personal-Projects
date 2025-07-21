import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../../services/workout.service';
import { Storage } from '@ionic/storage-angular';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.page.html',
  styleUrls: ['./workout-details.page.scss'],
  standalone: false,
})
export class WorkoutDetailsPage {
  workout: Workout | undefined; // The workout being displayed
  completed: boolean = false; // Whether the workout is marked as completed

  constructor(
    private route: ActivatedRoute, // ActivatedRoute to get route parameters
    private workoutService: WorkoutService, // Service to fetch workout data
    private storage: Storage, // Storage service for saving and retrieving data
    private changeDetector: ChangeDetectorRef // Used to manually trigger UI updates
  ) {}

  // Lifecycle hook triggered when the page is about to be displayed
  async ionViewWillEnter() {
    await this.loadWorkoutData(); // Load workout data
  }

  // Returns the appropriate icon for a given exercise name
  getExerciseIcon(exerciseName: string): string {
    const iconMap: { [key: string]: string } = {
      'Running': 'walk-outline',
      'Cycling': 'bicycle-outline',
      'Rowing': 'boat-outline',
      'Jumping Jacks': 'body-outline',
      'Squats': 'body-outline',
      'Push-ups': 'body-outline',
      'Bench Press': 'barbell-outline',
      'Deadlifts': 'barbell-outline',
      'Pull-ups': 'fitness-outline'
    };
    return iconMap[exerciseName] || 'fitness-outline'; // Default icon if no match is found
  }

  // Loads the workout data based on the route parameter
  private async loadWorkoutData() {
    const workoutId = this.getWorkoutId(); // Get the workout ID from the route
    if (!workoutId) return;
    
    this.workout = this.workoutService.getWorkoutById(workoutId); // Fetch the workout by ID
    if (!this.workout) return;
    
    const currentUser = await this.storage.get('currentUser'); // Get the current user from storage
    if (!currentUser?.email) return;
    
    const completedWorkouts: number[] = await this.storage.get(`completedWorkouts_${currentUser.email}`) || [];
    this.completed = completedWorkouts.includes(workoutId); // Check if the workout is completed
    this.changeDetector.detectChanges(); // Force UI update
  }

  // Retrieves the workout ID from the route parameters
  private getWorkoutId(): number | null {
    const id = this.route.snapshot.paramMap.get('id'); // Get the 'id' parameter from the route
    return id ? +id : null; // Convert the ID to a number or return null
  }

  // Toggles the completed status of the workout
  async toggleCompleted() {
    if (!this.workout) return;
    
    const currentUser = await this.storage.get('currentUser'); // Get the current user from storage
    if (!currentUser?.email) return;
    
    this.completed = !this.completed; // Toggle the completed status
    
    let completedWorkouts: number[] = await this.storage.get(`completedWorkouts_${currentUser.email}`) || [];
    
    if (this.completed) {
      if (!completedWorkouts.includes(this.workout.id)) {
        completedWorkouts.push(this.workout.id); // Add the workout ID to the completed list
      }
    } else {
      completedWorkouts = completedWorkouts.filter(id => id !== this.workout?.id); // Remove the workout ID from the completed list
    }
    
    await this.storage.set(`completedWorkouts_${currentUser.email}`, completedWorkouts); // Save the updated list
    this.changeDetector.detectChanges(); // Force UI update
  }
}