import {Injectable} from "@angular/core";
import {CanActivate, Router, UrlTree} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthForwardGuard implements CanActivate {

  constructor(private readonly authService: AuthService,
              private readonly router: Router) {
  }

  public canActivate(): boolean | UrlTree {
    return this.authService.getIsLoggedIn() ? this.router.createUrlTree(['/']) : true;
  }
}
