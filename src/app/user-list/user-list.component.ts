import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../Services/horizon-api.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users : any[]; 
  constructor(private horizonApi : HorizonApiService, private authService : AuthService) { }
  message; 

  ngOnInit() {
    this.horizonApi.getAllUsers()
    .subscribe((response)=>{
      this.users = response.json();
    })
  }

  giveBadge(user){
    let index = this.users.indexOf(user);
    this.horizonApi.giveBadge(user.Id_user)
    .subscribe((response)=>{
      this.message = response.json();
      user.Badge = "1";
      this.users[index] = user;
    })
  }

  removeBadge(user){
    let index = this.users.indexOf(user);
    this.horizonApi.removeBadge(user.Id_user)
    .subscribe((response)=>{
      this.message = response.json();
      user.Badge = "0";
      this.users[index] = user;
    })
  }
}
