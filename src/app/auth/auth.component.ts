import {Component, inject, effect} from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Login</h1>
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" formControlName="username">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" formControlName="password">
      </div>
      <button type="submit" [disabled]="!loginForm.valid">Login</button>
    </form>
  `,
})
export default class AuthComponent {
  protected readonly loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['cat-facts']);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(true); // ??
    }
  }
}
