import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HorizonApiService } from '../Services/horizon-api.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent{
  comments; 
  titre; 
  utilisateur; 
  id; 

  constructor(private route : ActivatedRoute, private horizonApi : HorizonApiService) {
    this.utilisateur = JSON.parse(localStorage.getItem('facebookuser'));
    this.route.queryParams.subscribe((response)=>{console.log(response)});
    this.route.paramMap.subscribe((params) => {
      this.titre = params.get('titre');
      this.id = params.get('id');
      this.horizonApi.getComments(params.get('id'))
      .subscribe((response) => {
        this.comments = response.json();
      })
    })
  }

  ajouterCommentaire(f){
    this.comments.push({Nom: this.utilisateur.name, Contenu: f.value.commentaire, Picture: localStorage.getItem('userPicture')});
    this.horizonApi.doComment(this.utilisateur.id, this.id, f.value.commentaire)
    .subscribe((response)=>{
      if(!response){
        let index = (this.comments as any[]).indexOf(f.value.commentaire);
        (this.comments as any[]).splice(index, 1);
      }
    })
  }
}

