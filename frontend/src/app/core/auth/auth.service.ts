import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject, throwError} from "rxjs";
import {LoginResponseType, RefreshResponseType, TokensType, DefaultResponseType} from "../../../types";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public accessTokenKey: string = 'accessToken';
  public refreshTokenKey: string = 'refreshToken';
  public userIdKey: string = 'userId';
  public userNameKey: string = 'userName';

  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean = false;

  constructor(private readonly http: HttpClient) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);
  }

  public login(email: string, password: string, rememberMe: boolean): Observable<DefaultResponseType | LoginResponseType> {
    return this.http.post<DefaultResponseType | LoginResponseType>(environment.api + 'login', {
      email, password, rememberMe
    });
  }

  signup(name: string, email: string, password: string): Observable<DefaultResponseType | LoginResponseType> {
    return this.http.post<DefaultResponseType | LoginResponseType>(environment.api + 'signup', {
      name, email, password
    });
  }

  logout(): Observable<DefaultResponseType> {
    const tokens = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType>(environment.api + 'logout', {
        refreshToken: tokens.refreshToken
      });
    }
    throw throwError(() => 'Can not find token');
  }

  refresh(): Observable<DefaultResponseType | RefreshResponseType> {
    const tokens = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType | RefreshResponseType>(environment.api + 'refresh', {
        refreshToken: tokens.refreshToken
      });
    }
    throw throwError(() => 'Can not use token');
  }

  public getIsLoggedIn(): boolean {
    return this.isLogged;
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    this.isLogged = true;
    this.isLogged$.next(true);
  }

  public removeTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.isLogged = false;
    this.isLogged$.next(false);
  }

  public getTokens(): TokensType {
    return {
      accessToken: localStorage.getItem(this.accessTokenKey),
      refreshToken: localStorage.getItem(this.refreshTokenKey)
    };
  }

  get userId(): null | string {
    return localStorage.getItem(this.userIdKey);
  }

  set userId(id: string | null) {
    if (id) {
      localStorage.setItem(this.userIdKey, id);
    } else {
      localStorage.removeItem(this.userIdKey);
    }
  }

  get userName(): null | string {
    return localStorage.getItem(this.userNameKey);
  }

  set userName(name: string | null) {
    name ? localStorage.setItem(this.userNameKey, name) : localStorage.removeItem(this.userNameKey);
  }
}
