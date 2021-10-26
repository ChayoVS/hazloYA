import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from '../services';

@Injectable({
  providedIn: 'root'
})


export class IsAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate() {
    const user = this.authenticationService.userValue;

    if (user.token == undefined) {
      this.router.navigate(['/login']);
      return false
    } else {
      return true
    }
  }
  
}
