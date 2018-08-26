import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-news-admin',
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.css']
})
export class NewsAdminComponent implements OnInit {

  constructor(private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
  }

  getSourceData(){
    this.router.navigate(
      [{outlets: {'rightrouter':['sourcedata']}}],
      {skipLocationChange: true, relativeTo: this.route.parent}
    )
  }
  
  goInfluence(){
    this.router.navigate(
      [{outlets: {'rightrouter':['influence']}}],
      {relativeTo: this.route.parent, skipLocationChange: true}
    )
  }

  goRegression(){
    this.router.navigate(
      [{outlets: {'rightrouter':['regression']}}], 
      {skipLocationChange: true, relativeTo: this.route.parent}
    )
  }

  goClassify(){
    this.router.navigate(
      [{outlets: {'rightrouter':['classify']}}], 
      {skipLocationChange: true, relativeTo: this.route.parent}
    )
  }

  goTrack(){
    this.router.navigate(
      [{outlets: {'rightrouter':['track']}}], 
      {skipLocationChange: true, relativeTo: this.route.parent}
    )
  }
}
