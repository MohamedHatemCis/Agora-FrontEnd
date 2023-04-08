import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../userModule/services/authenticate.service';

/**
 * User can view this page only if he is authenticated
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticateService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {

    // If he isn't authenticated > redirect to the error page
    if (!this.authenticationService.checkValidAuthenticatedUser()) {
      return this.router.parseUrl('/error');
    }
    return true;
  }
}
