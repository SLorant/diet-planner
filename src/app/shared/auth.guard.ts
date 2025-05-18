import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Auth guard started');

  try {
    // Wait for auth initialization
    await firstValueFrom(authService.authInitialized$);

    // Check if user is authenticated
    if (authService.isAuthenticated()) {
      console.log('Auth guard - allowing access');
      return true;
    }

    console.log('Auth guard - redirecting to login');
    // Redirect to login page with return url
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  } catch (error) {
    console.error('Auth guard error:', error);
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  }
};
