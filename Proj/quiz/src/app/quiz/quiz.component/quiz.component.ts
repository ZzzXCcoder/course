import { Component, signal } from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {QuizItemRequest} from '../Dto/quizRequestDto'

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent {

  createQuizForm: FormGroup;
  constructor() {
    const quizType:  'range' | 'select' | 'text' = 'text';
    this.createQuizForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      items: new FormArray<FormGroup>([]),
    })
  }
  selectType(){

  }
  buildFormforType(quizType:  'range' | 'select' | 'text', item : FormGroup) : void {
      Object.keys(item).forEach(key => {
        item.removeControl(key);
      })
    if (quizType === 'range') {
      item.addControl('min', new FormControl(0, Validators.required));
      item.addControl('max', new FormControl(0, Validators.required));
    }
    if (quizType === 'select') {
      
    }
  }
}
