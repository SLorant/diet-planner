import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calorieFormat',
  standalone: true,
})
export class CalorieFormatPipe implements PipeTransform {
  transform(value: number): string {
    return `${value} kcal`;
  }
}
