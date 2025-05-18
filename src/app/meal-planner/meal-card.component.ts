import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MealTimePipe } from '../shared/meal-time.pipe';
import { CalorieFormatPipe } from '../shared/calorie-format.pipe';
import { HighlightDirective } from '../shared/highlight.directive';
import { Meal } from '../shared/models';

@Component({
  selector: 'app-meal-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MealTimePipe,
    CalorieFormatPipe,
    HighlightDirective,
  ],
  template: `
    <mat-card class="meal-card" appHighlight>
      <mat-card-header>
        <mat-card-title>{{ meal.name }}</mat-card-title>
        <mat-card-subtitle>{{ meal.time | mealTime }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <ul>
          <li *ngFor="let food of meal.foods">{{ food }}</li>
        </ul>
        <p>Total Calories: {{ meal.calories | calorieFormat }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-icon-button color="warn" (click)="onDelete.emit(meal)">
          <mat-icon>delete</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .meal-card {
        margin-bottom: 20px;
        background-color: #fff;
        transition: background-color 0.3s ease;
      }
      mat-card-subtitle {
        color: #000000 !important;
      }

      ul {
        list-style-type: none;
        padding: 0;
      }

      li {
        margin-bottom: 5px;
        padding: 5px 0;
        border-bottom: 1px solid #eee;
      }
    `,
  ],
})
export class MealCardComponent {
  @Input() meal!: Meal;
  @Output() onDelete = new EventEmitter<Meal>();
}
