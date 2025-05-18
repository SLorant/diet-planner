import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="register-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Create Account</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form (ngSubmit)="onSubmit()" class="register-form">
            <mat-form-field>
              <mat-label>Email</mat-label>
              <input
                matInput
                type="email"
                [(ngModel)]="email"
                name="email"
                required
                placeholder="Enter your email"
              />
            </mat-form-field>

            <mat-form-field>
              <mat-label>Password</mat-label>
              <input
                matInput
                [type]="hidePassword ? 'password' : 'text'"
                [(ngModel)]="password"
                name="password"
                required
                placeholder="Enter your password"
              />
              <button
                mat-icon-button
                matSuffix
                (click)="hidePassword = !hidePassword"
                type="button"
              >
                <mat-icon>
                  {{ hidePassword ? 'visibility_off' : 'visibility' }}
                </mat-icon>
              </button>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Confirm Password</mat-label>
              <input
                matInput
                [type]="hideConfirmPassword ? 'password' : 'text'"
                [(ngModel)]="confirmPassword"
                name="confirmPassword"
                required
                placeholder="Confirm your password"
              />
              <button
                mat-icon-button
                matSuffix
                (click)="hideConfirmPassword = !hideConfirmPassword"
                type="button"
              >
                <mat-icon>
                  {{ hideConfirmPassword ? 'visibility_off' : 'visibility' }}
                </mat-icon>
              </button>
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="isSubmitting"
            >
              <mat-icon>person_add</mat-icon>
              <span *ngIf="!isSubmitting">Register</span>
              <mat-spinner *ngIf="isSubmitting" diameter="20"></mat-spinner>
            </button>

            <div class="login-link">
              Already have an account?
              <a routerLink="/login">Login here</a>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .register-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 16px;
        background-color: #f5f5f5;
      }

      mat-card {
        max-width: 400px;
        width: 100%;
      }

      .register-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px 0;
      }

      button[type='submit'] {
        margin-top: 8px;
      }

      .login-link {
        text-align: center;
        margin-top: 16px;
      }

      .login-link a {
        color: var(--primary-color);
        text-decoration: none;
        margin-left: 4px;
      }

      .login-link a:hover {
        text-decoration: underline;
      }

      @media screen and (max-width: 600px) {
        .register-container {
          padding: 8px;
        }
      }
    `,
  ],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  hidePassword = true;
  hideConfirmPassword = true;
  isSubmitting = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async onSubmit() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.showError('Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showError('Passwords do not match');
      return;
    }

    if (this.password.length < 6) {
      this.showError('Password must be at least 6 characters long');
      return;
    }

    try {
      this.isSubmitting = true;
      await this.authService.register(this.email, this.password);
      this.router.navigate(['/calorie-tracker']);
    } catch (error: any) {
      this.showError(this.getErrorMessage(error.code));
    } finally {
      this.isSubmitting = false;
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled';
      case 'auth/weak-password':
        return 'Password is too weak';
      default:
        return 'Registration failed. Please try again.';
    }
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}
