import { Component, Input, OnInit } from '@angular/core';
import { Cart_Item } from 'src/app/models/cart_Item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
@Input("order_id") order_id:number;
orderItems:Cart_Item[];
constructor(private cartService:CartService){}
 async ngOnInit() {
  this.orderItems=await this.cartService.getOrderItems(this.order_id);
}
}
