import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  // Функция валидации кастомная проверяет на наличие вопросительного знака
  if (control.value.includes('?')) {
    return null;
  }
  return { mustContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl) {
  // Функция валидации кастомная проверяет на уникальность email
  if (control.value !== 'test@example.com') {
    return of(null); // of() это функция из rxjs, которая создает Observable из переданного значения (null в данном случае)
  }
  return of({ emailIsUnique: true });
}

// второй вариант как заполнить занные полей формы
let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule], // Импортируем ReactiveFormsModule
})
export class LoginComponent implements OnInit {
  destroy = inject(DestroyRef); // Создаем ссылку на уничтожение

  form = new FormGroup({
    // Создаем форму чкркз FormGroup
    email: new FormControl('initialEmailValue', {
      // Создаем контроллер email через FormControl
      validators: [Validators.email, Validators.required], // Валидаторы email
      asyncValidators: [emailIsUnique], // Асинхронные валидаторы email
    }),
    password: new FormControl('', {
      // Создаем контроллер password через FormControl
      validators: [
        // Валидаторы password
        Validators.minLength(6),
        Validators.required,
        Validators.maxLength(20),
        (control) => {
          // Функция валидации проверяет на наличие  пробела
          return control.value.includes(' ') ? { hasSpace: true } : null;
        },
        mustContainQuestionMark, // Функция валидации проверяет на наличие вопросительного знака
      ],
    }),
  });

  get emailIsInvalid() {
    // Геттер для проверки валидации email
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordInvalid() {
    // Геттер для проверки валидации password
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  ngOnInit(): void {
    // первый вариант как заполнить занные полей формы
    // const savedForm = window.localStorage.getItem('saved-login-form');

    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   // this.form.setValue({ email: loadedForm.email, password: '' }); // Устанавливаем значение формы с email из локального хранилища и заполняет полученными данными форму (нужно ввести всю форму)
    //   this.form.patchValue({ email: loadedForm.email }); // Устанавливаем значение формы с email из локального хранилища и заполняет полученными данными форму (можно ввести частичные значения )
    // }

    const form = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      // Подписываемся на изменения формы
      next: (value) => {
        // Подписываемся на изменения формы
        console.log(value);
        window.localStorage.setItem(
          // Сохраняем форму в локальное хранилище
          'saved-login-form',
          JSON.stringify({ email: value.email })
        ); // Сохраняем форму в локальное хранилище
      },
      error: (error) => console.error(error),
      complete: () => console.log('Completed'),
    });

    this.destroy.onDestroy(() => {
      form.unsubscribe();
    });

    // afterNextRender(() => {});
  }

  onSubmit() {
    // Функция отправки формы
    const email = this.form.value.email;
    const password = this.form.value.password;
    console.log(this.form);
  }
}

// export class LoginComponent {
//   destroy = inject(DestroyRef); // Создаем ссылку на уничтожение
//   form = viewChild<NgForm>('form'); // Получаем форму через ViewChild

//   constructor() {
//     afterNextRender(() => {
//       // После следующего рендера
//       const safeForm = window.localStorage.getItem('saved-login-form'); // Получаем форму из локального хранилища
//       if (safeForm) {
//         const loadedForm = JSON.parse(safeForm); // Парсим форму
//         const saveEmail = loadedForm.email; // Получаем email

//         setTimeout(
//           () => this.form()?.setValue({ email: saveEmail, password: '' }),
//           1
//         ); // Устанавливаем значение формы с email из локального хранилища и заполняет полученными данными форму / засовываем в таймаут чтобы не было ошибки инициализации
//       }

//       const formSub = this.form() // Получаем форму
//         ?.valueChanges?.pipe(debounceTime(500)) // Debounce time of 500ms работает как задержка перед отправкой данных если пользователь не печатает 500мс то данные попадают в некст
//         .subscribe({
//           // Подписываемся на изменения формы
//           next: (value) => {
//             window.localStorage.setItem(
//               'saved-login-form',
//               JSON.stringify({ email: value.email })
//             ); // Сохраняем форму в локальное хранилище
//             console.log(value);
//           }, // Выводим в консоль значение
//           error: (error) => console.error(error), // Выводим в консоль ошибку
//           complete: () => console.log('Completed'), // Выводим в консоль завершение
//         });

//       this.destroy.onDestroy(() => {
//         // При уничтожении
//         formSub?.unsubscribe(); // Отписываемся от формы
//       });
//     });
//   }

//   onSubmit(formData: NgForm) {
//     if (formData.form.invalid) return console.log('Form is invalid');
//     const { email, password } = formData.form.value; // Получаем значения из формы
//     console.log(formData);
//     console.log(formData.form.value);

//     formData.form.reset(); // Сбрасываем форму
//   }
// }
