import { Component, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/users';
import { UserService } from '../../../../service/users.service';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [TableModule, RouterLink, ButtonModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers(0, 10).subscribe((data) => {
      this.users = data;
    });
  }

  deleteUser(user: User): void {
    console.log(`Excluindo usuário: ${user.name}`);
  }
}
