import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Category } from "../models/Category";

@Injectable({providedIn:'root'})
export class CategoryService implements OnInit{
    baseUrl:string='http://localhost:8080/api/v1/agora/category';
    categories:Category[];
    categoryChanged=new Subject<Category[]>();

    constructor(private http:HttpClient){}
ngOnInit(){
}
getAllCategories(){
    this.http
    .get<Category[]>(this.baseUrl)
     .subscribe(res => {
     this.categories=res;
     this.categoryChanged.next(res);
     });
     return this.categories;
}
}