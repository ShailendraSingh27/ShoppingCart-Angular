import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuardService implements CanActivate{

  constructor(
    private auth: AuthService,
    private userService: UserService) { }

  canActivate(){
    return this.auth.appUser$
    .map(appUser => appUser.isAdmin);
  }
}
 