import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginResponseType, DefaultResponseType} from "../../../../types";
import {HttpErrorResponse} from "@angular/common/http";
import {TypeGuardUtil} from "../../../shared";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  protected readonly _loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });
  protected _showPassword: boolean = false;

  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly _snackBar: MatSnackBar,
              private readonly router: Router) {
  }

  protected _login(): void {
    if (this._loginForm.valid && this._loginForm.value.email && this._loginForm.value.password) {
      this.authService.login(this._loginForm.value.email, this._loginForm.value.password, !!this._loginForm.value.rememberMe)
        .subscribe({
          next: (data: DefaultResponseType | LoginResponseType) => {
            if (TypeGuardUtil.isDefaultResponse(data)) {
              this._snackBar.open(data.message);
              throw new Error(data.message);
            }

            this.authService.setTokens(data.accessToken, data.refreshToken);
            this.authService.userId = data.userId;
            this._snackBar.open('Вы успешно авторизовались');
            this.router.navigate(['/']);
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка авторизации');
            }
          }
        });
    }
    this._loginForm
  }
}
