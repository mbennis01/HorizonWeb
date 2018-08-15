import { Injectable } from '@angular/core';
import { CanActivate, Router } from '../../../node_modules/@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router : Router, private authService: AuthService) { }

  canActivate(){
    if(this.authService.isLoggedIn())
      return true;
    else
      this.router.navigate(['']);
  }
}
