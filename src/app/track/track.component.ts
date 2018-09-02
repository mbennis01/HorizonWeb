import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { HorizonApiService } from '../Services/horizon-api.service';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { FbService } from '../Services/fb.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  id;
  titre; 
  tracks;
  likeCount; 
  commentCount; 
  sharedPosts;

  fTransaction = new FormGroup({
    transaction: new FormControl('', null, null)
  });

  get transaction(){
    return this.fTransaction.get('transaction');
  }

  constructor(private router : Router, 
    private route: ActivatedRoute, 
    private horizonApi : HorizonApiService, 
    private facebook : FbService) { }

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
    let idf = this.transaction.value;
    this.facebook.callApiReactions(idf)
    .then((response)=>{
      console.log(response);
      if(response.likes)
        this.likeCount = response.likes.data.length;
      else this.likeCount = 0;

      if(response.comments)
        this.commentCount = response.comments.data.length;
      else this.commentCount = 0;
    });

    this.facebook.callApiSharedPosts(idf)
    .then((response)=>{
      console.log(response);
      if(response.data)
        this.sharedPosts = response.data.length; 
      else
        this.sharedPosts = 0;
    });
  }
}
