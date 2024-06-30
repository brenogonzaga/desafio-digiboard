import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SignupComponent } from '../components/signup/signup.component';
import { AddProductsComponent } from '../components/dashboard/products/add-products/add-products.component';
import { UpdateProductsComponent } from '../components/dashboard/products/update-products/update-products.component';
import { ListProductsComponent } from '../components/dashboard/products/list-products/list-products.component';
import { ListUsersComponent } from '../components/dashboard/users/list-users/list-users.component';
import { ListProductPaymentComponent } from '../components/dashboard/products/list-product-payment/list-product-payment.component';
import { UpdateUsersComponent } from '../components/dashboard/users/update-users/update-users.component';
import { ProfileComponent } from '../components/dashboard/users/profile/profile.component';
import { AddProductPaymentComponent } from '../components/dashboard/products/add-product-payment/add-product-payment.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'add-user',
        component: SignupComponent,
      },
      {
        path: 'list-user',
        component: ListUsersComponent,
      },
      {
        path: 'update-user/:id',
        component: UpdateUsersComponent,
      },
      {
        path: 'add-product',
        component: AddProductsComponent,
      },
      {
        path: 'update-product/:id',
        component: UpdateProductsComponent,
      },
      {
        path: 'list-product',
        component: ListProductsComponent,
      },
      {
        path: 'product-payment',
        component: ListProductPaymentComponent,
      },
      {
        path: 'my-profile',
        component: ProfileComponent,
      },
      {
        path: 'add-product-payment',
        component: AddProductPaymentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
