import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  @ViewChild(IonContent) content!: IonContent; // Reference to the IonContent for scrolling
  email: string = ''; // User email input
  password: string = ''; // User password input

  // Mock users for testing login functionality
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

  async ngOnInit() {
    await this.storage.create(); // Initialize storage
  }

  // Clears focus from any active input fields
  async clearFocus() {
    try {
      await this.content.getScrollElement().then(el => {
        const activeElement = el.querySelector(':focus');
        if (activeElement) {
          (activeElement as HTMLElement).blur();
        }
      });
      (document.activeElement as HTMLElement)?.blur();
    } catch (error) {
      console.warn('Focus clearing error:', error);
    }
  }

  // Navigates to the signup page
  async navigateToSignup() {
    await this.clearFocus();
    this.router.navigate(['/signup'], {
      state: { clearFocus: true }
    });
  }

  // Handles the login process
  async login() {
    await this.clearFocus();
    
    try {
      const users = await this.storage.get('users') || []; // Retrieve users from storage
      const user = users.find((u: any) => u.email === this.email && u.password === this.password);
      
      if (user) {
        await this.storage.set('currentUser', user); // Save the current user in storage
        await this.router.navigate(['/workouts'], { replaceUrl: true }); // Navigate to workouts page
      } else {
        await this.showAlert('Login Failed', 'Invalid email or password'); // Show error alert
      }
    } catch (error) {
      console.error('Login error:', error);
      await this.showAlert('Error', 'An error occurred during login'); // Show generic error alert
    }
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

  // Fills in credentials for testing purposes
  fillCredentials(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}