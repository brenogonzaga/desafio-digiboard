import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { Login, Token } from '../../interfaces/auth';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginData: Login = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };
    this.authService.login(loginData).subscribe(
      (response) => {
        const { access_token, type, name } = response.body;
        this.handleLoginSuccess(access_token, type, name);
      },
      (error) => {
        this.handleLoginFailure();
      },
    );
  }

  handleLoginSuccess(access_token: string, token_type: string, name: string) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('token_type', token_type);
    localStorage.setItem('name', name);
    this.messageService.add({
      severity: 'success',
      summary: 'Login Success',
      detail: 'You have successfully logged in',
    });

    this.router.navigate(['/dashboard']);

    // this.authService.user = { userName, role, accessToken };
    // if (role === 'admin') {
    //   this.router.navigate(['/admin']);
    //   return;
    // }
    // this.router.navigate(['/']);
  }

  handleLoginFailure() {
    this.messageService.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: 'Invalid email or password',
    });
  }
}
