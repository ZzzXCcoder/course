import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowQuizService } from '../quizService/show-quiz.service';
import { QuizResponseModelPagedResult, QuizResponseModel } from '../Dto/show-quizAnswerResponce';

@Component({
  selector: 'show-quizAnswers',
  templateUrl: './show-quizAnswers.component.html',
  styleUrls: ['./show-quizAnswers.component.scss']
})
export class ShowQuizAnswersComponent implements OnInit {
  @Input() quizId!: number;
  pageNumber: number = 1;
  pageSize: number = 3;

  answers: QuizResponseModel[] = [];
  totalPages: number = 0;
  loadingAnswers: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private quizService: ShowQuizService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.quizId = Number(this.router.snapshot.paramMap.get('id'));
    this.loadAnswers();
  }

  loadAnswers(): void {
    if (this.loadingAnswers) return;
    this.loadingAnswers = true;

    this.quizService.getQuizAnswersById(this.quizId, this.pageNumber, this.pageSize)
      .subscribe({
        next: (res: QuizResponseModelPagedResult) => {
          this.answers.push(...(res.items || []));
          this.totalPages = res.totalPages;
          this.loadingAnswers = false;
          this.cdr.detectChanges();
        },
        error: err => {
          console.error('Ошибка при загрузке ответов', err);
          this.loadingAnswers = false;
        }
      });
  }

  loadNextPage(): void {
    if (this.pageNumber >= this.totalPages) return;
    this.pageNumber++;
    this.loadAnswers();
  }
  getAnswerValues(answer: QuizResponseModel) {
    return Object.entries(answer.answers).map(([key, value]) => ({ key, value }));
  }
}
