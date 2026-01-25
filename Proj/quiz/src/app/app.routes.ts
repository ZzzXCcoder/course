import {Routes} from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import {authGuard} from './guards/auth.guard';


export const routes: Routes = [
  {canActivate: [authGuard]},
  { path: 'register', component: RegisterComponent },
];
