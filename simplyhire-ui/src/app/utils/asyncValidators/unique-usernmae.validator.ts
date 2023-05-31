import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

export function UniqueUsername(user: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return user
      .checkUnique(control.value)
      .pipe(
        map((response:any) => (response.usernameExist ? { usernameExist: true } : null))
      );
  };
}
