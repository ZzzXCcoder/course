import {Routes} from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import {authGuard, nonAuthGuard} from './guards/auth.guard';
import {LoginComponent} from './auth/login/login.component';
import {CreateQuizComponent} from './quiz/quiz.component/create-quiz.component';
import {ShowquizesComponent} from './quiz/showquizes.component/showquizes.component';
import {ShowquizComponent} from './quiz/showquiz.component/showquiz.component';


//TODO: бегит пресс качат выход из системы просмотр 1 квиза Ответы на квизы Просмотр ответов на квизы верстку все я адихать
// Жду фидбек( надеюсь все к следующей неделе уже сделаю с красивой версткой

export const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [nonAuthGuard] },
  {path: 'login', component: LoginComponent, canActivate: [nonAuthGuard] },
  {path: 'quiz', component: CreateQuizComponent, canActivate: [authGuard] },
  {path: 'showQuiz', component: ShowquizesComponent, canActivate: [authGuard] },
  { path: 'quiz/:id', component: ShowquizComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }
];
