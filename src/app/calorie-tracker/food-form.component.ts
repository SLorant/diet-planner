import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FoodItem } from '../shared/models';
import { FoodService } from '../shared/food.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-food-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <form class="input-form">
      <div class="form-row">
        <mat-form-field>
          <mat-label>Food Item</mat-label>
          <input
            matInput
            [(ngModel)]="foodItem.name"
            name="foodName"
            placeholder="Enter food name"
            [disabled]="isSubmitting"
          />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Calories</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="foodItem.calories"
            name="calories"
            placeholder="Enter calories"
            [disabled]="isSubmitting"
          />
        </mat-form-field>
      </div>

      <div class="form-row">
        <mat-form-field>
          <mat-label>Protein (g)</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="foodItem.protein"
            name="protein"
            placeholder="Enter protein"
            [disabled]="isSubmitting"
          />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Carbs (g)</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="foodItem.carbs"
            name="carbs"
            placeholder="Enter carbs"
            [disabled]="isSubmitting"
          />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Fat (g)</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="foodItem.fat"
            name="fat"
            placeholder="Enter fat"
            [disabled]="isSubmitting"
          />
        </mat-form-field>
      </div>

      <div class="form-actions">
        <button
          mat-raised-button
          color="primary"
          (click)="onSubmit()"
          [disabled]="isSubmitting"
        >
          <mat-icon>{{ isEditMode ? 'save' : 'add' }}</mat-icon>
          <span *ngIf="!isSubmitting"
            >{{ isEditMode ? 'Update' : 'Add' }} Food</span
          >
          <mat-spinner *ngIf="isSubmitting" diameter="20"></mat-spinner>
        </button>
        <button
          *ngIf="isEditMode"
          mat-raised-button
          color="warn"
          (click)="onCancel()"
          [disabled]="isSubmitting"
        >
          <mat-icon>cancel</mat-icon>
          <span>Cancel</span>
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
        gap: 16px;
        justify-content: flex-end;
      }

      .form-actions button {
        min-width: 120px;
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
  @Output() validationError = new EventEmitter<string>();
  @Output() foodAdded = new EventEmitter<void>();
  @Output() foodUpdated = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  foodItem: FoodItem = {
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };

  isSubmitting = false;
  isEditMode = false;

  constructor(private foodService: FoodService) {}

  @Input() set editItem(item: FoodItem | null) {
    if (item) {
      this.foodItem = { ...item };
      this.isEditMode = true;
    } else {
      this.resetForm();
    }
  }

  async onSubmit() {
    if (!this.foodItem.name) {
      this.validationError.emit('Please enter a food name');
      return;
    }
    if (this.foodItem.calories <= 0) {
      this.validationError.emit('Please enter a valid calorie amount');
      return;
    }
    if (
      this.foodItem.protein < 0 ||
      this.foodItem.carbs < 0 ||
      this.foodItem.fat < 0
    ) {
      this.validationError.emit('Nutritional values cannot be negative');
      return;
    }

    try {
      this.isSubmitting = true;
      if (this.isEditMode) {
        await this.foodService.updateFoodItem({ ...this.foodItem });
        this.foodUpdated.emit();
      } else {
        await this.foodService.addFoodItem({ ...this.foodItem });
        this.foodAdded.emit();
      }
      this.resetForm();
    } catch (error) {
      this.validationError.emit(
        `Failed to ${
          this.isEditMode ? 'update' : 'add'
        } food item. Please try again.`
      );
    } finally {
      this.isSubmitting = false;
    }
  }

  onCancel() {
    this.resetForm();
    this.editCancelled.emit();
  }

  private resetForm() {
    this.foodItem = {
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };
    this.isEditMode = false;
  }
}
