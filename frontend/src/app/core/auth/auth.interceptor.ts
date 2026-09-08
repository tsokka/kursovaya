import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {RefreshResponseType, DefaultResponseType} from "../../../types";
import {TypeGuardUtil} from "../../shared";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokens = this.authService.getTokens();

    if (tokens && tokens.accessToken) {
      const authReq = req.clone({
        headers: req.headers.set('x-auth', tokens.accessToken)
      });

      return next.handle(authReq)
        .pipe(
          catchError((error) => {
            if (error.status === 401 && !authReq.url.includes('/login') && !authReq.url.includes('/refresh')) {
              return this.handle401Error(authReq, next);
            }
            return throwError(() => error);
          })
        );
    }

    return next.handle(req);
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refresh()
      .pipe(
        switchMap((result: DefaultResponseType | RefreshResponseType) => {
          if (TypeGuardUtil.isDefaultResponse(result)) {
            return throwError(() => new Error(result.message));
          }

          this.authService.setTokens(result.accessToken, result.refreshToken);

          const authReq = req.clone({
            headers: req.headers.set('x-auth', result.accessToken)
          });

          return next.handle(authReq);
        }),
        catchError((error: HttpErrorResponse) => {
          this.authService.removeTokens();
          this.router.navigate(['/']);
          return throwError(() => error);
        })
      );
  }
}
