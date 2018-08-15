import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  get currentUser(){
    return  new JwtHelperService().decodeToken(localStorage.getItem('token'));
  }

  isLoggedIn(){
    let jwtHelperService = new JwtHelperService();
    let token = localStorage.getItem('token');   

    if(!token)  return false;

    jwtHelperService.getTokenExpirationDate(token);
    let isExpired = jwtHelperService.isTokenExpired(token);

    return !isExpired;
  }

  logout(){
    localStorage.removeItem('token');
  }

  isAdmin(){
    let user = new JwtHelperService().decodeToken(localStorage.getItem('token'));
    if(user.Role == 'admin' || user.Role == 'master'){
      return true; 
    }else{
      return false;
    }
  }
}
