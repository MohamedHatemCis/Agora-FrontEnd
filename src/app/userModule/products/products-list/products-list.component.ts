import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/localStorage/localStorage.service';
import { Category } from '../../models/Category';
import { Product } from '../../models/Product';
import { Sub_Category } from '../../models/Sub_Category';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Sub_CategoryService } from '../../services/sub_category.service';



@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit,OnDestroy{
  products:Product[];
  categories:Category[];
  sub_categories:Sub_Category[];
  prod_subscription:Subscription;
  cate_subscription:Subscription;
  sub_subscription:Subscription;
  selectedCategoryIndex:number;
  selectedSubCategoryIndex:number;

  constructor(private productService:ProductService
    ,private categoryService:CategoryService,
    private subCategoryService:Sub_CategoryService,
    private localStorageService:LocalStorageService
    ,private router:Router){}

  ngOnInit(): void {
    window.addEventListener('popstate', () => {
      console.log("i'm in reload fun");
      window.location.reload();
    });
    this.selectedCategoryIndex=this.localStorageService.getLocalStorageItem("cateIndex");
    this.selectedSubCategoryIndex=this.localStorageService.getLocalStorageItem("subIndex");

   this.prod_subscription=this.productService.productsChanged.subscribe((products:Product[])=>{
    this.products=products;
   });
   this.products=this.productService.getAllProductsWithCategoryAndSubCategory(this.selectedCategoryIndex,this.selectedSubCategoryIndex);

   this.cate_subscription= this.categoryService.categoryChanged.subscribe((categories:Category[])=>{
    this.categories=categories;
    if(!this.localStorageService.checkIfExistedValue("cateIndex")){
      this.selectedCategoryIndex=this.categories[0].id;
    }
  });
  this.categories=this.categoryService.getAllCategories();

 this.sub_subscription=this.subCategoryService.sub_categoryChanged.subscribe((sub_categories:Sub_Category[])=>{
      this.sub_categories=sub_categories;
      if(this.localStorageService.getLocalStorageItem("cateIndex")!==this.selectedCategoryIndex){
          this.selectedSubCategoryIndex=this.sub_categories[0].id;
          this.localStorageService.setLocalStorageItem("cateIndex",this.selectedCategoryIndex);
      }
      this.localStorageService.setLocalStorageItem("subIndex",this.selectedSubCategoryIndex);
      this.productService.getAllProductsWithCategoryAndSubCategory(this.selectedCategoryIndex,this.selectedSubCategoryIndex);
  
  });
  this.sub_categories=this.subCategoryService.getAllSub_Categories(this.selectedCategoryIndex);
  }

  onSearch(){
    console.log("category "+this.selectedCategoryIndex);
    console.log("sub "+this.selectedSubCategoryIndex);
  }
  onSelectProduct(product:Product){
  }
  onCategoryChange(event:Event){
    this.selectedCategoryIndex = +this.onOptionSelected(event);
    this.subCategoryService.getAllSub_Categories(this.selectedCategoryIndex);
  }
  onSubCategoryChange(event:Event){
    this.selectedSubCategoryIndex = +this.onOptionSelected(event);
    this.localStorageService.setLocalStorageItem("subIndex",this.selectedSubCategoryIndex);
    this.productService.getAllProductsWithCategoryAndSubCategory(this.selectedCategoryIndex,this.selectedSubCategoryIndex);
  }
  onOptionSelected(event:Event){
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    return selectElement.options[selectedIndex].value;
  }
  ngOnDestroy(): void {
    this.prod_subscription.unsubscribe();
    this.cate_subscription.unsubscribe();
    this.sub_subscription.unsubscribe();
  }
}
