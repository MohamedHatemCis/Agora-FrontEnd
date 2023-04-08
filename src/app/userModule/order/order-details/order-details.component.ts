import { Component, Input, OnInit } from '@angular/core';
import { Cart_Item } from '../../models/cart_Item';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
/**
 * The main role of this component it to show each order items in an horizontal list
 */
export class OrderDetailsComponent implements OnInit{
@Input("order_id") order_id:number;
orderItems:Cart_Item[];

constructor(private cartService:CartService){}

 // Fetch order items from database
 async ngOnInit() {
  this.orderItems=
      await this.cartService.getOrderItems(this.order_id);
}
}
