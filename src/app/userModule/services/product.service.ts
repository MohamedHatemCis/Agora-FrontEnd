import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { firstValueFrom, Subject } from "rxjs";
import { Product } from "../models/Product";

@Injectable({providedIn:'root'})
export class ProductService implements OnInit{
    baseUrl:string='http://localhost:8080/api/v1/agora/products';
    productsChanged=new Subject<Product[]>();
    products:Product[];

    constructor(private http:HttpClient){}

    ngOnInit(): void {
    }
    getAllProductsWithCategoryAndSubCategory(cate_id:number,sub_id:number){
        this.http
        .get<Product[]>(this.baseUrl+'/'+cate_id+'/'+sub_id)
         .subscribe(res => {
         this.products=res;
         this.productsChanged.next(res);
         });
         return this.products;
    }
    async getProductById(id:number){
       let product:Product=new Product();
        const res= await firstValueFrom(this.http.get<Product>(this.baseUrl+'/'+id));
         return res;
    }
}