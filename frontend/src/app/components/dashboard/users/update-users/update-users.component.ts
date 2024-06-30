import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { passwordMatchValidator } from '../../../../utils/validators/password-match-validator';
import { UserService } from '../../../../service/users.service';
import { User } from '../../../../interfaces/users';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css'],
})
export class UpdateUsersComponent implements OnInit {
  updateUserForm = this.fb.group(
    {
      name: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['', [Validators.minLength(6)]],
    },
    { validators: passwordMatchValidator },
  );

  userId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe((user: User) => {
      this.updateUserForm.patchValue({
        name: user.name,
        email: user.email,
      });
    });
  }

  get name() {
    return this.updateUserForm.controls.name;
  }

  get email() {
    return this.updateUserForm.controls.email;
  }

  get password() {
    return this.updateUserForm.controls.password;
  }

  get confirmPassword() {
    return this.updateUserForm.controls.confirmPassword;
  }

  get passwordMismatch() {
    return this.updateUserForm.hasError('passwordMismatch');
  }

  onSubmit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const user = {
      name: this.name.value || '',
      email: this.email.value || '',
      password: this.password.value || '',
    };

    this.userService.updateUser(id, user).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User updated successfully',
        });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update user',
        });
      },
    );
  }
}
