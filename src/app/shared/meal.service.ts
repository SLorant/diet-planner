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
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { Meal } from './models';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private lastVisible: QueryDocumentSnapshot | null = null;
  private readonly PAGE_SIZE = 10;

  constructor(private firestore: Firestore, private authService: AuthService) {}

  async addMeal(meal: Meal): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser$);
      if (!user) {
        throw new Error('User not authenticated');
      }

      const mealCollection = collection(this.firestore, 'meals');
      await addDoc(mealCollection, {
        ...meal,
        userId: user.uid,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Error adding meal:', error);
      throw error;
    }
  }

  async getMeals(reset: boolean = true): Promise<Meal[]> {
    try {
      const user = await firstValueFrom(this.authService.currentUser$);
      if (!user) {
        throw new Error('User not authenticated');
      }

      const mealCollection = collection(this.firestore, 'meals');
      let q;

      if (reset) {
        this.lastVisible = null;
        q = query(
          mealCollection,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc'),
          limit(this.PAGE_SIZE)
        );
      } else if (this.lastVisible) {
        q = query(
          mealCollection,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc'),
          startAfter(this.lastVisible),
          limit(this.PAGE_SIZE)
        );
      } else {
        return [];
      }

      const querySnapshot = await getDocs(q);
      this.lastVisible =
        querySnapshot.docs[querySnapshot.docs.length - 1] || null;

      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data['name'],
          time: data['time'],
          foods: data['foods'],
          calories: data['calories'],
        } as Meal;
      });
    } catch (error) {
      console.error('Error fetching meals:', error);
      throw error;
    }
  }

  async getMealsByTime(time: string): Promise<Meal[]> {
    try {
      const user = await firstValueFrom(this.authService.currentUser$);
      if (!user) {
        throw new Error('User not authenticated');
      }

      const mealCollection = collection(this.firestore, 'meals');
      const q = query(
        mealCollection,
        where('userId', '==', user.uid),
        where('time', '==', time),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data['name'],
          time: data['time'],
          foods: data['foods'],
          calories: data['calories'],
        } as Meal;
      });
    } catch (error) {
      console.error('Error fetching meals by time:', error);
      throw error;
    }
  }

  async deleteMeal(mealId: string): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser$);
      if (!user) {
        throw new Error('User not authenticated');
      }

      const mealDoc = doc(this.firestore, 'meals', mealId);
      await deleteDoc(mealDoc);
    } catch (error) {
      console.error('Error deleting meal:', error);
      throw error;
    }
  }

  async updateMeal(meal: Meal): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser$);
      if (!user) {
        throw new Error('User not authenticated');
      }

      if (!meal.id) {
        throw new Error('Meal ID is required for update');
      }

      const mealDoc = doc(this.firestore, 'meals', meal.id);
      await updateDoc(mealDoc, {
        name: meal.name,
        time: meal.time,
        foods: meal.foods,
        calories: meal.calories,
      });
    } catch (error) {
      console.error('Error updating meal:', error);
      throw error;
    }
  }

  async getMealStats(): Promise<{ totalCalories: number; totalMeals: number }> {
    try {
      const user = await firstValueFrom(this.authService.currentUser$);
      if (!user) {
        throw new Error('User not authenticated');
      }

      const mealCollection = collection(this.firestore, 'meals');
      const q = query(mealCollection, where('userId', '==', user.uid));

      const querySnapshot = await getDocs(q);
      const meals = querySnapshot.docs.map((doc) => doc.data() as Meal);

      const totalCalories = meals.reduce(
        (sum, meal) => sum + (meal.calories || 0),
        0
      );
      const totalMeals = meals.length;

      return { totalCalories, totalMeals };
    } catch (error) {
      console.error('Error fetching meal stats:', error);
      throw error;
    }
  }
}
