import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { passwordMatchValidator } from '../../utils/validators/password-match-validator';
import { AuthService } from '../../service/auth.service';
import { Signup } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator },
  );

  isSignupPage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.isSignupPage = this.router.url.includes('/login');
  }

  get name() {
    return this.signupForm.controls.name;
  }

  get email() {
    return this.signupForm.controls.email;
  }

  get password() {
    return this.signupForm.controls.password;
  }

  get confirmPassword() {
    return this.signupForm.controls.confirmPassword;
  }

  get passwordMismatch() {
    return this.signupForm.hasError('passwordMismatch');
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    const signupData = {
      name: this.signupForm.value.name || '',
      email: this.signupForm.value.email || '',
      password: this.signupForm.value.password || '',
    };
    this.authService.signup(signupData).subscribe(
      (response) => {
        if (response.status === 201) {
          this.messageService.add({
            severity: 'success',
            summary: 'Signup Success',
            detail: 'You have successfully signed up',
          });
          this.signupForm.reset();
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Signup Failed',
          detail: error.error.message,
        });
      },
    );
  }
}
