import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ColumnDef, FoodItem } from '../shared/models';

@Component({
  selector: 'app-food-table',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  template: `
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
            <button mat-icon-button color="warn" (click)="removeFood.emit(i)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
  styles: [
    `
      .table-container {
        overflow-x: auto;
        margin: 0 -16px;
      }

      .food-table {
        width: 100%;
        min-width: 600px;
      }

      @media screen and (max-width: 600px) {
        .table-container {
          margin: 0 -8px;
        }

        .food-table {
          min-width: 450px;
        }
      }
    `,
  ],
})
export class FoodTableComponent {
  @Input() foodItems: FoodItem[] = [];
  @Output() removeFood = new EventEmitter<number>();

  columnDefs: ColumnDef[] = [
    { header: 'Food Item', field: 'name', type: 'text' },
    { header: 'Calories', field: 'calories', type: 'number' },
    { header: 'Protein (g)', field: 'protein', type: 'number' },
    { header: 'Carbs (g)', field: 'carbs', type: 'number' },
    { header: 'Fat (g)', field: 'fat', type: 'number' },
    { header: 'Actions', field: 'actions', type: 'button' },
  ];

  displayedColumns: string[] = this.columnDefs.map((def) => def.field);
}
