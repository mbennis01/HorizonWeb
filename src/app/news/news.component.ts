import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../Services/horizon-api.service';
import { FbService } from '../Services/fb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { parse } from 'url';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  articles : any[] = [];
  limitArticles = 0;
  likedArticles : number[] = [];

  constructor(
    private horizonApi : HorizonApiService, 
    private fb : FbService, 
    private router : Router, 
    private route: ActivatedRoute,
    private authService : AuthService) { }

  ngOnInit() {
    this.horizonApi.getArticlesByLimits(this.limitArticles * 10)
    .subscribe((response) => {
      this.articles = response.json();
    })  
    this.getLiked();
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

  doLike(article){
    let index = this.likedArticles.indexOf(article.Id);
    if( index != -1){
      this.likedArticles.splice(index, 1);
      if(this.authService.currentUser.badge == "1" && article.Categorie != "Non classé"){
        console.log("dislike badge");
        this.horizonApi.dislikeBadge(this.authService.currentUser.Id_user, article.Id)
        .subscribe((response)=>{
          console.log(response.json());
          if(!response.json()){
            setTimeout(()=>{this.likedArticles.push(article.Id);}, 1000);
          }
        })
      }else{
        console.log("dislike no badge");
        this.horizonApi.dislike(article.Id, this.authService.currentUser.Id_user)
        .subscribe((response)=>{
          console.log(response.json());
          if(!response.json()){
            setTimeout(()=>{this.likedArticles.push(article.Id);}, 1000);
          }
        })
      }
    }else{
      if(this.authService.currentUser.badge == "1" && article.Categorie != "Non classé"){
        this.likedArticles.push(article.Id);
        console.log("like badge");
        this.horizonApi.doLikeBadge(article.Link, this.authService.currentUser.Id_user)
        .subscribe((response) => {
          console.log(response);
          if(!response.json()){
            setTimeout(()=>{
              let index = this.likedArticles.indexOf(article.Id);
              this.likedArticles.splice(index, 1);
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
              let index = this.likedArticles.indexOf(article.Id);
              this.likedArticles.splice(index, 1);
            }, 1000);
          }
        });
      }
    }
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

  plusUn(fullDiv : HTMLDivElement){
    this.limitArticles++;
    this.horizonApi.getArticlesByLimits(this.limitArticles * 10)
    .subscribe((response) => {
      this.articles = response.json();
      fullDiv.scrollTo(0,0)
    })  
  }

  moinsUn(fullDiv : HTMLDivElement){
    if(this.limitArticles > 0){
      this.limitArticles--;
      this.horizonApi.getArticlesByLimits(this.limitArticles * 10)
      .subscribe((response) => {
        this.articles = response.json();
        fullDiv.scrollTo(0,0);
      })  
    }
  }
  
getLiked(){
    this.horizonApi.getLike(this.authService.currentUser.Id_user)
    .subscribe((response)=>{
      let likedArticles = response.json();
      likedArticles.forEach(element => {
        this.likedArticles.push(element.Id);
      });
      console.log(this.likedArticles);
    })
  }

  isLiked(id){
    if(this.likedArticles.indexOf(id) != -1){
      return true;
    }
    else{
      return false; 
    }
  }

  goTrack(id, titre){
    this.router.navigate(
      [{outlets: {'rightrouter':['track', id, titre]}}],
      {skipLocationChange: true, relativeTo: this.route.parent}
    )
  }

  get role(){
    return this.authService.currentUser.Role;
  }
}
