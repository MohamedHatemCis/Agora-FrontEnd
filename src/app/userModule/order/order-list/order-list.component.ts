import { Component, OnInit } from '@angular/core';
import { AuthenticationStorageService } from 'src/app/localStorage/authenticationStorage.service';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
/**
 * The main role of this component is to :-
        - show all the user orders >> if the authenticated token is for user
        - show all orders >> if the authenticated token is for admin
 */
export class OrderListComponent implements OnInit {
  orders: Order[];
  orderIndex: number = -1;
  isAdmin:Boolean=false;
  constructor(
    private orderService: OrderService,
    private authenticateStorage: AuthenticationStorageService
  ) {}

  //fetch the user orders or all orders for admin
  async ngOnInit() {
    this.isAdmin=this.authenticateStorage.checkIfIsAdmin();
    if (!this.isAdmin)
        this.orders = await this.orderService.getAllUserOrders(this.authenticateStorage.getUserIdFromToken());
    else 
        this.orders = await this.orderService.getAllOrders();
  }

  //Show the items of selected order index
  onChangeOrderIndex(index: number) {
    if (index == this.orderIndex) this.orderIndex = -1;
    else this.orderIndex = index;
  }

}
