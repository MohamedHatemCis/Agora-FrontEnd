import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelperFunctions } from 'src/app/helperFunctions';
import { AuthenticationStorageService } from '../../../localStorage/authenticationStorage.service';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})

/**
 * The main purpose of this component is to :-
      - Show my cart items if existed .
      - Remove any item from the cart .
      - Make an order .
 * 
 */
export class CartListComponent implements OnInit, OnDestroy {
  cart: Cart = new Cart();
  subscription: Subscription;
  showAlert: boolean = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authenticateStorage: AuthenticationStorageService,
    private router: Router,
    private helperFunctions: HelperFunctions
  ) {}

  // Get all the user cart item  
  async ngOnInit() {
    this.subscription = this.cartService.cartChanged.subscribe((res) => {
      this.cart = res;
    });
    await this.cartService.fetchAllCartData(this.authenticateStorage.getUserIdFromToken());
  }

  //make an order and save it to database then display confirmation Message
  async onConfirm() {
    let order = new Order();
    order.num_of_items = this.cart.num_of_items;
    order.total = this.cart.total;
    order.user = this.cart.user;
    order.created_date = new Date();
    await this.orderService.saveOrder(order);
    this.showMessage();
  }

  // Remove an item from the cart then refresh the cart
  async onRemove(prod_id: number) {
    let user_id = this.authenticateStorage.getUserIdFromToken();
    await this.cartService.removeItemFromCart(user_id, this.cart.id, prod_id);
    this.helperFunctions.reloadPage(this.router.url);
  }

  //Display an alert for 2.5 seconds
  showMessage() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.helperFunctions.reloadPage(this.router.url);
    }, 2500);
  }

  //clear all the cart then refresh the page
  onClear() {
    this.cartService.clearCart();
    this.helperFunctions.reloadPage(this.router.url);
  }

  //UnSubscripe the subscriptions to prevent any memory leaks 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
