import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/localStorage/localStorage.service';
import { Category } from '../../models/Category';
import { Product } from '../../models/Product';
import { Sub_Category } from '../../models/Sub_Category';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Sub_CategoryService } from '../../services/sub_category.service';
import { HelperFunctions } from 'src/app/helperFunctions';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})

// The main purpose of this component is to view products
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[];
  categories: Category[];
  sub_categories: Sub_Category[];
  prod_subscription: Subscription;
  cate_subscription: Subscription;
  sub_subscription: Subscription;
  selectedCategoryIndex: number;
  selectedSubCategoryIndex: number;
  searchTxt: string;
  filteredProducts: Product[];
  isSearching: Boolean = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private subCategoryService: Sub_CategoryService,
    private localStorageService: LocalStorageService,
    private helperFunctions:HelperFunctions
    ) {}

/**
 * When starting loading this component we get :-
      - Get the last selected category and subCategory which saved in local Storage
      - Fetch the products of the selected category and subCategory
 */
  ngOnInit(): void {

    //Reload the page after returns back to it
    window.addEventListener('popstate', () => {
      window.location.reload();
    });

    // Get the last selected category and subCategory which saved in local Storage
    this.selectedCategoryIndex = this.localStorageService.getLocalStorageItem('cateIndex');
    this.selectedSubCategoryIndex = this.localStorageService.getLocalStorageItem('subIndex');


    /* 
      - Subscripe to listen if the products changed or not .
      - it take an action after emitting the productsChanged subject in the service .
      - then set the value of products from the emitted subject .
    */
    this.prod_subscription = this.productService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );

    //Fetch all the category and subCategory products from database
    this.products =
      this.productService.getAllProductsWithCategoryAndSubCategory(this.selectedCategoryIndex,this.selectedSubCategoryIndex);

    /* 
      - Subscripe to listen if the category changed or not .
      - it take an action after emitting the categoryChanged subject in the service .
      - then set the value of categories from the emitted subject .
      - If there isn't any category saved in storage , make the selected category the first one
    */
    this.cate_subscription = this.categoryService.categoryChanged.subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        if (!this.localStorageService.checkIfExistedValue('cateIndex')) {
          this.selectedCategoryIndex = this.categories[0].id;
        }
      }
    );
    this.categories = this.categoryService.getAllCategories();


    /* 
      - Subscripe to listen if the subCategory changed or not .
      - it take an action after emitting the sub_categoryChanged subject in the service .
      - then set the value of subCategories from the emitted subject .
      - If the selected category not equal to the existed one in the storage then :-
                -- Set the selected category in local storage .
      - Set the subCategory in local storage .
      - Finally , fetch the products of the selected category and subCategory .
    */
    this.sub_subscription =
      this.subCategoryService.sub_categoryChanged.subscribe(
        (sub_categories: Sub_Category[]) => {
          this.sub_categories = sub_categories;
          if (this.localStorageService.getLocalStorageItem('cateIndex') !== this.selectedCategoryIndex) {
            this.selectedSubCategoryIndex = this.sub_categories[0].id;
            this.localStorageService.setLocalStorageItem('cateIndex',this.selectedCategoryIndex);
          }
          this.localStorageService.setLocalStorageItem('subIndex',this.selectedSubCategoryIndex);
          this.productService.getAllProductsWithCategoryAndSubCategory(this.selectedCategoryIndex,this.selectedSubCategoryIndex);
        }
      );
    this.sub_categories = this.subCategoryService.getAllSub_Categories(this.selectedCategoryIndex);
  }

  // Filter products with the search text while press search button of while the text changed .
  onSearch() {
    this.isSearching = true;
    this.filterProducts(this.searchTxt);
  }

  // Fired when select a category , then get all it's subCategories
  onCategoryChange(event: Event) {
    this.selectedCategoryIndex = +this.helperFunctions.onOptionSelected(event);
    this.subCategoryService.getAllSub_Categories(this.selectedCategoryIndex);
  }

  // Fired when select a subCategory , then get products of the selected category and subCategory
  onSubCategoryChange(event: Event) {
    this.selectedSubCategoryIndex = +this.helperFunctions.onOptionSelected(event);
    this.localStorageService.setLocalStorageItem('subIndex',this.selectedSubCategoryIndex);
    this.productService.getAllProductsWithCategoryAndSubCategory(this.selectedCategoryIndex,this.selectedSubCategoryIndex);
  }

  //Filter products if the products contains the entered search value
  filterProducts(name: string) {
    this.filteredProducts = [];
    this.products.forEach((prod) => {
      if (prod.name.toLowerCase().includes(name.toLowerCase())) {
        this.filteredProducts.push(prod);
      }
    });
  }

  //UnSubscripe the subscriptions to prevent any memory leaks 
  ngOnDestroy(): void {
    this.prod_subscription.unsubscribe();
    this.cate_subscription.unsubscribe();
    this.sub_subscription.unsubscribe();
  }
}
