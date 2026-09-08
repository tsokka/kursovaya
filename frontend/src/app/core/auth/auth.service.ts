import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject, throwError} from "rxjs";
import {LoginResponseType, RefreshResponseType, TokensType, DefaultResponseType} from "../../../types";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _accessTokenKey: string = 'accessToken';
  private readonly _refreshTokenKey: string = 'refreshToken';
  private readonly _userIdKey: string = 'userId';
  private readonly _userNameKey: string = 'userName';
  private _isLogged: boolean = false;

  public isLogged$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly http: HttpClient) {
    this._isLogged = !!localStorage.getItem(this._accessTokenKey);
  }

  public login(email: string, password: string, rememberMe: boolean): Observable<DefaultResponseType | LoginResponseType> {
    return this.http.post<DefaultResponseType | LoginResponseType>(environment.api + 'login', {
      email, password, rememberMe
    });
  }

  public signup(name: string, email: string, password: string): Observable<DefaultResponseType | LoginResponseType> {
    return this.http.post<DefaultResponseType | LoginResponseType>(environment.api + 'signup', {
      name, email, password
    });
  }

  public logout(): Observable<DefaultResponseType> {
    const tokens = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType>(environment.api + 'logout', {
        refreshToken: tokens.refreshToken
      });
    }
    throw throwError(() => 'Can not find token');
  }

  public refresh(): Observable<DefaultResponseType | RefreshResponseType> {
    const tokens = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType | RefreshResponseType>(environment.api + 'refresh', {
        refreshToken: tokens.refreshToken
      });
    }
    throw throwError(() => 'Can not use token');
  }

  public getIsLoggedIn(): boolean {
    return this._isLogged;
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this._accessTokenKey, accessToken);
    localStorage.setItem(this._refreshTokenKey, refreshToken);
    this._isLogged = true;
    this.isLogged$.next(true);
  }

  public removeTokens(): void {
    localStorage.removeItem(this._accessTokenKey);
    localStorage.removeItem(this._refreshTokenKey);
    this._isLogged = false;
    this.isLogged$.next(false);
  }

  public getTokens(): TokensType {
    return {
      accessToken: localStorage.getItem(this._accessTokenKey),
      refreshToken: localStorage.getItem(this._refreshTokenKey)
    };
  }

  public get userId(): string | null {
    return localStorage.getItem(this._userIdKey);
  }

  public set userId(id: string | null) {
    id ? localStorage.setItem(this._userIdKey, id) : localStorage.removeItem(this._userIdKey);
  }

  public get userName(): string | null {
    return localStorage.getItem(this._userNameKey);
  }

  public set userName(name: string | null) {
    name ? localStorage.setItem(this._userNameKey, name) : localStorage.removeItem(this._userNameKey);
  }
}
