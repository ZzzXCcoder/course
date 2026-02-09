import {Component, inject, OnInit} from '@angular/core';
import {AuthState} from '../states/auth-state.service';
import {AuthService} from '../auth/authService/auth.service';

@Component({
  selector: 'app-navcomponent',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  authState: AuthState = inject(AuthState);
  constructor() {

  }

  ngOnInit(): void {

    }

  protected navigateToLogin() {

  }

  protected navigateToRegister() {

  }

  protected navigateToMainPage() {

  }
  createQuizPage(){

  }

  protected navigateToLogout() {

  }
}
