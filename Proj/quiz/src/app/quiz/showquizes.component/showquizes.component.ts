import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ShowQuizService} from '../quizService/show-quiz.service';
import {ShowQuizDto} from '../Dto/show-quizRequestDto';

@Component({
  selector: 'app-showquizes',
  imports: [],
  templateUrl: './showquizes.component.html',
  styleUrl: './showquizes.component.scss',
})
export class ShowquizesComponent {
  showQuizesForm: FormGroup;
  constructor(private showQuizService: ShowQuizService) {
     this.showQuizesForm = new FormGroup({
      items : new FormArray([]),
      totalCount : new FormControl('totalCount'),
      pageNumber : new FormControl('pageNumber'),
      pageSize : new FormControl('pageSize'),
      totalPage : new FormControl('totalPage'),
      hasPreviousPage : new FormControl('hasPreviousPage'),
      hasNextPage : new FormControl('hasNextPage'),
    })
  }
  ngOnInit() {
    const showQuizDto: ShowQuizDto = {
      pageNumber: 1,
      pageSize: 5
    };
    this.showQuizService.showQuizes(showQuizDto).subscribe(res =>{
      console.log(res);
    });

  }
}
