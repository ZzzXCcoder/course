import {Component, inject, OnInit} from '@angular/core';
import {AuthState} from '../states/auth-state.service';
import {AuthService} from '../auth/authService/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navcomponent',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  private router = inject(Router);
  constructor() {

  }



  navigateToMainPage() {
    this.router.navigate(['/showQuiz']);
  }
  createQuizPage(){
    this.router.navigate(['/quiz']);
  }
}
