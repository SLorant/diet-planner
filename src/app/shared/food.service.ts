import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { FoodItem } from './models';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  async addFoodItem(foodItem: FoodItem): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser$);
      if (!user) {
        throw new Error('User not authenticated');
      }

      const foodCollection = collection(this.firestore, 'foods');
      await addDoc(foodCollection, {
        ...foodItem,
        userId: user.uid,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Error adding food item:', error);
      throw error;
    }
  }

  async getFoodItems(): Promise<FoodItem[]> {
    try {
      const user = await firstValueFrom(this.authService.currentUser$);
      if (!user) {
        throw new Error('User not authenticated');
      }

      const foodCollection = collection(this.firestore, 'foods');
      const q = query(foodCollection, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data['name'],
          calories: data['calories'],
          protein: data['protein'],
          carbs: data['carbs'],
          fat: data['fat'],
        } as FoodItem;
      });
    } catch (error) {
      console.error('Error fetching food items:', error);
      throw error;
    }
  }

  async deleteFoodItem(foodId: string): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser$);
      if (!user) {
        throw new Error('User not authenticated');
      }

      const foodDoc = doc(this.firestore, 'foods', foodId);
      await deleteDoc(foodDoc);
    } catch (error) {
      console.error('Error deleting food item:', error);
      throw error;
    }
  }

  async updateFoodItem(foodItem: FoodItem): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser$);
      if (!user) {
        throw new Error('User not authenticated');
      }

      if (!foodItem.id) {
        throw new Error('Food item ID is required for update');
      }

      const foodDoc = doc(this.firestore, 'foods', foodItem.id);
      await updateDoc(foodDoc, {
        name: foodItem.name,
        calories: foodItem.calories,
        protein: foodItem.protein,
        carbs: foodItem.carbs,
        fat: foodItem.fat,
      });
    } catch (error) {
      console.error('Error updating food item:', error);
      throw error;
    }
  }
}
