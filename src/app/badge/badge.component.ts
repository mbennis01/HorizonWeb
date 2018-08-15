import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { HorizonApiService } from '../Services/horizon-api.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {

  actualUser;
  seuils; 

  constructor(private router : ActivatedRoute, public authService : AuthService, private horizonApi : HorizonApiService) { }

  ngOnInit() {
    this.horizonApi.getSeuils()
    .subscribe((response)=>{
      this.seuils = response.json();
      console.log(this.seuils);
    })
  }

}
