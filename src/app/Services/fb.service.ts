import { Injectable } from '@angular/core';
import { FacebookService, InitParams, UIParams } from 'ngx-facebook';

@Injectable({
  providedIn: 'root'
})
export class FbService {
  private _objectIdsToFilter : string[] = [];
  private _objectIdsToDelete : string[] = [];
  private _counterLike : number = 0;
  counterComment;

  constructor( private facebookService : FacebookService) {
    let initParams: InitParams = {
      appId: '2014262192228066',
      xfbml: true,
      version: 'v3.1'
    };
    facebookService.init(initParams);
   }


   share(url: string){
     let params : UIParams = {
      href: url,
      method: 'share',
     };    
     return this.facebookService.ui(params);  
  }

  callApi(path){
    return this.facebookService.api(path);
  }

  set objectIdsToFilter(str : string[]){
    this._objectIdsToFilter = str; 
  }

  get objectIdsToFilter(){
    return this._objectIdsToFilter;
  }

  set objectIdsToDelete(str : string[]){
    this._objectIdsToDelete = str; 
  }

  get objectIdsToDelete(){
    return this._objectIdsToDelete;
  } 
  
  set counterLike(value){
    this._counterLike = value; 
  }

  get counterLike(){
    return this._counterLike;
  }
}
