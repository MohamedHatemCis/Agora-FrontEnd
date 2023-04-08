import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Order } from '../models/order';
import { AuthenticationStorageService } from 'src/app/localStorage/authenticationStorage.service';


/**
 * The main purpose of this service is to :-
          -  Save order to database .
          -  Get order by id .
          -  Get user orders .
          - Get all orders .
 */
@Injectable({ providedIn: 'root' })
export class OrderService {

  baseUrl: string = 'http://localhost:8080/api/v1/agora/order';
  headers = {
    'content-type': 'application/json',
    Authorization:
      'Bearer ' + this.authenticateStorage.getUserTokenFromStorage(),
  };

  constructor(
    private http: HttpClient,
    private authenticateStorage: AuthenticationStorageService
  ) {}

  //Save an order to the database
  async saveOrder(order: Order) {
    const response = await this.http.post(this.baseUrl, JSON.stringify(order), 
    {headers: this.headers,});
    return firstValueFrom(response);
  }

  // Get the order details with it's id
  async getOrderById(order_id: number) {
    const response = this.http.get<Order>(this.baseUrl + '/' + order_id, 
    {headers: this.headers,});
    return await firstValueFrom(response);
  }

  //Get the orders of the user
  async getAllUserOrders(user_id: number) {
    const response = this.http.get<Order[]>(this.baseUrl + '/user/' + user_id, 
    {headers: this.headers,});
    return await firstValueFrom(response);
  }

  //Get all the orders which made by users
  async getAllOrders() {
    const response = this.http.get<Order[]>(this.baseUrl + '/all', 
    {headers: this.headers,});
    return await firstValueFrom(response);
  }
}
