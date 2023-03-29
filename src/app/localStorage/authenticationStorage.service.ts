import { Injectable } from "@angular/core";
import { User } from "../models/User";

@Injectable({providedIn:'root'})
export class AuthenticationStorageService{
    key="authenticatedUser";
    saveUserToStorage(user:User){
        localStorage.setItem("authenticatedUser",JSON.stringify(user));
    }
    getUserFromStorage(): User {
        const userStr = localStorage.getItem("authenticatedUser");
        return userStr ? JSON.parse(userStr) : null;
    }    
    getUserId(){
       return this.getUserFromStorage().id;
    }
    checkIfLoggedUser(){
        if(parseInt(localStorage.getItem("isLogged")||"0")==1)
        return true;
    else
        return false;
    }
    setLoggedState(logged:number){
        localStorage.setItem("isLogged",JSON.stringify(logged));
    }
    checkIfExistedUser(){
        if(localStorage.getItem(this.key)!==null)
        return true;
    else
        return false;
    }
    clearStorage(){
        localStorage.removeItem("authenticatedUser");
        localStorage.removeItem("isLogged");

    }

}