import { Cart } from "./cart";
import { Product } from "./Product";

export class Cart_Item{
    id:number;
    prod_quantity:number;
    cart:Cart;
    product:Product;
    order_id:number;
    user_id:number;
    constructor(){}
}