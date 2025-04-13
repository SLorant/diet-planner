import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <mat-card class="dashboard-card">
        <mat-card-header>
          <mat-card-title>Daily Summary [WIP]</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="summary-grid">
            <div class="summary-item">
              <mat-icon>local_fire_department</mat-icon>
              <span>Calories: 0/2000</span>
            </div>
            <div class="summary-item">
              <mat-icon>restaurant</mat-icon>
              <span>Meals: 0/3</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card class="dashboard-card">
        <mat-card-header>
          <mat-card-title>Quick Actions</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="actions-grid">
            <a mat-raised-button color="primary" routerLink="/calorie-tracker">
              <mat-icon>fitness_center</mat-icon>
              <span>Calorie Tracker</span>
            </a>
            <a mat-raised-button color="accent" routerLink="/meal-planner">
              <mat-icon>restaurant_menu</mat-icon>
              <span>Meal Planner</span>
            </a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        display: grid;
        gap: 20px;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .dashboard-card {
        padding: 20px;
      }

      .summary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }

      .summary-item {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .actions-grid {
        display: flex;
        gap: 20px;
        margin-top: 20px;
        justify-content: center;
      }

      a[mat-raised-button] {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 160px;
        padding: 8px 16px;
      }

      @media screen and (max-width: 600px) {
        .dashboard-container {
          padding: 10px;
        }

        .actions-grid {
          flex-direction: column;
          align-items: stretch;
        }

        a[mat-raised-button] {
          width: 100%;
          justify-content: center;
        }
      }
    `,
  ],
})
export class DashboardComponent {}
