import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../Services/horizon-api.service';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-regression',
  templateUrl: './regression.component.html',
  styleUrls: ['./regression.component.css']
})
export class RegressionComponent implements OnInit {

  value; 
  message;

  constructor(private horizonApi : HorizonApiService) { }

  ngOnInit() {
    this.updateValue();
  }

  updateValue(){
    this.horizonApi.getNewPoint()
    .subscribe((response)=>{
      this.value = response.json();
    })
  }

  fRegression = new FormGroup({
    'valueRegression': new FormControl('', [Validators.required, Validators.pattern("^[1-9][0-9]?[0-9]?$")])
  });

  get valueRegression(){
    return this.fRegression.get('valueRegression');
  }

  updateRegression(){
    this.horizonApi.setNewPoint(this.valueRegression.value)
    .subscribe((response) => {
      this.updateValue();
      this.message = response.json();
    })
  }
}
