import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let isLoggedIn = false;

  let currentUser = inject(UserService).currentUserValue();
  inject(UserService).isLoggedIn.subscribe( res=>
    {
      isLoggedIn = res;
    }
  );

  return isLoggedIn || currentUser != null ? true : inject(Router).navigateByUrl('/');
};
