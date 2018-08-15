import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../Services/horizon-api.service';

@Component({
  selector: 'app-influence',
  templateUrl: './influence.component.html',
  styleUrls: ['./influence.component.css']
})
export class InfluenceComponent implements OnInit {

  influences; 

  constructor(private horizonApi : HorizonApiService) { }

  ngOnInit() {
    this.horizonApi.getInfluences()
    .subscribe((response)=>{
      this.influences = response.json();
    })
  }

}
