import {ChangeDetectorRef, Component} from '@angular/core';
import {ShowQuizService} from '../quizService/show-quiz.service';
import {ShowQuizDto} from '../Dto/show-quizRequestDto';
import {RangeItemResponse, ShowQuizResponse} from '../Dto/show-quizResponceDto';


@Component({
  selector: 'app-showquizes',
  templateUrl: './showquizes.component.html',
  styleUrls: ['./showquizes.component.scss']
})
export class ShowquizesComponent {
  quizes: ShowQuizResponse['items'] = [];

  constructor(private showQuizService: ShowQuizService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const dto: ShowQuizDto = { pageNumber: 1, pageSize: 5 };
    this.showQuizService.showQuizes(dto).subscribe(res => {
      this.quizes = res.items;
      console.log(this.quizes);
      this.cdr.detectChanges();
    });
  }
}


