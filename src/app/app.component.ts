import { Component} from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular-6-social-login';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { HorizonApiService } from './Services/horizon-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ HorizonApiService ]
})
export class AppComponent{

  title = 'app';

  constructor(private fb: FacebookService, 
    private facebookService : FacebookService,
    public horizonApi : HorizonApiService){
    let initParams: InitParams = {
      appId: '2014262192228066',
      xfbml: true,
      version: 'v2.12'
    };

    fb.init(initParams);
  }
}
