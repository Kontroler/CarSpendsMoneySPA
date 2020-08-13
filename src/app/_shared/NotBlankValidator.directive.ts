import { ValidatorFn, AbstractControl } from '@angular/forms';

export function notBlankValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isBlankValue = isBlank(control.value);
    return isBlankValue ? { notBlank: { value: control.value } } : null;
  };
}

function isBlank(str) {
  return !str || /^\s*$/.test(str);
}
