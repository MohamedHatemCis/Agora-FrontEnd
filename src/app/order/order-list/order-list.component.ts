import { Component, OnInit } from '@angular/core';
import { AuthenticationStorageService } from 'src/app/localStorage/authenticationStorage.service';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit{
  orders:Order[];
  orderIndex:number=-1;
  constructor(private orderService:OrderService,private authenticateStorage:AuthenticationStorageService){}
 async ngOnInit() {
    this.orders=await this.orderService.getAllUserOrders(this.authenticateStorage.getUserId());
 }
 onChangeOrderIndex(index:number){
  if(index==this.orderIndex)
    this.orderIndex=-1;
  else
    this.orderIndex=index;
 }
}
