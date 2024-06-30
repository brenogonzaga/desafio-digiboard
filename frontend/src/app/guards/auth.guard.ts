import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  let token = localStorage.getItem('access_token');

  if (!token) {
    router.navigate(['/entrar']);
    return of(false);
  }

  return true;
};
