import { Component } from '@angular/core';

import { AuthenticationService } from './services';
import { User, Role } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hazlo-ya-app';
  user: User;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
}

get isAdmin() {
    return this.user && this.user.role === Role.Admin;
}

logout() {
    this.authenticationService.logout();
}

getUserToken(){
  const user = this.authenticationService.userValue;

  if (user.token == undefined) {
    return false
  } else {
    return true
  }
}


}
