import {Component, OnInit, HostListener, ElementRef} from '@angular/core';
import {AuthService} from "../../../core";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services";
import {UserInfoType, DefaultResponseType} from "../../../../types";
import {TypeGuardUtil} from "../../utils";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  protected _isLogged: boolean = false;
  protected _userName: string | null = null;
  protected _isMenuOpen: boolean = false;

  constructor(private readonly authService: AuthService,
              private readonly userService: UserService,
              private readonly _snackBar: MatSnackBar,
              private readonly router: Router,
              private readonly elementRef: ElementRef) {
    this._isLogged = this.authService.getIsLoggedIn();
  }

  public ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this._isLogged = isLoggedIn;
      isLoggedIn ? this._loadUserName() : this._userName = null;
    });

    if (this._isLogged) {
      this._loadUserName();
    }
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (!this._isMenuOpen) {
      return;
    }
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this._isMenuOpen = false;
    }
  }

  protected _toggleMenu(): void {
    this._isMenuOpen = !this._isMenuOpen;
  }

  protected _closeMenu(): void {
    this._isMenuOpen = false;
  }

  protected _logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this._doLogout();
        },
        error: () => {
          this._doLogout();
        }
      });
  }

  private _loadUserName(): void {
    const savedName = this.authService.userName;
    if (savedName) {
      this._userName = savedName;
      return;
    }

    this.userService.getUserInfo()
      .subscribe((data: UserInfoType | DefaultResponseType) => {
        if (TypeGuardUtil.isDefaultResponse(data)) {
          return;
        }

        this._userName = data.name;
        this.authService.userName = data.name;
      });
  }

  private _doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this.authService.userName = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }
}
