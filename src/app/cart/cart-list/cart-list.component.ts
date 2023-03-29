import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelperFunctions } from 'src/app/helperFunctions';
import { AuthenticationStorageService } from 'src/app/localStorage/authenticationStorage.service';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit,OnDestroy{
cart:Cart=new Cart();
subscription:Subscription;
constructor(private cartService:CartService,private orderService:OrderService,
  private authenticateStorage:AuthenticationStorageService,private router:Router,
  private helperFunctions:HelperFunctions){}

async ngOnInit() {
 this.subscription=this.cartService.cartChanged.subscribe(res=>{
  this.cart=res;
 });
 await this.cartService.fetchAllCartData(this.authenticateStorage.getUserId());
}

onConfirm(){
 let order=new Order();
 order.num_of_items=this.cart.num_of_items;
 order.total=this.cart.total;
 order.user=this.cart.user;
 order.created_date=new Date();
 this.orderService.saveOrder(order);
 this.helperFunctions.reloadPage(this.router.url);
}

onRemove(prod_id:number){
  let user_id=this.authenticateStorage.getUserId();
  this.cartService.removeItemFromCart(user_id,this.cart.id,prod_id);
  this.helperFunctions.reloadPage(this.router.url);
}
onClear(){
  this.cartService.clearCart();
  this.helperFunctions.reloadPage(this.router.url);
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
}
