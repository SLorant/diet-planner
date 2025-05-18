import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private authInitialized = new BehaviorSubject<boolean>(false);
  authInitialized$ = this.authInitialized.asObservable();

  constructor(private auth: Auth, private router: Router) {
    // Subscribe to auth state changes
    onAuthStateChanged(this.auth, (user) => {
      console.log('Auth state changed:', user);
      this.currentUserSubject.next(user);
      this.authInitialized.next(true);

      if (!user) {
        // Only redirect to login if not authenticated and trying to access protected route
        const currentUrl = this.router.url;
        console.log('Current URL:', currentUrl);
        if (
          currentUrl !== '/login' &&
          currentUrl !== '/register' &&
          currentUrl !== '/dashboard'
        ) {
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: currentUrl },
          });
        }
      }
    });
  }

  async register(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/calorie-tracker']);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      const returnUrl =
        this.router.url.split('?returnUrl=')[1] || '/calorie-tracker';
      this.router.navigateByUrl(decodeURIComponent(returnUrl));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    const isAuth = this.currentUserSubject.value !== null;
    console.log(
      'isAuthenticated check:',
      isAuth,
      'Current user:',
      this.currentUserSubject.value
    );
    return isAuth;
  }
}
