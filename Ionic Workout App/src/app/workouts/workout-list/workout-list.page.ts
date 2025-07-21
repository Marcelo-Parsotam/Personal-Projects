import { Component, ViewChild } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Workout } from '../../models/workout.model';
import { ToastController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.page.html',
  styleUrls: ['./workout-list.page.scss'],
  standalone: false,
})
export class WorkoutListPage {
  @ViewChild(IonContent, { static: true }) content!: IonContent; // Reference to the IonContent for scrolling
  workouts: Workout[] = []; // List of all workouts
  filteredWorkouts: Workout[] = []; // List of workouts filtered by search
  completedWorkouts: number[] = []; // List of completed workout IDs

  constructor(
    private workoutService: WorkoutService, // Service to fetch workout data
    private router: Router, // Router for navigation
    private storage: Storage, // Storage service for saving and retrieving data
    private toastController: ToastController // Toast controller for showing messages
  ) {}

  // Lifecycle hook triggered when the page is about to be displayed
  async ionViewWillEnter() {
    await this.loadWorkouts(); // Load workouts
  }

  // Loads the list of workouts and completed workouts
  async loadWorkouts(event?: any) {
    try {
      const currentUser = await this.storage.get('currentUser'); // Get the current user from storage
      if (!currentUser?.email) return;
      
      this.workouts = this.workoutService.getWorkouts(); // Fetch all workouts
      this.filteredWorkouts = [...this.workouts]; // Initialize filtered workouts
      this.completedWorkouts = await this.storage.get(`completedWorkouts_${currentUser.email}`) || []; // Get completed workouts
      
      if (event) {
        event.target.complete(); // Complete the refresher event
      }
    } catch (error) {
      console.error('Error loading workouts:', error);
      if (event) {
        event.target.complete(); // Complete the refresher event in case of error
      }
    }
  }

  // Navigates to the progress page
  async navigateToProgress() {
    await this.clearFocus(); // Clear focus from any active elements
    this.router.navigate(['/progress'], {
      state: { clearFocus: true } // Optional state data
    });
  }

  // Clears focus from any active input fields
  async clearFocus() {
    try {
      const scrollEl = await this.content.getScrollElement(); // Get the scrollable element
      const activeElement = scrollEl.querySelector(':focus'); // Find the focused element
      if (activeElement) {
        (activeElement as HTMLElement).blur(); // Remove focus
      }
      (document.activeElement as HTMLElement)?.blur(); // Fallback for document-level focus
    } catch (error) {
      console.warn('Focus clearing error:', error);
    }
  }

  // Logs out the current user
  async logout() {
    await this.clearFocus(); // Clear focus from any active elements
    
    try {
      await this.storage.remove('currentUser'); // Remove the current user from storage
      const toast = await this.toastController.create({
        message: 'Logged out successfully', // Toast message
        duration: 2000, // Duration in milliseconds
        color: 'success' // Toast color
      });
      await toast.present(); // Display the toast
      await this.router.navigate(['/login'], { 
        replaceUrl: true // Replace the current URL in the history stack
      });
    } catch (error) {
      console.error('Logout error:', error);
      const toast = await this.toastController.create({
        message: 'Error during logout', // Error message
        duration: 2000, // Duration in milliseconds
        color: 'danger' // Toast color
      });
      await toast.present(); // Display the error toast
    }
  }

  // Filters the workouts based on the search term
  filterWorkouts(event: CustomEvent) {
    const searchTerm = event.detail.value.toLowerCase(); // Get the search term in lowercase
    this.filteredWorkouts = this.workouts.filter(workout => 
      workout.title.toLowerCase().includes(searchTerm) || 
      workout.description.toLowerCase().includes(searchTerm)
    );
  }

  // Navigates to the workout details page
  viewDetails(workoutId: number) {
    this.router.navigate(['/workout-details', workoutId]); // Pass the workout ID as a route parameter
  }

  // Checks if a workout is completed
  isCompleted(workoutId: number): boolean {
    return this.completedWorkouts.includes(workoutId); // Check if the workout ID is in the completed list
  }

  // Handles the pull-to-refresh functionality
  async handleRefresh(event: any) {
    await this.loadWorkouts(event); // Reload workouts
  }
}