import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FoodItem } from '../shared/models';

@Component({
  selector: 'app-food-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  template: `
    <form class="input-form">
      <div class="form-row">
        <mat-form-field>
          <mat-label>Food Item</mat-label>
          <input
            matInput
            [(ngModel)]="newFoodItem.name"
            name="foodName"
            placeholder="Enter food name"
          />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Calories</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="newFoodItem.calories"
            name="calories"
            placeholder="Enter calories"
          />
        </mat-form-field>
      </div>

      <div class="form-row">
        <mat-form-field>
          <mat-label>Protein (g)</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="newFoodItem.protein"
            name="protein"
            placeholder="Enter protein"
          />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Carbs (g)</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="newFoodItem.carbs"
            name="carbs"
            placeholder="Enter carbs"
          />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Fat (g)</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="newFoodItem.fat"
            name="fat"
            placeholder="Enter fat"
          />
        </mat-form-field>
      </div>

      <div class="form-actions">
        <button mat-raised-button color="primary" (click)="onSubmit()">
          <mat-icon>add</mat-icon>
          Add Food
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      .input-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 24px;
      }

      .form-row {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
      }

      .form-row mat-form-field {
        flex: 1;
        min-width: 200px;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
      }

      @media screen and (max-width: 600px) {
        .form-row {
          gap: 8px;
        }

        .form-row mat-form-field {
          min-width: 100%;
        }
      }
    `,
  ],
})
export class FoodFormComponent {
  @Output() addFood = new EventEmitter<FoodItem>();
  @Output() validationError = new EventEmitter<string>();

  newFoodItem: FoodItem = {
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };

  onSubmit() {
    if (!this.newFoodItem.name) {
      this.validationError.emit('Please enter a food name');
      return;
    }
    if (this.newFoodItem.calories <= 0) {
      this.validationError.emit('Please enter a valid calorie amount');
      return;
    }
    if (
      this.newFoodItem.protein < 0 ||
      this.newFoodItem.carbs < 0 ||
      this.newFoodItem.fat < 0
    ) {
      this.validationError.emit('Nutritional values cannot be negative');
      return;
    }

    this.addFood.emit({ ...this.newFoodItem });
    this.resetForm();
  }

  private resetForm() {
    this.newFoodItem = {
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };
  }
}
