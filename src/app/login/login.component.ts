import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { HorizonApiService } from '../Services/horizon-api.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message;
  error; 
  jwt; 

  constructor( 
    private facebookService : FacebookService,
    public horizonApi : HorizonApiService, 
    private router : Router, 
    ) 
    { 
      /**Cette partie consiste à initialiser les paramètres de connexion facebook */
      let initParams: InitParams = {
        appId: '2014262192228066',
        xfbml: true,
        version: 'v3.1'
      };
      facebookService.init(initParams);
      this.jwt = new JwtHelperService();
    }

  ngOnInit() {
  }

  loginFacebook(){
      this.message = 'Detection de session ...';
      this.facebookService.login()
        .then((response) => {
          if(response.status == "connected")
            return this.facebookService.api("/me?fields=id,name,picture.width(400).height(400)");
          else
            return new Promise((resolve, reject)=> resolve(false));
        })
        .then((response) => {
          if(response != false)
          {
            localStorage.setItem('facebookuser', JSON.stringify(response));
            localStorage.setItem('userpicture', response.picture.data.url);
            this.message = 'Detection d\'un compte utilisateur déjà existant ...';
            this.horizonApi.checkUser(response.id, response.name)
            .subscribe((value) => { 
              if(value){
                this.router.navigate(['accueil']);
              }else{
                this.message = 'Ouverture d\'une toute nouvelle connexion ...';
                this.horizonApi.postUser(response.id, response.name, response.picture.data.url)
                .subscribe((value)=>{
                  if(value){
                    this.router.navigate(['accueil']);
                  }else{
                    this.error = false; 
                  }
                })
              }
            },   )
          }
        })
        .catch((error: any) => console.log("erreur : " + error));
    }
}
