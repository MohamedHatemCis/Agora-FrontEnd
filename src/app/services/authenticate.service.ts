import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AuthenticationStorageService } from "../localStorage/authenticationStorage.service";
import { User } from "../models/User";

@Injectable({providedIn:'root'})
export class AuthenticateService{
headers = { 'content-type': 'application/json'}  

constructor(private http:HttpClient,private authenticateStorage:AuthenticationStorageService){}

async login(username:string,password:string){
const response = this.http.post<User>('http://localhost:8080/api/v1/agora/login',JSON.stringify({"username":username , "password":password}),
      {'headers':this.headers});
let user=await firstValueFrom(response);
if(user!=null)
{
  this.authenticateStorage.saveUserToStorage(user);
  console.log(user);
  return true;
}
else{
  this.authenticateStorage.clearStorage();
  return false;
}
}

register(user:User){
    this.http
    .post('http://localhost:8080/api/v1/agora/register',
          JSON.stringify(user),
          {'headers':this.headers})
          .subscribe(res => {
            console.log(res);
          });
}

}