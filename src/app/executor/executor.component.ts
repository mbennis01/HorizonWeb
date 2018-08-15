import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../Services/horizon-api.service';

@Component({
  selector: 'app-executor',
  templateUrl: './executor.component.html',
  styleUrls: ['./executor.component.css']
})
export class ExecutorComponent implements OnInit {

  constructor(private HorizonApi: HorizonApiService) { }

  ngOnInit() {
  }

  executor(value){
    console.log(value);
    this.HorizonApi.executor(value)
    .subscribe((response)=>{
      console.log(response);
    })
  }

}
