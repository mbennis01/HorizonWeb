import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../Services/horizon-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-influence',
  templateUrl: './influence.component.html',
  styleUrls: ['./influence.component.css']
})
export class InfluenceComponent implements OnInit {

  influences; 
  message;

  constructor(private horizonApi : HorizonApiService) { }

  ngOnInit() {
    this.getInfluences();
  }
  
  getInfluences(){
    this.horizonApi.getInfluences()
    .subscribe((response)=>{
      this.influences = response.json();
    })
  }

  fLikenobadge = new FormGroup({
    Likenobadge : new FormControl("", [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)")], null)
  })

  get Likenobadge(){
    return this.fLikenobadge.get('Likenobadge');
  }

  updateLike_no_badge(){
    this.horizonApi.updateLike_no_badge(this.Likenobadge.value)
    .subscribe((response)=>{
      this.message = response.json();
      this.getInfluences();
    });
    this.Likenobadge.setValue("");
    this.Likenobadge.markAsUntouched(); 
    console.log(this.Likenobadge);
  }

  fSharenobadge = new FormGroup({
    Sharenobadge : new FormControl("", [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)")], null)
  })

  get Sharenobadge(){
    return this.fSharenobadge.get('Sharenobadge');
  }

  updateShare_no_badge(){
    this.horizonApi.updateShare_no_badge(this.Sharenobadge.value)
    .subscribe((response)=>{
      this.message = response.json();
      this.getInfluences();
    });
    this.Sharenobadge.setValue("");
    this.Sharenobadge.markAsUntouched();
  }

  fUserforlike = new FormGroup({
    Userforlike : new FormControl("", [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)")], null)
  })

  get Userforlike(){
    return this.fUserforlike.get('Userforlike');
  }

  updateUser_for_like(){
    this.horizonApi.updateUser_for_like(this.Userforlike.value)
    .subscribe((response)=>{
      this.message = response.json();
      this.getInfluences();
    });
    this.Userforlike.setValue("");
    this.Userforlike.markAsUntouched();
  }

  fUserforshare = new FormGroup({
    Userforshare : new FormControl("", [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)")], null)
  })

  get Userforshare(){
    return this.fUserforshare.get('Userforshare');
  }

  updateUser_for_share(){
    this.horizonApi.updateUser_for_share(this.Userforshare.value)
    .subscribe((response)=>{
      this.message = response.json();
      this.getInfluences();
    });
    this.Userforshare.setValue("");
    this.Userforshare.markAsUntouched();
  }

  fLikebronze = new FormGroup({
    Likebronze : new FormControl("", [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)")], null)
  })

  get Likebronze(){
    return this.fLikebronze.get('Likebronze');
  }

  updateLike_bronze(){
    this.horizonApi.updateLike_bronze(this.Likebronze.value)
    .subscribe((response)=>{
      this.message = response.json();
      this.getInfluences();
    });
    this.Likebronze.setValue("");
    this.Likebronze.markAsUntouched();
  }

  fLikesilver = new FormGroup({
    Likesilver : new FormControl("", [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)")], null)
  })

  get Likesilver(){
    return this.fLikesilver.get('Likesilver');
  }

  updateLike_silver(){
    this.horizonApi.updateLike_silver(this.Likesilver.value)
    .subscribe((response)=>{
      this.message = response.json();
      this.getInfluences();
    });
    this.Likesilver.setValue("");
    this.Likesilver.markAsUntouched();
  }

  fLikegold = new FormGroup({
    Likegold : new FormControl("", [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)")], null)
  })

  get Likegold(){
    return this.fLikegold.get('Likegold');
  }

  updateLike_gold(){
    this.horizonApi.updateLike_gold(this.Likegold.value)
    .subscribe((response)=>{
      this.message = response.json();
      this.getInfluences();
    });
    this.Likegold.setValue("");
    this.Likegold.markAsUntouched(); 
  }

  fSharebronze = new FormGroup({
    Sharebronze : new FormControl("", [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)")], null)
  })

  get Sharebronze(){
    return this.fSharebronze.get('Sharebronze');
  }

  updateShare_bronze(){
    this.horizonApi.updateShare_bronze(this.Sharebronze.value)
    .subscribe((response)=>{
      this.message = response.json();
      this.getInfluences();
    });
    this.Sharebronze.setValue("");
    this.Sharebronze.markAsUntouched(); 
  }

  fSharesilver = new FormGroup({
    Sharesilver : new FormControl("", [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)")], null)
  })

  get Sharesilver(){
    return this.fSharesilver.get('Sharesilver');
  }

  updateShare_silver(){
    this.horizonApi.updateShare_silver(this.Sharesilver.value)
    .subscribe((response)=>{
      this.message = response.json();
      this.getInfluences();
    });
    this.Sharesilver.setValue("");
    this.Sharesilver.markAsUntouched(); 
  }

  fSharegold = new FormGroup({
    Sharegold : new FormControl("", [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)")], null)
  })

  get Sharegold(){
    return this.fSharegold.get('Sharegold');
  }

  updateShare_gold(){
    this.horizonApi.updateShare_gold(this.Sharegold.value)
    .subscribe((response)=>{
      this.message = response.json();
      this.getInfluences();
    });
    this.Sharegold.setValue("");
    this.Sharegold.markAsUntouched(); 
  }

}
