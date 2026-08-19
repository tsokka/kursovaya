import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user.service";
import {UserInfoType} from "../../../../types/user-info.type";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  userName: string | null = null;

  constructor(private authService: AuthService,
              private userService: UserService,
              private _snackBar: MatSnackBar,
              private router: Router) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
      if (isLoggedIn) {
        this.loadUserName();
      } else {
        this.userName = null;
      }
    });

    if (this.isLogged) {
      this.loadUserName();
    }
  }

  private loadUserName(): void {
    const savedName = this.authService.userName;
    if (savedName) {
      this.userName = savedName;
      return;
    }

    this.userService.getUserInfo()
      .subscribe((data: UserInfoType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          return;
        }
        const userInfo = data as UserInfoType;
        this.userName = userInfo.name;
        this.authService.userName = userInfo.name;
      });
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      });
  }

  private doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this.authService.userName = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }
}
