import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HorizonApiService } from '../Services/horizon-api.service';
import {  map } from 'rxjs/operators';
import { FbService } from '../Services/fb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  isAdminToggled = false;
  routed = 'test';
  param; 
  jwt;
  picture; 
  articles : any[] = [];
  likedArticles : any[] = []; 
  state;
  commentIsClicked = false;
  limitArticles = 1;

  constructor(private horizonApi : HorizonApiService, private fb : FbService, private router : Router, private route: ActivatedRoute, public authService : AuthService) { 
    this.jwt = new JwtHelperService();
    this.param = this.jwt.decodeToken(localStorage.getItem('token'));
    this.picture = localStorage.getItem('userpicture');
    this.state = 'basic';
    console.log(this.authService.currentUser);
  }

  ngOnInit() {
    this.router.navigate([{outlets: { 'leftrouter':['news']}}], 
    {relativeTo : this.route ,  skipLocationChange: true });
  }
 
  goToFavoris(){
    this.router.navigate(
      [{outlets: {'leftrouter':['favoris']}}], 
      {relativeTo: this.route, skipLocationChange: true }
    );
  }

  goToBadge(){
    this.router.navigate(
      [{outlets: {'leftrouter': ['badges']}}], 
      {relativeTo: this.route, skipLocationChange: true}
    )
  }

  goToInitial(){
    this.router.navigate([{outlets: { 'leftrouter':['news']}}], 
    {relativeTo : this.route ,  skipLocationChange: true });
  }

  goToAdmin(){
    this.router.navigate(
      [{outlets: {'leftrouter':['adminpanel']}}], 
      {relativeTo: this.route, skipLocationChange: true}
    );
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }

  adminToggle(){
    this.isAdminToggled = !this.isAdminToggled;
  }

  manageUsers(){
    this.router.navigate(
      [{outlets: {'leftrouter': ['usersadmin']}}],
      {relativeTo: this.route, skipLocationChange: true}
    )
  }

  executor(){
    this.router.navigate(
      [{outlets: {'rightrouter':['executor']}}], 
      {relativeTo: this.route, skipLocationChange: true}
    )
  }
}
