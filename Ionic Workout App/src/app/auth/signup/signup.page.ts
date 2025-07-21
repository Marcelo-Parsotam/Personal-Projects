import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false,
})
export class SignupPage {
  @ViewChild(IonContent, { static: true }) content!: IonContent; // Reference to the IonContent for scrolling
  email: string = ''; // User email input
  password: string = ''; // User password input
  name: string = ''; // User full name input
  age: number | null = null; // User age input
  fitnessLevel: string = 'Beginner'; // Default fitness level

  // Mock existing users for validation
  private mockUsers = [
    { email: 'user1@example.com', password: 'Password123!' },
    { email: 'user2@example.com', password: 'SecurePass456!' },
    { email: 'testuser@example.com', password: 'TestPass789!' }
  ];

  constructor(
    private router: Router, // Router for navigation
    private storage: Storage, // Storage for saving user data
    private alertController: AlertController // Alert controller for showing messages
  ) {}

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

  // Navigates to the login page
  async navigateToLogin() {
    await this.clearFocus();
    this.router.navigate(['/login'], {
      replaceUrl: false, // Do not replace the current URL in the history stack
      state: { clearFocus: true }
    });
  }

  // Handles the signup process
  async signup() {
    await this.clearFocus();

    // Validate email format
    if (!this.validateEmail(this.email)) {
      await this.showAlert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    // Validate password strength
    if (!this.validatePassword(this.password)) {
      await this.showAlert(
        'Weak Password',
        'Password must be at least 8 characters long and contain at least one number and one special character'
      );
      return;
    }

    // Retrieve existing users from local storage
    const users = await this.storage.get('users') || []; // Retrieve users from storage

    // Check if email already exists in local storage or mock users
    const emailExists = users.some((user: any) => user.email === this.email) || 
    this.mockUsers.some(user => user.email === this.email);

    if (emailExists) {
      await this.showAlert('Email Exists', 'This email is already registered. Please use a different email.');
      return;
    }

    // Save new user (in a real app, this would be an API call)
    const newUser = {
      email: this.email,
      password: this.password,
      name: this.name,
      age: this.age,
      fitnessLevel: this.fitnessLevel,
      joinedDate: new Date().toISOString() // Add the current date as the joined date
    };

    users.push(newUser); // Add the new user to the list
    await this.storage.set('users', users); // Save the updated list to storage
    await this.storage.set('currentUser', newUser); // Set the new user as the current user

    this.router.navigate(['/workouts']); // Navigate to the workouts page
  }

  // Validates the email format
  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
    return re.test(email);
  }

  // Validates the password strength
  private validatePassword(password: string): boolean {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; // At least 8 characters, 1 number, 1 special character
    return re.test(password);
  }

  // Displays an alert with a header and message
  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}