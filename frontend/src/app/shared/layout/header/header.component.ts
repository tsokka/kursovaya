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
  isLogged: boolean = false;
  userName: string | null = null;
  isMenuOpen: boolean = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private elementRef: ElementRef) {
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isMenuOpen) {
      return;
    }
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  private loadUserName(): void {
    const savedName = this.authService.userName;
    if (savedName) {
      this.userName = savedName;
      return;
    }

    this.userService.getUserInfo()
      .subscribe((data: UserInfoType | DefaultResponseType) => {
        if (TypeGuardUtil.isDefaultResponse(data)) {
          return;
        }

        this.userName = data.name;
        this.authService.userName = data.name;
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
