import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function equalsPass(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordsNotMatch: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  form = new FormGroup({
    login: new FormGroup(
      {
        email: new FormControl('', {
          validators: [Validators.email, Validators.required],
        }),
        password: new FormControl('', {
          validators: [Validators.minLength(6), Validators.required],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.minLength(6), Validators.required],
        }),
      },
      {
        validators: [equalsPass],
      }
    ),

    name: new FormGroup({
      firstName: new FormControl('', {
        validators: [Validators.minLength(2)],
      }),
      lastName: new FormControl('', {
        validators: [Validators.minLength(2)],
      }),
    }),

    address: new FormGroup({
      addressStreet: new FormControl('', {
        validators: [Validators.minLength(4)],
      }),
      addressNumber: new FormControl('', {
        validators: [Validators.minLength(1)],
      }),
      addressPostalCode: new FormControl('', {
        validators: [Validators.minLength(4)],
      }),
      addressCity: new FormControl('', {
        validators: [Validators.minLength(4)],
      }),
    }),

    yourRole: new FormControl('student', {
      validators: [Validators.required],
    }),

    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),

    isAgree: new FormControl(false, {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    if (this.form.invalid) return;
    console.log(this.form.value);

    this.form.reset();
  }
}
