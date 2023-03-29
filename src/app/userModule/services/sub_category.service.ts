import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Sub_Category } from "../models/Sub_Category";

@Injectable({providedIn:'root'})
export class Sub_CategoryService implements OnInit{
    baseUrl:string='http://localhost:8080/api/v1/agora/sub_category';
    sub_categories:Sub_Category[];
    sub_categoryChanged=new Subject<Sub_Category[]>();

    constructor(private http:HttpClient){}
ngOnInit(){
}
getAllSub_Categories(id:number){
    this.http
    .get<Sub_Category[]>(this.baseUrl+'/'+id)
     .subscribe(res => {
     this.sub_categories=res;
     this.sub_categoryChanged.next(res);
     });
     return this.sub_categories;
}
}