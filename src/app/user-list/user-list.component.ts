import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../Services/horizon-api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users; 
  constructor(private horizonApi : HorizonApiService) { }

  ngOnInit() {
    this.horizonApi.getAllUsers()
    .subscribe((response)=>{
      this.users = response.json();
    })
  }

}
