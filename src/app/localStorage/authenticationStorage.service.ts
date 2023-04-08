import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthenticationStorageService {
  isLoggedSubject = new Subject<number>();
  key: string = 'token';

  //Save user token to local storage
  saveUserTokenToStorage(token: string) {
    localStorage.setItem(this.key, token);
    this.setLoggedState(1);
  }

 //Get the user token from local storage
  getUserTokenFromStorage() {
    const token = localStorage.getItem(this.key);
    return token != null ? token : '';
  }

  //Get the userId from token
  getUserIdFromToken() {
    const token = this.getUserTokenFromStorage();
    const decodedToken: any = jwt_decode(token);
    return parseInt(decodedToken.user_id);
  }

  // Return if the user is logged in or not .
  checkIfLoggedUser() {
    if (parseInt(localStorage.getItem('isLogged') || '0') == 1) return true;
    else return false;
  }

  // Set the user as logged
  setLoggedState(logged: number) {
    localStorage.setItem('isLogged', JSON.stringify(logged));
    this.isLoggedSubject.next(logged);
  }

  // Get logged state
  getLoggedState() {
    let res = parseInt(localStorage.getItem('isLogged') || '0');
    this.isLoggedSubject.next(res);
  }

  //Check if any token existed in local storage or not
  checkIfExistedToken() {
    if (localStorage.getItem(this.key) !== null) return true;
    else return false;
  }

  //Check if the token save in local storage is for admin or user
  checkIfIsAdmin() {
    const token = this.getUserTokenFromStorage();
    const decodedToken: any = jwt_decode(token);
    if (decodedToken.role[0].authority === 'ROLE_ADMIN') return true;
    else return false;
  }

  //Clear all local storage data
  clearStorage() {
    localStorage.removeItem(this.key);
    localStorage.removeItem('isLogged');
    this.isLoggedSubject.next(0);
  }
}
