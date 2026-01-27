import {Routes} from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import {authGuard, nonAuthGuard} from './guards/auth.guard';
import {LoginComponent} from './auth/login/login.component';
import {QuizComponent} from './quiz/quiz.component/quiz.component';


//TODO: бегит пресс качат выход из системы me показывать квизы просмотр 1 квиза Ответы на квизы Просмотр ответов на квизы верстку все я адихать
// Жду фидбек( надеюсь все к следующей неделе уже сделаю с красивой версткой

export const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [nonAuthGuard] },
  {path: 'login', component: LoginComponent, canActivate: [nonAuthGuard] },
  {path: 'quiz', component: QuizComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }
];
