import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ColumnDef, FoodItem } from '../shared/models';

@Component({
  selector: 'app-calorie-tracker',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="calorie-tracker-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Calorie Tracker</mat-card-title>
        </mat-card-header>
        <mat-card-content>
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
              <button mat-raised-button color="primary" (click)="addFoodItem()">
                <mat-icon>add</mat-icon>
                Add Food
              </button>
            </div>
          </form>

          <div class="table-container">
            <table mat-table [dataSource]="foodItems" class="food-table">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>
                  {{ columnDefs[0].header }}
                </th>
                <td mat-cell *matCellDef="let item">{{ item.name }}</td>
              </ng-container>

              <ng-container matColumnDef="calories">
                <th mat-header-cell *matHeaderCellDef>
                  {{ columnDefs[1].header }}
                </th>
                <td mat-cell *matCellDef="let item">{{ item.calories }}</td>
              </ng-container>

              <ng-container matColumnDef="protein">
                <th mat-header-cell *matHeaderCellDef>
                  {{ columnDefs[2].header }}
                </th>
                <td mat-cell *matCellDef="let item">{{ item.protein }}</td>
              </ng-container>

              <ng-container matColumnDef="carbs">
                <th mat-header-cell *matHeaderCellDef>
                  {{ columnDefs[3].header }}
                </th>
                <td mat-cell *matCellDef="let item">{{ item.carbs }}</td>
              </ng-container>

              <ng-container matColumnDef="fat">
                <th mat-header-cell *matHeaderCellDef>
                  {{ columnDefs[4].header }}
                </th>
                <td mat-cell *matCellDef="let item">{{ item.fat }}</td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>
                  {{ columnDefs[5].header }}
                </th>
                <td mat-cell *matCellDef="let item; let i = index">
                  <button
                    mat-icon-button
                    color="warn"
                    (click)="removeFoodItem(i)"
                  >
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>
          </div>

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

      .table-container {
        overflow-x: auto;
        margin: 0 -16px;
      }

      .food-table {
        width: 100%;
        min-width: 600px;
      }

      .summary {
        margin-top: 24px;
        text-align: right;
      }

      @media screen and (max-width: 600px) {
        .calorie-tracker-container {
          padding: 8px;
        }

        .form-row {
          gap: 8px;
        }

        .form-row mat-form-field {
          min-width: 100%;
        }

        .table-container {
          margin: 0 -8px;
        }

        .food-table {
          min-width: 450px;
        }

        .summary {
          margin-top: 16px;
        }
      }
    `,
  ],
})
export class CalorieTrackerComponent {
  columnDefs: ColumnDef[] = [
    { header: 'Food Item', field: 'name', type: 'text' },
    { header: 'Calories', field: 'calories', type: 'number' },
    { header: 'Protein (g)', field: 'protein', type: 'number' },
    { header: 'Carbs (g)', field: 'carbs', type: 'number' },
    { header: 'Fat (g)', field: 'fat', type: 'number' },
    { header: 'Actions', field: 'actions', type: 'button' },
  ];

  displayedColumns: string[] = [
    this.columnDefs[0].field,
    this.columnDefs[1].field,
    this.columnDefs[2].field,
    this.columnDefs[3].field,
    this.columnDefs[4].field,
    this.columnDefs[5].field,
  ];
  foodItems: FoodItem[] = [];

  newFoodItem: FoodItem = {
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };

  constructor(private snackBar: MatSnackBar) {}

  addFoodItem() {
    if (!this.newFoodItem.name) {
      this.showError('Please enter a food name');
      return;
    }
    if (this.newFoodItem.calories <= 0) {
      this.showError('Please enter a valid calorie amount');
      return;
    }
    if (
      this.newFoodItem.protein < 0 ||
      this.newFoodItem.carbs < 0 ||
      this.newFoodItem.fat < 0
    ) {
      this.showError('Nutritional values cannot be negative');
      return;
    }

    this.foodItems = [...this.foodItems, { ...this.newFoodItem }];
    this.newFoodItem = {
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };
    this.showSuccess('Food item added successfully');
  }

  removeFoodItem(index: number) {
    this.foodItems = this.foodItems.filter((_, i) => i !== index);
    this.showSuccess('Food item removed');
  }

  getTotalCalories(): number {
    return this.foodItems.reduce((total, item) => total + item.calories, 0);
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
