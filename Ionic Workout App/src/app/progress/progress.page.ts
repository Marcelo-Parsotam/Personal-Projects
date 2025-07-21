import { Component } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { Storage } from '@ionic/storage-angular';
import { Workout } from '../models/workout.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
  standalone: false,
})
export class ProgressPage {
  completedWorkouts: Workout[] = []; // List of completed workouts
  totalWorkouts: number = 0; // Total number of workouts available
  progressPercentage: number = 0; // Percentage of completed workouts

  constructor(
    private workoutService: WorkoutService, // Service to fetch workout data
    private storage: Storage, // Storage service for saving and retrieving data
    private toastController: ToastController // Toast controller for showing messages
  ) {}

  // Lifecycle hook triggered when the page is entered
  async ionViewDidEnter() {
    await this.loadProgress(); // Load progress data
  }

  // Loads the user's progress data
  async loadProgress() {
    const currentUser = await this.storage.get('currentUser'); // Get the current user from storage
    if (!currentUser?.email) return; // Exit if no user is logged in
    
    const allWorkouts = this.workoutService.getWorkouts(); // Fetch all workouts
    this.totalWorkouts = allWorkouts.length; // Set the total number of workouts
    
    // Get the list of completed workout IDs for the current user
    const completedIds = await this.storage.get(`completedWorkouts_${currentUser.email}`) || [];
    
    // Filter the completed workouts based on the IDs
    this.completedWorkouts = allWorkouts.filter(workout => completedIds.includes(workout.id));
    
    // Calculate the progress percentage
    this.progressPercentage = (this.completedWorkouts.length / this.totalWorkouts) * 100;
  }

  // Resets the user's progress
  async resetProgress() {
    const currentUser = await this.storage.get('currentUser'); // Get the current user from storage
    if (!currentUser?.email) return; // Exit if no user is logged in
    
    // Clear the list of completed workouts for the current user
    await this.storage.set(`completedWorkouts_${currentUser.email}`, []);
    await this.loadProgress(); // Reload progress data
    
    // Show a confirmation toast
    const toast = await this.toastController.create({
      message: 'Progress reset successfully!', // Toast message
      duration: 2000, // Duration in milliseconds
      color: 'success' // Toast color
    });
    await toast.present(); // Display the toast
  }
}