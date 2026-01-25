import { Component } from '@angular/core';
import {FormsModule, FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {registerValidator} from './registerValidators/registerValidator';
import {AuthService} from '../authService/auth.service'
import {RegisterRequest} from '../Dto/authDtos';

@Component({
  selector: 'app-register.component',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm:FormGroup;
  constructor(private authService: AuthService) {
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required, registerValidator] ),
      userPassword: new FormControl('', [Validators.required, registerValidator]),
    })
  }

   getErrors(controlName: string) : string[]  {
    let contorl = this.registerForm.get(controlName);
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
  submit(){

    console.log(this.registerForm.value)
    if (this.registerForm.invalid) {
      this.registerForm.markAsTouched();
      return;
    }
    const data: RegisterRequest = {
      username: this.registerForm.value.userName,
      password: this.registerForm.value.userPassword
    };
    this.authService.register(data).subscribe({
      next: () => alert('Logged in successfully!'),
      error: (err:any) => console.error(err)
    });
  }
}

