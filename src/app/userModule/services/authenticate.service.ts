import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthenticationStorageService } from '../../localStorage/authenticationStorage.service';
import { User } from '../models/User';
import { AuthenticationResponse } from '../models/AuthenticationResponse';
import jwt_decode from 'jwt-decode';

/**
 * The main purpose of this service is to :-
          -  login or register the users .
          -  check the validity of the tokens . 
 * 
 */
@Injectable({ providedIn: 'root' })
export class AuthenticateService {
  baseUrl = 'http://localhost:8080/api/v1/agora/';
  headers = { 'content-type': 'application/json' };

  constructor(
    private http: HttpClient,
    private authenticateStorage: AuthenticationStorageService
  ) {}

  // If login successfully with the username and the password then save the token to storage .
  async login(username: string, password: string) {

    try {

           const response = this.http.post<AuthenticationResponse>(this.baseUrl + 'login',
           JSON.stringify({ username: username, password: password }),
           { headers: this.headers });
           let authenticationResponse = await firstValueFrom(response);
           return this.saveToStorage(authenticationResponse.token);

} catch (ex) {
      return false;
    }
  }

  // If registered successfully then save the token to storage .
  async register(user: User) {

    try {
      const response = this.http.post<AuthenticationResponse>(this.baseUrl + 'register',
        JSON.stringify(user),
        { headers: this.headers });
      let authenticationResponse = await firstValueFrom(response);
      return this.saveToStorage(authenticationResponse.token);

    } catch (ex) {
      return false;
    }
  }

  //Save user token to local storage
  saveToStorage(token: string) {
    if (token != null) {
          this.authenticateStorage.saveUserTokenToStorage(token);
          return true;
    } else {
          this.authenticateStorage.clearStorage();
          return false;
    }
  }

  //Check if the token is not expired
  checkValidAuthenticatedUser() {
    if (this.authenticateStorage.checkIfExistedToken()) {
      const decodedToken: any = jwt_decode(
        this.authenticateStorage.getUserTokenFromStorage()
      );
      return this.checkValidTokenExpirationDate(
        new Date(decodedToken.exp * 1000)
      );
    } else {
      return false;
    }
  }

  //check if the token is for admin
  checkIfIsAdmin() {
    return this.authenticateStorage.checkIfIsAdmin();
  }

  //check if the expiration date still before the current time or not
  checkValidTokenExpirationDate(date: Date) {
    const currentDate = new Date();
    return date > currentDate ? true : false;
  }
}
