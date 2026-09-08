import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginResponseType, DefaultResponseType} from "../../../../types";
import {TypeGuardUtil} from "../../../shared";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  protected readonly _signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^([А-ЯЁ][а-яё]+)(\s[А-ЯЁ][а-яё]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-ZА-Я])(?=.*\d).{8,}$/)]],
    agree: [false, [Validators.requiredTrue]]
  });
  protected _showPassword: boolean = false;

  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly _snackBar: MatSnackBar,
              private readonly router: Router) {
  }

  protected _signup(): void {
    if (this._signupForm.valid && this._signupForm.value.name && this._signupForm.value.email
      && this._signupForm.value.password) {
      this.authService.signup(this._signupForm.value.name, this._signupForm.value.email, this._signupForm.value.password)
        .subscribe({
          next: (data: DefaultResponseType | LoginResponseType) => {
            if (TypeGuardUtil.isDefaultResponse(data)) {
              this._snackBar.open(data.message);
              throw new Error(data.message);
            }

            this.authService.setTokens(data.accessToken, data.refreshToken);
            this.authService.userId = data.userId;
            this._snackBar.open('Вы успешно зарегистрировались');
            this.router.navigate(['/']);
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка регистрации');
            }
          }
        });
    }
  }
}
