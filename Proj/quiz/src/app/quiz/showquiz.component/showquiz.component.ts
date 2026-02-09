import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {showQuizRequest} from '../Dto/show-quizRequest';
import {QuizResponse} from '../Dto/show-quizResponce';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowQuizService} from '../quizService/show-quiz.service';

@Component({
  selector: 'app-showquiz-component',
  imports: [],
  templateUrl: './showquiz.component.html',
  styleUrl: './showquiz.component.scss',
})
export class ShowquizComponent implements OnInit {

  quizReq: showQuizRequest = {id: 0};
  quiz?: QuizResponse;

  constructor(private router: ActivatedRoute, private quizService: ShowQuizService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.quizReq.id = Number(this.router.snapshot.paramMap.get('id'));
    this.loadQuiz();

  }

  loadQuiz(){
    this.quizService.getQuizById(this.quizReq).subscribe(res => {
      this.quiz = res;
      console.log(res);
      this.cdr.detectChanges();
    })
  }

}
