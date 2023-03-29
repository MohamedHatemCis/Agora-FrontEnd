import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { firstValueFrom, from, Subject } from "rxjs";
import { AuthenticationStorageService } from "../localStorage/authenticationStorage.service";
import { Cart } from "../models/cart";
import { Cart_Item } from "../models/cart_Item";

@Injectable({providedIn:'root'})
export class CartService implements OnInit{
baseUrl:string='http://localhost:8080/api/v1/agora/';
headers = { 'content-type': 'application/json'}  

myCart:Cart=new Cart();
cartChanged=new Subject<Cart>();
ngOnInit(): void {
    
}
constructor(private http:HttpClient,private authenticateStorage:AuthenticationStorageService){}

saveCart(cart:Cart){
    this.http.post(this.baseUrl+'cart',JSON.stringify(cart),{'headers':this.headers}).subscribe(res=>{
        console.log(res);
    });
}
async checkIfExistedCart(user_id:number):Promise<boolean>{
    let found:boolean=false;
    const response = this.http.get<boolean>(this.baseUrl+'cart/check/'+user_id);
    found = await firstValueFrom(response);
    return found;
}

async getCart(id:number){
   const response= this.http.get<Cart>(this.baseUrl+'cart/'+id);
   this.myCart=await firstValueFrom(response);
}

addCartItem(cart_item:Cart_Item){
    this.http.post(this.baseUrl+'cart-item',JSON.stringify(cart_item),{'headers':this.headers})
    .subscribe(res=>{
    });
}
async getCartItems(cart_id:number){
  const response = this.http.get<Cart_Item[]>(this.baseUrl+"cart-item/"+cart_id);
  this.myCart.items=await firstValueFrom(response);
}

async getOrderItems(order_id:number){
    const response = this.http.get<Cart_Item[]>(this.baseUrl+"cart-item/user/"+this.authenticateStorage.getUserId()+"/order/"+order_id);
    return await firstValueFrom(response);
  }

async fetchAllCartData(user_id:number):Promise<Boolean>{
    const check=await firstValueFrom(from(this.checkIfExistedCart(user_id)));
    if(check==true)
    {
        
        await firstValueFrom(from(this.getCart(user_id)));
        await firstValueFrom(from(this.getCartItems(this.myCart.id)));
        this.cartChanged.next(this.myCart);
        return true;
    }
    else
    {
        return false;
    }
}

async checkInCartItem(prod_id:number){
    const response = this.http.get<Boolean>(this.baseUrl+"cart-item/user/"+this.authenticateStorage.getUserId()+"/product/"+prod_id);
    return await firstValueFrom(response);
}

removeItemFromCart(user_id:number,cart_id:number,prod_id:number){
   this.http.delete(this.baseUrl+"cart-item/user/"+user_id+"/cart/"+cart_id+"/product/"+prod_id).subscribe(res=>{

   });
}

clearCart(){
    this.http.delete(this.baseUrl+"cart-item/user/"+this.authenticateStorage.getUserId()+"/clear").subscribe(res=>{

    });
}

}