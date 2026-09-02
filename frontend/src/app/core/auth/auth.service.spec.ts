import {AuthService} from "./auth.service";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {TestBed} from "@angular/core/testing";

describe('auth service', () => {
  let authService: AuthService;
  let httpServiceSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    localStorage.clear();
    httpServiceSpy = jasmine.createSpyObj('HttpClient', ['post']);
    httpServiceSpy.post.and.returnValue(of({accessToken: 'access', refreshToken: 'refresh', userId: '1'}));

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: HttpClient, useValue: httpServiceSpy}
      ]
    });
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return false for isLoggedIn if no token', () => {
    expect(authService.getIsLoggedIn()).toBe(false);
  });

  it('should set tokens and change isLoggedIn to true', () => {
    authService.setTokens('accessToken123', 'refreshToken456');
    expect(authService.getIsLoggedIn()).toBe(true);
  });

  it('should remove tokens and change isLoggedIn to false', () => {
    authService.setTokens('accessToken123', 'refreshToken456');
    authService.removeTokens();
    expect(authService.getIsLoggedIn()).toBe(false);
  });

  it('should emit true through isLogged$ after setTokens', (done: DoneFn) => {
    authService.isLogged$.subscribe(value => {
      expect(value).toBe(true);
      done();
    });
    authService.setTokens('accessToken123', 'refreshToken456');
  });

  it('should make http request for login', (done: DoneFn) => {
    authService.login('test@mail.ru', '12345678', true).subscribe(() => {
      expect(httpServiceSpy.post).toHaveBeenCalledOnceWith(environment.api + 'login', {
        email: 'test@mail.ru',
        password: '12345678',
        rememberMe: true
      });
      done();
    });
  });

  it('should throw error on logout without refresh token', () => {
    expect(() => authService.logout()).toThrow();
  });

  it('should make http request for logout with refresh token', (done: DoneFn) => {
    authService.setTokens('accessToken123', 'refreshToken456');
    authService.logout().subscribe(() => {
      expect(httpServiceSpy.post).toHaveBeenCalledOnceWith(environment.api + 'logout', {
        refreshToken: 'refreshToken456'
      });
      done();
    });
  });
});
