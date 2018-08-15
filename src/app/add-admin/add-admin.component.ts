import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../Services/horizon-api.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  errorRaised = false; 
  operationOk = false; 

  constructor(private horizonApi : HorizonApiService) { }

  ngOnInit() {
  }

  addAdmin(id, iduser : HTMLInputElement){
    this.operationOk = false; 
    this.horizonApi.addAdmin(id)
    .subscribe((response) => {
      if(response){
        this.operationOk = true; 
        iduser.value = ' ';
      }
    }, (err) => {
      console.log(err);
      this.errorRaised = true; 
    })
  }

  removeAdmin(id, idr : HTMLInputElement){
    this.operationOk = false; 
    this.horizonApi.removeAdmin(id)
    .subscribe((response) => {
      if(response){
        this.operationOk = true; 
        idr.value = ' ';        
      }
    }, (err) => {
      console.log(err);
      this.errorRaised = true; 
    })
  }

}
