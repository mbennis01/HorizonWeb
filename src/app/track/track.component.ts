import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { HorizonApiService } from '../Services/horizon-api.service';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  id;
  titre; 
  tracks;

  fTransaction = new FormGroup({
    transaction: new FormControl('', null, null)
  });

  get transaction(){
    return this.fTransaction.get('transaction');
  }

  constructor(private router : Router, private route: ActivatedRoute, private horizonApi : HorizonApiService) { }

  ngOnInit() {
    this.route.params.subscribe((response)=>{
      this.id = response.id;
      this.titre = response.titre;
      this.horizonApi.getTrackList(this.id)
      .subscribe((response)=>{
        this.tracks = response.json();
        console.log(this.tracks);
      })
    })
  }

  track(){
    console.log(this.transaction.value);
  }
}
