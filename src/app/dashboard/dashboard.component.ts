import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MealService } from '../shared/meal.service';
import { CalorieFormatPipe } from '../shared/calorie-format.pipe';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CalorieFormatPipe,
  ],
  template: `
    <div class="dashboard-container">
      <!-- Welcome Screen for Non-Authenticated Users -->
      <div *ngIf="!authService.isAuthenticated()" class="welcome-section">
        <mat-card class="welcome-card">
          <mat-card-header>
            <mat-card-title>Welcome to Diet Planner</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="welcome-content">
              <div class="feature-grid">
                <div class="feature-item">
                  <mat-icon>restaurant</mat-icon>
                  <h3>Meal Planning</h3>
                  <p>
                    Plan your meals ahead and stay on track with your diet goals
                  </p>
                </div>
                <div class="feature-item">
                  <mat-icon>local_fire_department</mat-icon>
                  <h3>Calorie Tracking</h3>
                  <p>
                    Track your daily calorie intake and nutritional information
                  </p>
                </div>
              </div>
              <div class="auth-buttons">
                <a mat-raised-button color="primary" routerLink="/login">
                  <mat-icon>login</mat-icon>
                  Login
                </a>
                <a mat-raised-button color="accent" routerLink="/register">
                  <mat-icon>person_add</mat-icon>
                  Register
                </a>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Dashboard for Authenticated Users -->
      <div *ngIf="authService.isAuthenticated()">
        <mat-card class="stats-card">
          <mat-card-header>
            <mat-card-title>Meal Statistics</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stats-grid">
              <div class="stat-item">
                <mat-icon>restaurant</mat-icon>
                <div class="stat-content">
                  <h3>Total Meals</h3>
                  <p>{{ totalMeals }}</p>
                </div>
              </div>
              <div class="stat-item">
                <mat-icon>local_fire_department</mat-icon>
                <div class="stat-content">
                  <h3>Total Calories</h3>
                  <p>{{ totalCalories | calorieFormat }}</p>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <div class="action-cards">
          <mat-card class="action-card" routerLink="/calorie-tracker">
            <mat-card-header>
              <mat-card-title>Calorie Tracker</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Track your daily food intake and nutritional information</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button color="primary">Go to Tracker</button>
            </mat-card-actions>
          </mat-card>

          <mat-card class="action-card" routerLink="/meal-planner">
            <mat-card-header>
              <mat-card-title>Meal Planner</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Plan your meals and manage your diet schedule</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button color="primary">Go to Planner</button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        padding: 16px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .welcome-section {
        max-width: 800px;
        margin: 0 auto;
      }

      .welcome-card {
        text-align: center;
        padding: 32px;
      }

      .welcome-content {
        display: flex;
        flex-direction: column;
        gap: 32px;
      }

      .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 24px;
        margin: 24px 0;
      }

      .feature-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding: 24px;
        background-color: #f5f5f5;
        border-radius: 8px;
        transition: transform 0.2s ease-in-out;
      }

      .feature-item:hover {
        transform: translateY(-4px);
      }

      .feature-item mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        color: #673ab7;
      }

      .feature-item h3 {
        margin: 0;
        color: #333;
      }

      .feature-item p {
        margin: 8px 0 0;
        color: #666;
        text-align: center;
      }

      .auth-buttons {
        display: flex;
        gap: 16px;
        justify-content: center;
        margin-top: 16px;
      }

      .auth-buttons a {
        min-width: 120px;
      }

      .stats-card {
        margin-bottom: 24px;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 24px;
        padding: 16px;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .stat-item mat-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
        color: #673ab7;
      }

      .stat-content h3 {
        margin: 0;
        font-size: 16px;
        color: #666;
      }

      .stat-content p {
        margin: 4px 0 0;
        font-size: 24px;
        font-weight: 500;
        color: #333;
      }

      .action-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
      }

      .action-card {
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
      }

      .action-card:hover {
        transform: translateY(-4px);
      }

      @media screen and (max-width: 600px) {
        .dashboard-container {
          padding: 8px;
        }

        .welcome-card {
          padding: 16px;
        }

        .feature-grid {
          gap: 16px;
        }

        .auth-buttons {
          flex-direction: column;
          align-items: stretch;
        }

        .stats-grid {
          gap: 16px;
        }

        .action-cards {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  totalCalories = 0;
  totalMeals = 0;

  constructor(
    private mealService: MealService,
    public authService: AuthService
  ) {}

  async ngOnInit() {
    if (this.authService.isAuthenticated()) {
      await this.loadMealStats();
    }
  }

  private async loadMealStats() {
    try {
      const stats = await this.mealService.getMealStats();
      this.totalCalories = stats.totalCalories;
      this.totalMeals = stats.totalMeals;
    } catch (error) {
      console.error('Failed to load meal stats:', error);
    }
  }
}
