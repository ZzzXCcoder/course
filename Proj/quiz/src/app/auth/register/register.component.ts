import { Component } from '@angular/core';
import {FormsModule, FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {registerValidator} from './registerValidators/registerValidator';

@Component({
  selector: 'app-register.component',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  loginForm:FormGroup;
  constructor() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required, registerValidator] ),
      userPassword: new FormControl('', [Validators.required, registerValidator]),
    })
  }

   getErrors(controlName: string) : string[]  {
    let contorl = this.loginForm.get(controlName);
    let errors: string[] = [];
    if (!contorl || !contorl.errors) {
      return errors;
    }
    if (contorl.errors['required']) {
      errors.push('Поле должно быть обязательно заполнено');
    }
    if (contorl.errors['tooShort']) {
      errors.push('Слишком коротко должно быть больше 3 символов')
    }
    if (contorl.errors['tooLong']) {
      errors.push('Слишком длинное надо меньше 20 символов')
    }
    if (contorl.errors['missingUpperCase']) {
      errors.push('Должны быть заглавные буквы')
    }
    if (contorl.errors['missingNumber']) {
      errors.push('В поле должны быть цифры')
    }
    return errors;
  }

}

