import {AbstractControl, ValidationErrors} from '@angular/forms';

export function registerValidator(controls: AbstractControl):ValidationErrors | null{
  const value: string | null = controls.value;
  if (!value) {
    return null;
  }
  let errors: ValidationErrors = {};
  if (value.length < 3) {
    errors['tooShort'] = true;
  }
  if (value.length > 20) {
    errors['tooLong'] = true;
  }
  if (!/[A-Z]/.test(value)) {
    errors['missingUpperCase'] = true;
  }
  if(!/[0-9]/.test(value)) {
    errors['missingNumber'] = true;
  }
  return  Object.keys(errors).length ? errors : null;
}

