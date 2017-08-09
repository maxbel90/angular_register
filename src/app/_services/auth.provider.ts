import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthProvider implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if signed in
    if (localStorage.getItem('user')) {
      return true;
    }

    // if not signed in
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
