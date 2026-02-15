import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowQuizAnswersComponent} from'../show-quizAnswers.component/show-quizAnswers.component';
import {ShowquizSendAnswerComponent} from '../showquizSendAnswer.component/showquizSendAnswer.component';

@Component({
  selector: 'app-quiz-page-component',
  templateUrl: './quiz-page-component.html',
  styleUrls: ['./quiz-page-component.scss'],

  imports: [
    ShowquizSendAnswerComponent,
    ShowQuizAnswersComponent
  ]
})
export class QuizPageComponent implements OnInit {
  quizId: number = 0;

  constructor(private route: ActivatedRoute, private routeTo:Router) {}

  ngOnInit(): void {
    this.quizId = Number(this.route.snapshot.paramMap.get('id'));
  }

  protected RedirectToAnswerQuiz() {
    this.routeTo.navigate([`quiz/${this.quizId}`]);
  }
}
