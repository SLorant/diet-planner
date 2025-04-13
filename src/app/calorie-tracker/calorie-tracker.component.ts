import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FoodItem } from '../shared/models';
import { FoodFormComponent } from './food-form.component';
import { FoodTableComponent } from './food-table.component';

@Component({
  selector: 'app-calorie-tracker',
  standalone: true,
  imports: [
    MatCardModule,
    MatSnackBarModule,
    FoodFormComponent,
    FoodTableComponent,
  ],
  template: `
    <div class="calorie-tracker-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Calorie Tracker</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <app-food-form
            (addFood)="addFoodItem($event)"
            (validationError)="showError($event)"
          ></app-food-form>

          <app-food-table
            [foodItems]="foodItems"
            (removeFood)="removeFoodItem($event)"
          ></app-food-table>

          <div class="summary">
            <h3>Daily Total: {{ getTotalCalories() }} calories</h3>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .calorie-tracker-container {
        padding: 16px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .summary {
        margin-top: 24px;
        text-align: right;
      }

      @media screen and (max-width: 600px) {
        .calorie-tracker-container {
          padding: 8px;
        }

        .summary {
          margin-top: 16px;
        }
      }
    `,
  ],
})
export class CalorieTrackerComponent {
  foodItems: FoodItem[] = [];

  constructor(private snackBar: MatSnackBar) {}

  addFoodItem(food: FoodItem) {
    this.foodItems = [...this.foodItems, food];
    this.showSuccess('Food item added successfully');
  }

  removeFoodItem(index: number) {
    this.foodItems = this.foodItems.filter((_, i) => i !== index);
    this.showSuccess('Food item removed');
  }

  getTotalCalories(): number {
    return this.foodItems.reduce((total, item) => total + item.calories, 0);
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }
}
