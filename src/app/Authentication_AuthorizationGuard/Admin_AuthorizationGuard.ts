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
 * User can view this page only if he is an admin
 */
@Injectable({ providedIn: 'root' })
export class Admin_AuthorizationGuard implements CanActivate {

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

    // If he isn't an admin > redirect to the error page
    if (!this.authenticationService.checkIfIsAdmin()) {
      return this.router.parseUrl('/error');
    }
    return true;
  }
}

