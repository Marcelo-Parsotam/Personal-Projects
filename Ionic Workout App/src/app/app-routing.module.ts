import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' // Redirects the root path to the login page
  },
  { 
    path: 'login', 
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule), // Lazy loads the login module
    data: { animation: 'login' } // Optional animation metadata for route transitions
  },
  { 
    path: 'signup', 
    loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupPageModule) // Lazy loads the signup module
  },
  { 
    path: 'workouts',
    loadChildren: () => import('./workouts/workout-list/workout-list.module').then(m => m.WorkoutListPageModule), // Lazy loads the workout list module
    data: { animation: 'workouts' } // Optional animation metadata for route transitions
  },
  { 
    path: 'workout-details/:id', 
    loadChildren: () => import('./workouts/workout-details/workout-details.module').then(m => m.WorkoutDetailsPageModule) // Lazy loads the workout details module with a dynamic parameter
  },
  { 
    path: 'progress', 
    loadChildren: () => import('./progress/progress.module').then(m => m.ProgressPageModule) // Lazy loads the progress module
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      onSameUrlNavigation: 'reload', // Reloads the route if the same URL is navigated to
      scrollPositionRestoration: 'enabled' // Restores the scroll position when navigating back
    })
  ],
  exports: [RouterModule] // Exports the RouterModule so it can be used throughout the app
})
export class AppRoutingModule { }