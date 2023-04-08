import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { firstValueFrom, from, Subject } from 'rxjs';
import { AuthenticationStorageService } from '../../localStorage/authenticationStorage.service';
import { Cart } from '../models/cart';
import { Cart_Item } from '../models/cart_Item';

/**
 * The main purpose of this service is to :-
          -  Save cart to database .
          -  Check if there is an existed cart for this user or not .
          -  Get the cart items if exists .
 */
@Injectable({ providedIn: 'root' })
export class CartService {

  baseUrl: string = 'http://localhost:8080/api/v1/agora/';
  headers = {
    'content-type': 'application/json',
    Authorization:
      'Bearer ' + this.authenticateStorage.getUserTokenFromStorage(),
  };

  myCart: Cart = new Cart();
  cartChanged = new Subject<Cart>();

  constructor(
    private http: HttpClient,
    private authenticateStorage: AuthenticationStorageService
  ) {}

  // Save cart to database
  saveCart(cart: Cart) {
    this.http.post(this.baseUrl + 'cart', JSON.stringify(cart),
     {headers: this.headers,}).subscribe((res) => {});
  }

  //Check if there is an existed cart for this user or not .
  async checkIfExistedCart(user_id: number): Promise<boolean> {
    let found: boolean = false;
    const response = this.http.get<boolean>(
      this.baseUrl + 'cart/check/' + user_id,
      { headers: this.headers }
    );
    found = await firstValueFrom(response);
    return found;
  }

  // Get the cart details
  async getCart(id: number) {
    const response = this.http.get<Cart>(this.baseUrl + 'cart/' + id, 
    {headers: this.headers,});
    this.myCart = await firstValueFrom(response);
  }

  // Add item to the cart
  addCartItem(cart_item: Cart_Item) {
    this.http.post(this.baseUrl + 'cart-item', JSON.stringify(cart_item),
     {headers: this.headers,})
      .subscribe((res) => {});
  }

  // Get all cart items
  async getCartItems(cart_id: number) {
    const response = this.http.get<Cart_Item[]>(
      this.baseUrl + 'cart-item/' + cart_id,
      { headers: this.headers }
    );
    this.myCart.items = await firstValueFrom(response);
  }

  // get all order items
  async getOrderItems(order_id: number) {
    const response = this.http.get<Cart_Item[]>(this.baseUrl + 'cart-item/order/' + order_id,
      { headers: this.headers });
    return await firstValueFrom(response);
  }

  // Fetch all the cart data
  async fetchAllCartData(user_id: number): Promise<Boolean> {
    const check = await firstValueFrom(from(this.checkIfExistedCart(user_id)));
    if (check == true) {
      await firstValueFrom(from(this.getCart(user_id)));
      await firstValueFrom(from(this.getCartItems(user_id)));
      this.cartChanged.next(this.myCart);
      return true;
    } else {
      return false;
    }
  }

  //Check if the item is in the cart or not
  async checkInCartItem(prod_id: number) {
    const response = this.http.get<Boolean>(
      this.baseUrl +'cart-item/user/' +this.authenticateStorage.getUserIdFromToken() +'/product/' +prod_id,
      { headers: this.headers });
    return await firstValueFrom(response);
  }

  //Remove item from the cart
  async removeItemFromCart(user_id: number, cart_id: number, prod_id: number) {
    const response = this.http.delete(this.baseUrl +'cart-item/user/' + user_id +'/cart/' +cart_id +'/product/' +prod_id,
      { headers: this.headers });
    return await firstValueFrom(response);
  }

  //Delete all the cart items
  clearCart() {
    this.http.delete(this.baseUrl +'cart-item/user/' +this.authenticateStorage.getUserIdFromToken() +'/clear',
        { headers: this.headers }).subscribe((res) => {});
  }
}
