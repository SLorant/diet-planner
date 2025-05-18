import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FoodItem } from '../shared/models';
import { FoodFormComponent } from './food-form.component';
import { FoodTableComponent } from './food-table.component';
import { FoodService } from '../shared/food.service';

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
            [editItem]="editingFoodItem"
            (validationError)="showError($event)"
            (foodAdded)="onFoodAdded()"
            (foodUpdated)="onFoodUpdated()"
            (editCancelled)="onEditCancelled()"
          ></app-food-form>

          <app-food-table
            [foodItems]="foodItems"
            (removeFood)="removeFoodItem($event)"
            (editFood)="startEditing($event)"
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
export class CalorieTrackerComponent implements OnInit {
  foodItems: FoodItem[] = [];
  editingFoodItem: FoodItem | null = null;

  constructor(
    private snackBar: MatSnackBar,
    private foodService: FoodService
  ) {}

  async ngOnInit() {
    await this.loadFoodItems();
  }

  private async loadFoodItems() {
    try {
      this.foodItems = await this.foodService.getFoodItems();
    } catch (error) {
      this.showError('Failed to load food items');
    }
  }

  async onFoodAdded() {
    await this.loadFoodItems();
    this.showSuccess('Food item added successfully');
  }

  async onFoodUpdated() {
    await this.loadFoodItems();
    this.showSuccess('Food item updated successfully');
  }

  onEditCancelled() {
    this.editingFoodItem = null;
  }

  startEditing(foodItem: FoodItem) {
    this.editingFoodItem = foodItem;
  }

  async removeFoodItem(foodId: string) {
    try {
      await this.foodService.deleteFoodItem(foodId);
      await this.loadFoodItems();
      this.showSuccess('Food item removed');
    } catch (error) {
      this.showError('Failed to remove food item');
    }
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
