import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../Services/horizon-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FbService } from '../Services/fb.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {

  param; 
  likedArticles : any[] = [];
  likedArticlesId : number[] = [];

  constructor(private horizonApi : HorizonApiService,
              private router : Router, 
              private route: ActivatedRoute, 
              private fb : FbService, 
              private authService : AuthService) {
    this.param = JSON.parse(localStorage.getItem('facebookuser'));
  }

  ngOnInit() {
    console.log(this.param.id);
    this.horizonApi.getLike(this.param.id)
    .subscribe((response) => {
      this.likedArticles = response.json();
      this.likedArticles.forEach((element)=>{
        this.likedArticlesId.push(element.Id);
        console.log(this.likedArticlesId);
      })
    })
  }

  goToAccueil(){
    this.router.navigate(
      [{outlets: {'leftrouter': ['news']}, }],
      {relativeTo: this.route.parent, skipLocationChange: true} 
    )
  }

  openLink(link){
    window.open(link,'popup','width=1200,height=700,scrollbars=no,resizable=no');  
  }

  getComments(id, titre){
    this.router.navigate(
      [{outlets: {'rightrouter': ['comments', id, titre]}}],
      {relativeTo: this.route.parent, skipLocationChange: true}
    )
  }

  shareOnFacebook(link, ida){
    this.fb.share(link)
    .then((response) => {
      console.log("Then :\n");
      if(response.error_message != undefined){
        console.log("Votre action a annulé le partage de l'article");
      }else{

        if(this.authService.currentUser.badge == "0"){
          this.horizonApi.doShare( this.authService.currentUser.Id_user , link)        
          .subscribe((response)=>{
            console.log( response.json() );
          })
        }else{
          this.horizonApi.doShareBadge( this.authService.currentUser.Id_user , link)        
          .subscribe((response)=>{
            console.log( response.json() );
          })
        }

        this.fb.callApi("/me/posts?fields=application,likes,created_time&limit=1")
        .then((response)=>{
          let idaf = response.data[0].id; 
          let date = response.data[0].created_time; 
          let idu = this.authService.currentUser.Id_user;
          this.horizonApi.saveShareDetails(ida, idaf, date, idu)
          .subscribe((response)=>{
              console.log(response);
          });
        });
      }
    })
    .catch((err) => {
      console.log("Catch :\n");
      console.log(err);
    })
  }

  
  doLike(article){
    let index = this.likedArticlesId.indexOf(article.Id);
    if( index != -1){
      this.likedArticlesId.splice(index, 1);
      if(this.authService.currentUser.badge == "1"){
        console.log("dislike badge");
        this.horizonApi.dislikeBadge(this.authService.currentUser.Id_user, article.Id)
        .subscribe((response)=>{
          console.log(response.json());
          if(!response.json()){
            setTimeout(()=>{this.likedArticlesId.push(article.Id);}, 1000);
          }
        })
      }else{
        console.log("dislike no badge");
        this.horizonApi.dislike(article.Id, this.authService.currentUser.Id_user)
        .subscribe((response)=>{
          console.log(response.json());
          if(!response.json()){
            setTimeout(()=>{this.likedArticlesId.push(article.Id);}, 1000);
          }
        })
      }
    }else{
      if(this.authService.currentUser.badge == "1"){
        this.likedArticlesId.push(article.Id);
        console.log("like badge");
        this.horizonApi.doLikeBadge(article.Link, this.authService.currentUser.Id_user)
        .subscribe((response) => {
          console.log(response);
          if(!response.json()){
            setTimeout(()=>{
              let index = this.likedArticlesId.indexOf(article.Id);
              this.likedArticlesId.splice(index, 1);
            }, 1000);
          }
        });
      }else{
        this.likedArticles.push(article.Id);
        console.log("like no badge");
        this.horizonApi.doLike(article.Link, this.authService.currentUser.Id_user)
        .subscribe((response) => {
          console.log(response);
          if(!response.json()){
            setTimeout(()=>{
              let index = this.likedArticlesId.indexOf(article.Id);
              this.likedArticlesId.splice(index, 1);
            }, 1000);
          }
        });
      }
    }
  }

  isLiked(id){
    let index = this.likedArticlesId.indexOf(id);
    if(index == -1){
      return false; 
    }else{
      return true; 
    }
  }
}
