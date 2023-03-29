import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Order } from "../models/order";

@Injectable({providedIn:'root'})
export class OrderService{
    baseUrl:string='http://localhost:8080/api/v1/agora/order';
    headers = { 'content-type': 'application/json'}  

    constructor(private http:HttpClient){}

    saveOrder(order:Order){
        console.log("innn order");
        this.http.post(this.baseUrl,JSON.stringify(order),{'headers':this.headers}).subscribe(res=>{
            console.log(res);
        });
    }

    async getOrderById(order_id:number){
        const response= this.http.get<Order>(this.baseUrl+'/'+order_id);
        return await firstValueFrom(response);
     }
     async getAllUserOrders(user_id:number){
        const response= this.http.get<Order[]>(this.baseUrl+'/user/'+user_id);
        return await firstValueFrom(response);
     }
}