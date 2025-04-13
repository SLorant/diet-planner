import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalorieTrackerComponent } from './calorie-tracker/calorie-tracker.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'calorie-tracker', component: CalorieTrackerComponent },
  { path: 'meal-planner', component: MealPlannerComponent },
];
