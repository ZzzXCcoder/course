import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {showQuizRequest} from '../Dto/show-quizRequest';
import {QuizResponse} from '../Dto/show-quizResponce';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowQuizService} from '../quizService/show-quiz.service';
import {FormsModule} from '@angular/forms';
import {CreateAnswerDto} from '../Dto/createAnswerDto';
import {answerQuizService} from '../quizService/anwerQuiz.service';

@Component({
  selector: 'app-showquiz-component',
  imports: [
    FormsModule
  ],
  templateUrl: './showquizSendAnswer.component.html',
  styleUrl: './showquizSendAnswer.component.scss',
})
export class ShowquizSendAnswerComponent implements OnInit {
  isAnswering: boolean = false;
  quizReq: showQuizRequest = {id: 0};
  quiz?: QuizResponse;
  @Input() quizId!: number;
  answers: Record<number, string> = {};
  @Input() hideInputs!: boolean;
  constructor(private router: ActivatedRoute,
              private quizService: ShowQuizService,
              private cdr: ChangeDetectorRef,
              private answerQuizService: answerQuizService,
              private navigateRouter: Router) {}

  ngOnInit(): void {

    this.quizReq.id = Number(this.router.snapshot.paramMap.get('id'));
    this.loadQuiz();

  }

  loadQuiz(){
    this.quizService.getQuizById(this.quizReq).subscribe(res => {
      this.quiz = res;
      console.log(res);
      this.cdr.detectChanges();
      if (this.quiz) {
        this.quizId = Number(this.quiz.id);
      }
    })
  }
  protected sendAnswers() {
    if (!this.quiz) return;

    if (this.quiz.items.length > Object.keys(this.answers).length) {
      alert('Ответьте на все вопросы');
      return;
    }

    const answerReq: CreateAnswerDto = {
      id: this.quizId,
      answers: this.answers
    };

    this.answerQuizService.answerQuiz(answerReq).subscribe({
      next: result => {
        this.isAnswering = false;
        this.navigateRouter.navigateByUrl('/Showquiz/' + this.quizId);
      },
      error: err => {
        if (err.error?.message) {
          alert(err.error.message);
        } else {
          alert('Не удалось отправить ответы. Попробуйте позже.');
        }
      }
    });
  }

}
