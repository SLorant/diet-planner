export interface Meal {
  name: string;
  time: string;
  foods: string[];
  calories: number;
}

interface FoodProperties {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface FoodItem extends FoodProperties {
  name: string;
}

export type ColumnDef = {
  header: string;
  field: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'button';
};
