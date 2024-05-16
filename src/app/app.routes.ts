import { Routes } from '@angular/router';
import { CustomCarouselComponent } from './components/user/custom-carousel/custom-carousel.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { MissionListingComponent } from './components/mission/mission-listing/mission-listing.component';
import { authGuard } from './auth-guard/auth.guard';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';

export const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
    title:'title'
  },
  {
    path: 'register',
    component: RegistrationComponent,
    title: 'CI | Register',
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: 'CI | Forgot Password',
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    title: 'CI | Reset Password',
  },
  {
    path: 'mission-listing',
    component: MissionListingComponent,
    title: 'CI | Mission Listing',
    canActivate:[authGuard]
  },
  {
    path:'user-edit',
    component: UserEditComponent,
    title:'CI | User Edit',
    canActivate:[authGuard]
  }
];
