import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../Services/horizon-api.service';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { UserValidators } from '../user.validators';

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

  fAddAdmin = new FormGroup({
    'id_user' : new FormControl('', [ Validators.required, Validators.pattern("^[1-9][0-9]*") ], UserValidators.shouldExist(this.horizonApi) )
  })

  get id_user(){
    return this.fAddAdmin.get('id_user');
  }

  addAdmin(){
    this.operationOk = false; 
    this.horizonApi.addAdmin(this.id_user.value)
    .subscribe((response) => {
      if(response){
        this.operationOk = true; 
        this.id_user.setValue("");
        this.id_user.markAsUntouched();
      }
    }, (err) => {
      console.log(err);
      this.errorRaised = true; 
    })
  }

  fRemoveAdmin = new FormGroup({
    'idr' : new FormControl('', [ Validators.required, Validators.pattern("^[1-9][0-9]*") ], UserValidators.shouldExist(this.horizonApi))
  })

  get idr(){
    return this.fRemoveAdmin.get('idr');
  }

  removeAdmin(){
    this.operationOk = false; 
    this.horizonApi.removeAdmin(this.idr.value)
    .subscribe((response) => {
      if(response){
        this.operationOk = true; 
        this.idr.setValue("");
        this.idr.markAsUntouched();        
      }
    }, (err) => {
      console.log(err);
      this.errorRaised = true; 
    })
  }

}
