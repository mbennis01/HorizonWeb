import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../Services/horizon-api.service';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-source-data',
  templateUrl: './source-data.component.html',
  styleUrls: ['./source-data.component.css']
})
export class SourceDataComponent implements OnInit {

  sourcesName : any[] = [];
  sources : Source[] = [];

  message;

  fBonus = new FormGroup({});
  
  bonusGroup = new FormGroup({
    "bonus" : new FormControl('', [Validators.required, Validators.pattern("^[\-]?[1-9][0-9]?[0-9]?$")], )
  });

  get bonus(){
    return this.bonusGroup.get('bonus');
  }

  sourceGroup = new FormGroup({
    "source" : new FormControl('', Validators.required)
  });

  get source(){
    return this.sourceGroup.get('source');
  }

  constructor(private horizonApi : HorizonApiService) { }

  ngOnInit() {
    this.update();
  }

  addBonusToSource(){
    this.horizonApi.addBonusToSource(this.source.value, this.bonus.value)
    .subscribe((response) => {
      this.message = response.json();
      setTimeout(()=>{this.message = ''}, 5000);
    })
    this.source.markAsUntouched();
    this.bonus.markAsUntouched();
    this.source.setValue('');
    this.bonus.setValue('');
  }
  
  update(){
    this.sources = [];
    this.horizonApi.getSources()
    .subscribe((response)=>{
      this.sourcesName = response.json();

      this.sourcesName.forEach(element => {
        this.sources.push(new Source(element, this.horizonApi));
      });
    })
  }
  
}

export class Source {
  nom : string;
  counter : number = 0;
  score : number = 0;
  oldpost : number = 0;
  newpost : number = 0

  constructor(nom : string, private horizonApi : HorizonApiService){
    this.nom = nom;

    this.horizonApi.getSourceScore(this.nom)
    .subscribe((response) => {
      this.score = response.json();
    })
    
    this.horizonApi.sourceCounter(this.nom)
    .subscribe((response)=>{
      this.counter = response.json();
    });

    this.horizonApi.getNewBysource(this.nom)
    .subscribe((response)=>{
      this.newpost = response.json();
    }) 

    this.horizonApi.getOldBysource(this.nom)
    .subscribe((response)=>{
      this.oldpost = response.json();
    })
  }
}


