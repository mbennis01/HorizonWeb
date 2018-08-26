import { Injectable } from '@angular/core';
import {  Http, RequestOptions, Headers } from '@angular/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorizonApiService {

  url : string = "https://horizonapp.fr/backup/api/articles/";
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

    updateBronze(value : number){
      return this.http.put(this.url+"/seuilsbronze", {Bronze : value, Silver : 0, Gold: 0});
    }

    updateSilver(value : number){
      return this.http.put(this.url+"/seuilssilver", {Bronze : 0, Silver : value, Gold: 0});
    }

    updateGold(value : number){
      return this.http.put(this.url+"/seuilsgold", {Bronze : 0, Silver : 0, Gold: value});
    }

    getInfluences(){
      return this.http.get(this.url+"/influences");
    }

    updateLike_no_badge(value: number){
      return this.http.put(this.url+"/influencesLike_no_badge", 
      {
      Like_no_badge: value, 
      Share_no_badge: 0, 
      User_for_like: 0, 
      User_for_share: 0, 
      Like_bronze: 0,
      Like_silver: 0, 
      Like_gold: 0, 
      Share_bronze: 0, 
      Share_silver: 0, 
      Share_gold: 0
      });
    }

    updateShare_no_badge(value: number){
      return this.http.put(this.url+"/influencesShare_no_badge", 
      {
      Like_no_badge: 0, 
      Share_no_badge: value, 
      User_for_like: 0, 
      User_for_share: 0, 
      Like_bronze: 0,
      Like_silver: 0, 
      Like_gold: 0, 
      Share_bronze: 0, 
      Share_silver: 0, 
      Share_gold: 0
      });
    }

    updateUser_for_like(value: number){
      return this.http.put(this.url+"/influencesUser_for_like", 
      {
      Like_no_badge: 0, 
      Share_no_badge: 0, 
      User_for_like: value, 
      User_for_share: 0, 
      Like_bronze: 0,
      Like_silver: 0, 
      Like_gold: 0, 
      Share_bronze: 0, 
      Share_silver: 0, 
      Share_gold: 0
      });
    }

    updateUser_for_share(value: number){
      return this.http.put(this.url+"/influencesUser_for_share", 
      {
      Like_no_badge: 0, 
      Share_no_badge: 0, 
      User_for_like: 0, 
      User_for_share: value, 
      Like_bronze: 0,
      Like_silver: 0, 
      Like_gold: 0, 
      Share_bronze: 0, 
      Share_silver: 0, 
      Share_gold: 0
      });
    }

    updateLike_bronze(value: number){
      return this.http.put(this.url+"/influencesLike_bronze", 
      {
      Like_no_badge: 0, 
      Share_no_badge: 0, 
      User_for_like: 0, 
      User_for_share: 0, 
      Like_bronze: value,
      Like_silver: 0, 
      Like_gold: 0, 
      Share_bronze: 0, 
      Share_silver: 0, 
      Share_gold: 0
      });
    }

    updateLike_silver(value: number){
      return this.http.put(this.url+"/influencesLike_silver", 
      {
      Like_no_badge: 0, 
      Share_no_badge: 0, 
      User_for_like: 0, 
      User_for_share: 0, 
      Like_bronze: 0,
      Like_silver: value, 
      Like_gold: 0, 
      Share_bronze: 0, 
      Share_silver: 0, 
      Share_gold: 0
      });
    }

    updateLike_gold(value: number){
      return this.http.put(this.url+"/influencesLike_gold", 
      {
      Like_no_badge: 0, 
      Share_no_badge: 0, 
      User_for_like: 0, 
      User_for_share: 0, 
      Like_bronze: 0,
      Like_silver: 0, 
      Like_gold: value, 
      Share_bronze: 0, 
      Share_silver: 0, 
      Share_gold: 0
      });
    }

    updateShare_bronze(value: number){
      return this.http.put(this.url+"/influencesShare_bronze", 
      {
      Like_no_badge: 0, 
      Share_no_badge: 0, 
      User_for_like: 0, 
      User_for_share: 0, 
      Like_bronze: 0,
      Like_silver: 0, 
      Like_gold: 0, 
      Share_bronze: value, 
      Share_silver: 0, 
      Share_gold: 0
      });
    }

    updateShare_silver(value: number){
      return this.http.put(this.url+"/influencesShare_silver", 
      {
      Like_no_badge: 0, 
      Share_no_badge: 0, 
      User_for_like: 0, 
      User_for_share: 0, 
      Like_bronze: 0,
      Like_silver: 0, 
      Like_gold: 0, 
      Share_bronze: 0, 
      Share_silver: value, 
      Share_gold: 0
      });
    }

    updateShare_gold(value: number){
      return this.http.put(this.url+"/influencesShare_gold", 
      {
      Like_no_badge: 0, 
      Share_no_badge: 0, 
      User_for_like: 0, 
      User_for_share: 0, 
      Like_bronze: 0,
      Like_silver: 0, 
      Like_gold: 0, 
      Share_bronze: 0, 
      Share_silver: 0, 
      Share_gold: value
      });
    }

    giveBadge(value : number){
      return this.http.put(this.url+"/badgeon/"+value, {});
    }

    removeBadge(value : number){
      return this.http.put(this.url+"/badgeoff/"+value, {});
    }

    getNewPoint(){
      return this.http.get(this.url+"/newpoint");
    }

    setNewPoint(value : number){
      return this.http.put(this.url+"/newpoint/"+value, {});
    }

    getSources(){
      return this.http.get(this.url+"/sources");
    }

    getSourceScore(source : string){
      return this.http.get(this.url+"/sources/"+source);
    }

    addBonusToSource(source : string, bonus : number){
      return this.http.post(this.url+"/"+source+"/"+bonus, {});
    }

    sourceCounter(source : string){
      return this.http.get(this.url+"/sources/counter/"+source);
    }

    getNewBysource(source : string){
      return this.http.get(this.url+"/sources/new/"+source);
    }

    getOldBysource(source : string){
      return this.http.get(this.url+"/sources/old/"+source);
    }

    getUnclassified(){
      return this.http.get(this.url+"/unclassified");
    }

    getCategories(){
      return this.http.get(this.url+"/categories");
    }

    classification(article){
      return this.http.post(this.url+"/classification", article);
    }

    saveShareDetails(ida, idaf, date, idu){
      return this.http.post(this.url+"/sharedetails", {ida: ida, idaf: idaf, date: date, idu: idu})
    }

    getTrackList(id){
      return this.http.get(this.url+"/tracks/"+id);
    }
}
