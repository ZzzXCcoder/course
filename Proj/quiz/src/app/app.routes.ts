import {Routes} from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import {authGuard, nonAuthGuard} from './guards/auth.guard';
import {LoginComponent} from './auth/login/login.component';




export const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [nonAuthGuard] },
  {path: 'login', component: LoginComponent, canActivate: [nonAuthGuard] },
  { path: '**', redirectTo: '/login' }
];
