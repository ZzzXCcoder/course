import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ShowQuizService} from '../quizService/show-quiz.service';
import {ShowQuizDto} from '../Dto/show-quizRequestDto';
import {ShowQuizResponse} from '../Dto/show-quizResponceDto';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-showquizes',
  templateUrl: './showquizes.component.html',
  standalone : true,
  imports: [
    FormsModule,
  ],
  styleUrls: ['./showquizes.component.scss']
})
export class ShowquizesComponent implements OnInit{
  quizes: ShowQuizResponse['items'] = [];
  quizesPage?: ShowQuizResponse;
  size : number = 5;
  dto: ShowQuizDto = { pageNumber: 1, pageSize: 5 };

  constructor(private showQuizService: ShowQuizService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    debugger
    this.loadQuizes();
  }
  loadQuizes() {
    this.showQuizService.showQuizes(this.dto).subscribe(res => {
      this.quizesPage = res;
      this.quizes = res.items;
      console.log(this.quizes);
      this.cdr.detectChanges();
    });

  }

  nextPageNumber() {
    debugger
    if (!this.quizesPage) return;

    if (!this.quizesPage.hasNextPage) {
      return;
    }

    this.dto.pageNumber++;
    this.loadQuizes();
  }

  prevPageNumber() {
    debugger
    if (!this.quizesPage) return;

    if (!this.quizesPage.hasPreviousPage) {
      return;
    }
    this.dto.pageNumber--;
    this.loadQuizes();
  }
  changePageSize() {
    debugger
    this.dto.pageSize = this.size;
    this.loadQuizes();
  }
}
