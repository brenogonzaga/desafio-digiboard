import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    AvatarModule,
    BadgeModule,
    RippleModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  items: MenuItem[];

  constructor(private router: Router) {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard',
      },
      {
        label: 'Produtos',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'Novo',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/dashboard/add-product',
          },
          {
            label: 'Listar',
            icon: 'pi pi-fw pi-list',
            routerLink: '/dashboard/list-product',
          },
          {
            label: 'Produtos Pagos',
            icon: 'pi pi-fw pi-chart-bar',
            routerLink: '/dashboard/product-payment',
          },
          {
            label: 'Pagar Produto',
            icon: 'pi pi-fw pi-money-bill',
            routerLink: '/dashboard/add-product-payment',
          },
        ],
      },
      {
        label: 'Usuários',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Novo',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: '/dashboard/add-user',
          },
          {
            label: 'Listar',
            icon: 'pi pi-fw pi-users',
            routerLink: '/dashboard/list-user',
          },
        ],
      },
      {
        label: 'Perfil',
        icon: 'pi pi-fw pi-id-card',
        items: [
          {
            label: 'Minha Conta',
            icon: 'pi pi-fw pi-user',
            routerLink: '/dashboard/my-profile',
          },
          {
            label: 'Sair',
            icon: 'pi pi-fw pi-power-off',
            command: () => this.logout(),
          },
        ],
      },
    ];
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  getName() {
    return localStorage.getItem('name');
  }
}
