import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalorieTrackerComponent } from './calorie-tracker/calorie-tracker.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './shared/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'calorie-tracker',
    component: CalorieTrackerComponent,
    canActivate: [authGuard],
  },
  {
    path: 'meal-planner',
    component: MealPlannerComponent,
    canActivate: [authGuard],
  },
];
