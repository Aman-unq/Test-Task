import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export const uniqueEmailValidator = (http: HttpClient): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;

    return http
      .get<any[]>('http://localhost:3000/signupdata?email=' + email)
      .pipe(
        map((users) => {
          const isDuplicate = users.length > 0;
          return isDuplicate ? { uniqueEmail: true } : null;
        }),
        catchError(() => of(null))
      );
  };
};
