import { Category } from "./Category";
import { Sub_Category } from "./Sub_Category";

export class Product{
 id:number;
 name:string;
 price:number;
 description:string;
 quantity:number;
 img:string;
 created_date:Date;
 modified_date:Date;
 available:Boolean;
 category:Category;
 subCategory:Sub_Category;
}