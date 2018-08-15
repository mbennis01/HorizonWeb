import { Injectable } from '@angular/core';
import {  Http, RequestOptions, Headers } from '@angular/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorizonApiService {

  url : string = "http://localhost:64758/api/articles/";
  constructor(private http : Http){}

  checkUser(idu : string, nom : string){
    let headers = new Headers();
    headers.append("Authorization", "Basic ");
    return this.http.post(this.url+"checkuserdesktop", {id: idu, nom : nom, picture : null }, new RequestOptions({headers: headers}))
    .pipe(map( (value) =>{
      if(value.statusText ==="OK" && value.json() != "NoUserDetected"){
        localStorage.setItem('token', value.json());
        return true
      }else
       return false;  
      }, catchError((err) => {
        return throwError(err.json())
      }))
    )
  }

    /** Fonction pour enregistrer un utilisateur dans la base de données , PARA : id utilisateur et nom utilisateur*/
    postUser(idp: any, nomp: any, picturep : any){
      let headers = new Headers();
      headers.append("Authorization", "Basic ");
        return this.http.post(this.url + "postuserdesktop", {id : idp, nom: nomp, picture : picturep}, new RequestOptions({headers: headers}))
        .pipe(map((value) => {
          if(value.statusText == "OK" && value.json()){
            localStorage.setItem('token', value.json());
            return true; 
          }else{
            return false; 
          }
        }));
    }

    getArticles(){
      return this.http.get(this.url);
    }

    getArticlesByLimits(a : number){
      return this.http.get(this.url + ""+ a);
    }

    getLike(id : any){
      return this.http.get(this.url+"GetLikedArticlesByUser/"+id);
    }

    doLike(link: any, idu){
      return this.http.post(this.url+"InsertLike", {'id': idu, 'link':link});
    }

    getComments(id : any){
        return this.http.get(this.url+"getcomment/"+id);
    }

    doShare(id: any, link: any){
      return this.http.post(this.url+"InsertShare", {'id': id, 'link' :link});
    }

    doShareBadge(id: any, link: any){
      return this.http.post(this.url+"/InsertShareBadge", {'id':id, 'link':link});
    }

    doComment(idu, ida, contenu){
      return this.http.post(this.url+"PostComment", {'idUtilisateur': idu, 'idArticle': ida, 'contenu': contenu});
    }

    getUtilisateurById(id){
      return this.http.get(this.url+"/user/"+id);
    }

    getAllUsers(){
      return this.http.get(this.url+"/users");
    }

    addAdmin(id){
      return this.http.put(this.url+"/admin/"+id, {});
    }  

    removeAdmin(id){
      return this.http.put(this.url+"/adminr/"+id, {});
    }  

    executor(request){
      return this.http.post(this.url+"/executor", {content : request});
    }

    dislike(ida, idu){
      return this.http.delete(this.url+"/like/"+ida+"/"+idu);
    }

    doLikeBadge(link, idu){
      return this.http.post(this.url+"/InsertLikeBadge",{'id': idu, 'link':link});
    }

    dislikeBadge(idu, ida){
      return this.http.delete(this.url+"/RemoveLikeBadge/"+idu+"/"+ida);
    }

    getSeuils(){
      return this.http.get(this.url+"/seuils");
    }
}
