import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ShowQuizService} from '../quizService/show-quiz.service';
import {ShowQuizDto} from '../Dto/show-quizRequestDto';
import {RangeItemResponse, ShowQuizResponse} from '../Dto/show-quizResponceDto';
import {Option} from '@angular/cli/src/command-builder/utilities/json-schema';

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
      items: new FormArray([]),
      totalCount: new FormControl(),
      pageNumber: new FormControl(),
      pageSize: new FormControl(),
      totalPage: new FormControl(),
      hasPreviousPage: new FormControl(),
      hasNextPage: new FormControl(),
    })
  }

  ngOnInit() {
    const showQuizDto: ShowQuizDto = {
      pageNumber: 1,
      pageSize: 5
    };
    this.showQuizService.showQuizes(showQuizDto).subscribe(res => {
      console.log(res);
      this.setFormData(res);
      console.log(this.showQuizesForm);
    });
  }
  setFormData(res: ShowQuizResponse) {
    // обновляем метаданные страницы
    this.showQuizesForm.patchValue({
      totalCount: res.totalCount,
      pageNumber: res.pageNumber,
      pageSize: res.pageSize,
      totalPage: res.totalPages,
      hasPreviousPage: res.hasPreviousPage,
      hasNextPage: res.hasNextPage
    });

    const quizArray = this.showQuizesForm.get('items') as FormArray;
    quizArray.clear();

    res.items.forEach(item => {
      const quizGroup = new FormGroup({
        id: new FormControl(item.id),
        name: new FormControl(item.name),
        description: new FormControl(item.description),
        items: new FormArray<FormGroup>([])
      });

      const questionsArray = quizGroup.get('items') as FormArray;

      item.items.forEach(q => {
        let questionGroup: FormGroup;

        switch (q.type) {
          case "text":
            questionGroup = new FormGroup({
              type: new FormControl(q.type),
              id: new FormControl(q.id),
              quizId: new FormControl(q.quizId),
              placeholder: new FormControl((q as any).placeholder || '')
            });
            break;

          case "range":
            questionGroup = new FormGroup({
              type: new FormControl(q.type),
              id: new FormControl(q.id),
              quizId: new FormControl(q.quizId),
              min: new FormControl((q as RangeItemResponse).min),
              max: new FormControl((q as RangeItemResponse).max)
            });
            break;

          case "select":
            const optionsArray = new FormArray<FormControl>(
              (q.options || []).map(opt => new FormControl(opt))
            );

            questionGroup = new FormGroup({
              type: new FormControl(q.type),
              id: new FormControl(q.id),
              quizId: new FormControl(q.quizId),
              options: optionsArray
            });
            break;

        }

        questionsArray.push(questionGroup);
      });

      quizArray.push(quizGroup);
    });
  }

}


