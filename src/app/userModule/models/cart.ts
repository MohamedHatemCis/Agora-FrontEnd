import { Cart_Item } from "./cart_Item";
import { User } from "./User";

export class Cart{
    id:number;
    total:number;
    num_of_items:number;
    items:Cart_Item[]=[];
    user:User;

    addItem(item:Cart_Item){
        this.items.push(item);
    }
    removeItem(index:number){
    }
}