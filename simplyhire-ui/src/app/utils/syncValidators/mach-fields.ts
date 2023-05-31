import { FormGroup, ValidationErrors } from '@angular/forms';

export function Matchfield(
  firstControl: string,
  secondControl: string
): ValidationErrors {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const value = formGroup.controls[firstControl];
    const matchWithControlNameValue = formGroup.controls[secondControl];
    if (matchWithControlNameValue.value != value.value) {
      return { valueNotMached: true };
    }
    return null;
  };
}
