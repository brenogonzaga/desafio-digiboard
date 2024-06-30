import { Component } from '@angular/core';
import { UserService } from '../../../../service/users.service';
import { User } from '../../../../interfaces/users';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: User | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.me().subscribe((user) => {
      this.user = user;
    });
  }
}
