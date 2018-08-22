import { NgModule, Inject } from "../../node_modules/@angular/core";
import { HorizonApiService } from "./Services/horizon-api.service";
import { AbstractControl, ValidationErrors } from "../../node_modules/@angular/forms";
import { Observable } from "../../node_modules/rxjs";
import { map, debounceTime, take } from "rxjs/operators";

export class UserValidators{
    public static shouldExist(horizonApi : HorizonApiService){
        return ((control : AbstractControl) => {
            return horizonApi.getUtilisateurById(control.value)
            .pipe( 
            map((response) => {
                let user = response.json();
                if(user.Id_user == "0"){
                    return {'shouldExist' : true}
                } else{
                    null;
                }
            })
            )
        })
    }
}