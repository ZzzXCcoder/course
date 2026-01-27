import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {QuizItemRequest, QuizRequest} from '../Dto/quizRequestDto'
import {QuizService} from '../quizService/quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent {
  typeToAdd : 'text' | 'range' | 'select' = 'text';
   wantAddQuestion : boolean = false;
   question : FormGroup;
   constructor(private quizService: QuizService) {
     this.question = new FormGroup({
       name : new FormControl('', Validators.required),
       description : new FormControl('', Validators.required),
       questions: new FormArray([])
     });
   }
   public getQuestion()  {
     return this.question.get('questions') as FormArray ;
   }
   setAddQuestionButtonFalse(){
     this.wantAddQuestion = true;
   }
   addQuestion(type:  'text' | 'range' | 'select') : void {
     let newQuestion : FormGroup;
     if (type === 'text') {
       newQuestion = new FormGroup({
         type: new FormControl('text'),
         title: new FormControl('', Validators.required),
         description: new FormControl('', Validators.required),
       })
     }
     else if (type === 'range') {
       newQuestion = new FormGroup({
         type: new FormControl('range'),
         title: new FormControl('', Validators.required),
         description: new FormControl('', Validators.required),
         min: new FormControl('', Validators.required),
         max : new FormControl('', Validators.required),
       })
     }
     else if (type === 'select') {
       newQuestion = new FormGroup({
         type: new FormControl('select'),
         title: new FormControl('', Validators.required),
         description: new FormControl('', Validators.required),
         options : new FormArray([])
       })
     }
     else {
       newQuestion = new FormGroup({})
       return;
     }
     this.wantAddQuestion = false;
      this.getQuestion().push(newQuestion);
   }
   removeQuestion(index : number) {
     this.getQuestion().removeAt(index);
   }
   submit(){
     let quizDto = this.convertFromFormToDto()
     if (!quizDto) {
       return;
     }
     else{
       this.quizService.postQuizes(quizDto).subscribe({
         next: (res) => {
           this.question.reset();
         },
         error: (err) => {
           console.log(err);
         }
       })
     }
   }

   private convertFromFormToDto() : QuizRequest | null {

     let questionFormValue = this.question.value;
     let questuinsItemRequest: QuizItemRequest[] = questionFormValue.questions.map((q :any) => {
       if (q.type === 'text') {
         return {title: q.title, description: q.description, placeholder: q.placeholder};
       }
       else if (q.type === 'range') {
         return {title: q.title, description: q.description, min: q.min, max: q.max};
       }
       else if (q.type === 'select') {
         return {title: q.title, description: q.description, options: q.options };
       }
       else{
         return {title: q.title, description: q.description};
       }
     })
     return {name: questionFormValue.name, description: questionFormValue.description, items: questuinsItemRequest}

   }

  protected readonly FormGroup = FormGroup;
}
