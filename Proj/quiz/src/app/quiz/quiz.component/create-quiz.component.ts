  import { Component } from '@angular/core';
  import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
  import {QuizItemRequest, QuizRequest, RangeItemRequest, SelectItemRequest, TextItemRequest} from '../Dto/create-quizRequestDto'
  import {QuizService} from '../quizService/quiz.service';

  @Component({
    selector: 'app-quiz',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule],
    templateUrl: './create-quiz.component.html',
    styleUrls: ['./create-quiz.component.scss']
  })

  export class CreateQuizComponent {

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
     public getQuestion() {
       return this.question.get('questions') as FormArray ;
     }
     setAddQuestionButtonFalse(){
       this.wantAddQuestion = true;
     }
     addQuestion(type:  'text' | 'range' | 'select') : void {

       let newQuestion : FormGroup;
       if (type === 'text') {
         debugger
         newQuestion = new FormGroup({
           type: new FormControl('text'),
           name: new FormControl('', Validators.required),
           description: new FormControl('', Validators.required),
         })
       }
       else if (type === 'range') {
         debugger
         newQuestion = new FormGroup({
           type: new FormControl('range'),
           name: new FormControl('', Validators.required),
           description: new FormControl('', Validators.required),
           min: new FormControl('', Validators.required),
           max : new FormControl('', Validators.required),
         })
       }
       else if (type === 'select') {
         debugger

         newQuestion = new FormGroup({
           type: new FormControl('select'),
           name: new FormControl('', Validators.required),
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
     getOptions(questionIndex : number) : FormArray | undefined {
       const questions = this.getQuestion();
       const question = questions.at(questionIndex) as FormGroup;

       if (question.get('type')?.value === 'select') {
         return  question.get('options') as FormArray;
       }
       return undefined;
     }
     addOption(questionIndex: number) {
       debugger;
       const questions = this.getQuestion();
       const question = questions.at(questionIndex) as FormGroup;

       if (question.get('type')?.value === 'select') {
         const options = question.get('options') as FormArray;
         options.push(new FormControl('', Validators.required));
       }
     }
    removeOption(questionIndex: number, optionIndex: number) {
      const questions = this.getQuestion();
      const question = questions.at(questionIndex) as FormGroup;
      const options = question.get('options') as FormArray;
      options.removeAt(optionIndex);
    }

     submit(){
       let quizDto = this.convertFromFormToDto()
       if (!quizDto) {
         debugger
         return;

       }
       else{
         console.log(JSON.stringify(quizDto, null, 2));
         debugger
         this.quizService.postQuizes(quizDto).subscribe({
           next: (res) => {

             this.question.reset();
             alert('Готова')
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
           return {
             type: 'text',
             title: q.name,
             description: q.description,
             placeholder: 'Введите текст'
           } as TextItemRequest;
         }
         else if (q.type === 'range') {
           return {
             type: 'range',
             title: q.name,
             description: q.description,
             min: q.min,
             max: q.max
           } as RangeItemRequest;
         }
         else if (q.type === 'select') {
           return {
             type: 'select',
             title: q.name,
             description: q.description,
             options: q.options ? q.options.map((o: any) => o) : []
           } as SelectItemRequest;
         }
         else{
           return {title: q.name, description: q.description};
         }
       })

       return {name: questionFormValue.name, description: questionFormValue.description, items: questuinsItemRequest}

     }


  }
