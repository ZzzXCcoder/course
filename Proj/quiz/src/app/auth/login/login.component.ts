import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { Router } from '@angular/router';

import { LoginRequest } from '../Dto/authDtos';
import { AuthApi } from '../IAuthService/authapi';
import { AUTH_API } from '../authService/auth-token';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    userPassword: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(AUTH_API) private authService: AuthApi,
    private router: Router
  ) {}

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const data: LoginRequest = {
      username: this.loginForm.value.userName!,
      password: this.loginForm.value.userPassword!,
    };

    this.authService.login(data).subscribe({
      next: () => {
        alert('Вход выполнен');
        this.router.navigate(['/']);
      },
      error: err => {
        console.error(err);
        alert('Неверный логин или пароль');
      }
    });
  }
}
