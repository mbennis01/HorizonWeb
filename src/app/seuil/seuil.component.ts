import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../Services/horizon-api.service';

@Component({
  selector: 'app-seuil',
  templateUrl: './seuil.component.html',
  styleUrls: ['./seuil.component.css']
})
export class SeuilComponent implements OnInit {

  seuils;

  constructor(private horizonApi : HorizonApiService) { }

  ngOnInit() {
    this.horizonApi.getSeuils()
    .subscribe((response)=>{
      this.seuils = response.json();
    })
  }

}
