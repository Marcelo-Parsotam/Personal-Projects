import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root' // Makes this service available throughout the app
})
export class AuthGuard implements CanActivate {
  constructor(
    private storage: Storage, // Storage service for accessing saved data
    private router: Router // Router for navigation
  ) {}

  // Determines if a route can be activated
  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.storage.get('currentUser'); // Check if a user is logged in
    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirect to login page if not authenticated
      return false; // Prevent access to the route
    }
    return true; // Allow access to the route
  }
}