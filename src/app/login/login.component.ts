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
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
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
    RouterModule,
  ],
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form (ngSubmit)="onSubmit()" class="login-form">
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

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="isSubmitting"
            >
              <mat-icon>login</mat-icon>
              <span *ngIf="!isSubmitting">Login</span>
              <mat-spinner *ngIf="isSubmitting" diameter="20"></mat-spinner>
            </button>

            <div class="register-link">
              Don't have an account?
              <a routerLink="/register">Register here</a>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-container {
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

      .login-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px 0;
      }

      button[type='submit'] {
        margin-top: 8px;
      }

      .register-link {
        text-align: center;
        margin-top: 16px;
      }

      .register-link a {
        color: var(--primary-color);
        text-decoration: none;
        margin-left: 4px;
      }

      .register-link a:hover {
        text-decoration: underline;
      }

      @media screen and (max-width: 600px) {
        .login-container {
          padding: 8px;
        }
      }
    `,
  ],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  hidePassword = true;
  isSubmitting = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  async onSubmit() {
    if (!this.email || !this.password) {
      this.showError('Please fill in all fields');
      return;
    }

    try {
      this.isSubmitting = true;
      await this.authService.login(this.email, this.password);
      const returnUrl =
        this.route.snapshot.queryParams['returnUrl'] || '/calorie-tracker';
      this.router.navigateByUrl(returnUrl);
    } catch (error: any) {
      this.showError(error.message || 'Login failed. Please try again.');
    } finally {
      this.isSubmitting = false;
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
