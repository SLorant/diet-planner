import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MealCardComponent } from './meal-card.component';
import { Meal } from '../shared/models';
import { MealService } from '../shared/meal.service';

@Component({
  selector: 'app-meal-planner',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    FormsModule,
    MealCardComponent,
  ],
  template: `
    <div class="meal-planner-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Meal Planner</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="meal-input">
            <mat-form-field>
              <mat-label>Meal Name</mat-label>
              <input
                matInput
                [(ngModel)]="newMeal.name"
                placeholder="Enter meal name"
                [disabled]="isSubmitting"
              />
            </mat-form-field>

            <mat-form-field>
              <mat-label>Time</mat-label>
              <mat-select [(ngModel)]="newMeal.time" [disabled]="isSubmitting">
                <mat-option value="breakfast">Breakfast</mat-option>
                <mat-option value="lunch">Lunch</mat-option>
                <mat-option value="dinner">Dinner</mat-option>
                <mat-option value="snack">Snack</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Calories</mat-label>
              <input
                matInput
                type="number"
                [(ngModel)]="newMeal.calories"
                placeholder="Enter calories"
                [disabled]="isSubmitting"
              />
            </mat-form-field>

            <mat-form-field>
              <mat-label>Food Items</mat-label>
              <input
                matInput
                [(ngModel)]="newFoodItem"
                placeholder="Enter food item"
                (keyup.enter)="addFoodItem()"
                [disabled]="isSubmitting"
              />
            </mat-form-field>

            <button
              mat-raised-button
              class="meal-planner-add-btn"
              (click)="addFoodItem()"
              [disabled]="isSubmitting"
            >
              Add food
            </button>

            <button
              mat-raised-button
              color="primary"
              (click)="addMeal()"
              [disabled]="isSubmitting"
            >
              <mat-icon>add</mat-icon>
              <span *ngIf="!isSubmitting">Add Meal</span>
              <mat-spinner *ngIf="isSubmitting" diameter="20"></mat-spinner>
            </button>
          </div>

          <div *ngIf="newMeal.foods.length > 0" class="current-foods">
            <h3>Current Foods:</h3>
            <ul>
              <li *ngFor="let food of newMeal.foods">{{ food }}</li>
            </ul>
          </div>

          <div class="meals-grid">
            <app-meal-card
              *ngFor="let meal of meals"
              [meal]="meal"
              (onDelete)="removeMeal($event)"
            ></app-meal-card>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .meal-planner-container {
        padding: 16px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .meal-input {
        display: flex;
        gap: 16px;
        margin-bottom: 24px;
        align-items: center;
        flex-wrap: wrap;
      }

      .current-foods {
        margin: 20px 0;
        padding: 15px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        color: #000000;
      }

      .meals-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 20px;
        color: #000000;
      }

      mat-form-field {
        min-width: 200px;
      }

      @media screen and (max-width: 768px) {
        .meal-planner-container {
          padding: 8px;
        }

        .meal-input {
          gap: 8px;
        }

        mat-form-field {
          min-width: 100%;
        }

        .meals-grid {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
      }
    `,
  ],
})
export class MealPlannerComponent implements OnInit {
  meals: Meal[] = [];
  newMeal: Meal = {
    name: '',
    time: '',
    foods: [],
    calories: 0,
  };
  newFoodItem: string = '';
  isSubmitting = false;

  constructor(
    private snackBar: MatSnackBar,
    private mealService: MealService
  ) {}

  async ngOnInit() {
    await this.loadMeals();
  }

  private async loadMeals() {
    try {
      this.meals = await this.mealService.getMeals();
    } catch (error) {
      this.showError('Failed to load meals');
    }
  }

  addFoodItem() {
    if (this.newFoodItem.trim()) {
      this.newMeal.foods = [...this.newMeal.foods, this.newFoodItem.trim()];
      this.newFoodItem = '';
    }
  }

  async addMeal() {
    if (!this.newMeal.name) {
      this.showError('Please enter a meal name');
      return;
    }
    if (!this.newMeal.time) {
      this.showError('Please select a meal time');
      return;
    }
    if (this.newMeal.foods.length === 0) {
      this.showError('Please add at least one food item to the meal');
      return;
    }

    try {
      this.isSubmitting = true;
      await this.mealService.addMeal({ ...this.newMeal });
      await this.loadMeals();
      this.resetForm();
      this.showSuccess('Meal added successfully');
    } catch (error) {
      this.showError('Failed to add meal');
    } finally {
      this.isSubmitting = false;
    }
  }

  async removeMeal(meal: Meal) {
    if (!meal.id) {
      this.showError('Cannot delete meal: missing ID');
      return;
    }

    try {
      await this.mealService.deleteMeal(meal.id);
      await this.loadMeals();
      this.showSuccess('Meal removed successfully');
    } catch (error) {
      this.showError('Failed to remove meal');
    }
  }

  private resetForm() {
    this.newMeal = {
      name: '',
      time: '',
      foods: [],
      calories: 0,
    };
    this.newFoodItem = '';
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
}
