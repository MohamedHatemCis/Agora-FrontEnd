import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class LocalStorageService{
    getLocalStorageItem(key:string){
        return parseInt(localStorage.getItem(key)||'1');
    }
    setLocalStorageItem(key:string,id:number){
        localStorage.setItem(key,id.toString());
    }
    checkIfExistedValue(key:string):Boolean{
        if(localStorage.getItem(key)!==null)
            return true;
        else
            return false;
    }
}