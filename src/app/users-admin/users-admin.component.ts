import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../Services/horizon-api.service';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {


  constructor(private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {

  }

  getUsers(){
    this.router.navigate(
      [{outlets: {'rightrouter':['userlist']}}], 
      {relativeTo: this.route.parent, skipLocationChange: true}
    )
  }

  addAdmin(){
    this.router.navigate(
      [{outlets: {'rightrouter':['addadmin']}}],
      {relativeTo: this.route.parent, skipLocationChange: true}
    )
  }

  goSeuil(){
    this.router.navigate(
      [{outlets: {'rightrouter':['seuil']}}], 
      {relativeTo: this.route.parent, skipLocationChange: true}
    )
  }
}
