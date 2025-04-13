import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mealTime',
  standalone: true,
})
export class MealTimePipe implements PipeTransform {
  transform(value: string): string {
    switch (value.toLowerCase()) {
      case 'breakfast':
        return '🌅 Breakfast';
      case 'lunch':
        return '☀️ Lunch';
      case 'dinner':
        return '🌙 Dinner';
      case 'snack':
        return '🍎 Snack';
      default:
        return value;
    }
  }
}
