import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import {NavComponent} from './nav.component/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    RouterOutlet,
    NavComponent,
  ],
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('quiz');
}
