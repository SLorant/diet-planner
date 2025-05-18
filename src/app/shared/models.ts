export interface Meal {
  id?: string;
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
  id?: string;
  name: string;
}

export interface ColumnDef {
  header: string;
  field: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'button';
}
