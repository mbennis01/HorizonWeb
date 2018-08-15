import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../Services/horizon-api.service';

@Component({
  selector: 'app-seuil',
  templateUrl: './seuil.component.html',
  styleUrls: ['./seuil.component.css']
})
export class SeuilComponent implements OnInit {

  seuils;
  actionResponse; 

  constructor(private horizonApi : HorizonApiService) { }

  ngOnInit() {
    this.getSeuils();
  }

  getSeuils(){
    this.horizonApi.getSeuils()
    .subscribe((response)=>{
      this.seuils = response.json();
    })
  }

  updateBronze(value, bronze : HTMLInputElement){
    bronze.value = "";
    console.log(value);
    this.horizonApi.updateBronze(value)
    .subscribe((response)=>{
      this.actionResponse = response.json();
      this.getSeuils();
    })
  }

  updateSilver(value : number, silver : HTMLInputElement){
    silver.value = "";
    this.horizonApi.updateSilver(value)
    .subscribe((response)=>{
      this.actionResponse = response.json();
      this.getSeuils();
    })
  }

  updateGold(value : number, gold : HTMLInputElement){
    gold.value = "";
    console.log(value);
    this.horizonApi.updateGold(value)
    .subscribe((response)=>{
      this.actionResponse = response.json();
      this.getSeuils();
    })
  }

}
