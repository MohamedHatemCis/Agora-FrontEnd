import { Injectable } from "@angular/core";

/**
 * This Service is to save or get categories and subCategories which i entered last time .
 */
@Injectable({providedIn:'root'})
export class LocalStorageService{
    //Get the key value from storage
    getLocalStorageItem(key:string){
        return parseInt(localStorage.getItem(key)||'1');
    }

   //Set the key value to storage
    setLocalStorageItem(key:string,id:number){
        localStorage.setItem(key,id.toString());
    }

    //Check if there is a value for the given key or not
    checkIfExistedValue(key:string):Boolean{
        if(localStorage.getItem(key)!==null)
            return true;
        else
            return false;
    }
}