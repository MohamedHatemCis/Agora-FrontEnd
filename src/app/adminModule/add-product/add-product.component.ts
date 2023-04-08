import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelperFunctions } from 'src/app/helperFunctions';
import { AuthenticationStorageService } from 'src/app/localStorage/authenticationStorage.service';
import { Category } from 'src/app/userModule/models/Category';
import { Product } from 'src/app/userModule/models/Product';
import { Sub_Category } from 'src/app/userModule/models/Sub_Category';
import { CategoryService } from 'src/app/userModule/services/category.service';
import { ProductService } from 'src/app/userModule/services/product.service';
import { Sub_CategoryService } from 'src/app/userModule/services/sub_category.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})

/**
 * The main role of this component is to add or edit products .
 */
export class AddProductComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  categories: Category[];
  sub_categories: Sub_Category[];
  cate_subscription: Subscription;
  sub_subscription: Subscription;
  selectedCategoryId: number;
  selectedSubCategoryId: number;
  editMode: Boolean = false;
  showAlert: Boolean = false;
  productId: number;
  alertMsg: string;

  constructor(
    private categoryService: CategoryService,
    private subCategoryService: Sub_CategoryService,
    private productService: ProductService,
    private helperFunctions: HelperFunctions,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  /**
   * The mean purpose of the ngOninit is to :- 
            - Determine if i'm in the edit mode or not.
            - Initialize the form .
            - set the data if i'm in the edit mode .
   */
  ngOnInit(): void {
  /**
      * When starting this component we check if there is an id as a parameter or not
            - if there is an id => that mean i'm in the edit mode .
            - else => that mean i'm in the add mode .
      * Initialize the form .
   */
    this.route.params.subscribe((params: Params) => {
      this.productId = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

    /* 
      - Subscripe to listen if the category changed or not .
      - it take an action after emitting the categoryChanged subject in the service .
      - Then set the value of the product category to the select tag if i'm in the edit mode .
    */
    this.cate_subscription = this.categoryService.categoryChanged.subscribe(
      (res) => {
        this.categories = res;
        if (!this.editMode) {
          this.selectedCategoryId = this.categories[0].id;
          this.productForm.get('cate')?.setValue(this.selectedCategoryId);
        }
        this.subCategoryService.getAllSub_Categories(this.selectedCategoryId);
      }
    );
    this.categoryService.getAllCategories();

   /* 
      - Subscripe to listen if the subCategory changed or not .
      - it take an action after emitting the sub_categoryChanged subject in the service .
      - Then set the value of the product subCategory to the select tag if i'm in the edit mode .
    */
    this.sub_subscription =
      this.subCategoryService.sub_categoryChanged.subscribe(
        (sub_categories: Sub_Category[]) => {
          this.sub_categories = sub_categories;
          if (!this.editMode)
            this.selectedSubCategoryId = this.sub_categories[0].id;
          this.productForm.get('sub')?.setValue(this.selectedSubCategoryId);
        }
      );
  }

  /**
      * The mean purpose of the initForm is to :- 
              - Initialize the form.
              - Fill the data if i'm in the edit mode .
   */
  async initForm() {
    this.productForm = new FormGroup({
      img: new FormControl(),
      name: new FormControl(),
      price: new FormControl(),
      quantity: new FormControl(),
      description: new FormControl(),
      cate: new FormControl(),
      sub: new FormControl(),
    });

    // fill form fields with the edited product
    if (this.editMode) {
      let product = await this.productService.getProductById(this.productId);
      this.selectedCategoryId = product.subCategory.category.id;
      this.selectedSubCategoryId = product.subCategory.id;
      this.productForm.patchValue({
        name: product.name,
        img: product.img,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        cate: this.selectedCategoryId,
        sub: this.selectedSubCategoryId,
      });
    }
  }

  // Fired when select a category , then get all it's subCategories
  onCategoryChange(event: Event) {
    this.selectedCategoryId = +this.helperFunctions.onOptionSelected(event);
    this.subCategoryService.getAllSub_Categories(this.selectedCategoryId);
  }

  // Fired when select a subCategory
  onSubCategoryChange(event: Event) {
    this.selectedSubCategoryId = +this.helperFunctions.onOptionSelected(event);
  }

  /**
   * If i'm in the edit mode then :-
          - set the id of the product to update it using the same query which used to add products to database
                  -- that's because while save a product with and exists id , it update the existed one
   * Then fill the product object with the form values then save it .
   */
  onCreate() {
    let product = new Product();
    this.alertMsg = this.editMode ? 'Product Edited :)' : 'Product Added';
    if (this.editMode) {
      product.id = this.productId;
      product.modified_date = new Date();
    }

    product.name = this.productForm.value['name'];
    product.price = this.productForm.value['price'];
    product.quantity = this.productForm.value['quantity'];
    product.description = this.productForm.value['description'];
    product.img = this.productForm.value['img'];
    product.available = true;
    product.category = this.getCategory(this.selectedCategoryId);
    product.subCategory = this.getSubCategory(this.selectedSubCategoryId);
    this.productService.saveProduct(product);
    this.showMessage();
  }


  //Get all the category info from it's id
  getCategory(id: number) {
    let category: Category = new Category();
    this.categories.forEach((cat) => {
      if (cat.id == id) {
        category = cat;
      }
    });
    return category;
  }


  //Get all the subCategory info from it's id
  getSubCategory(id: number) {
    let subCategory: Sub_Category = new Sub_Category();
    this.sub_categories.forEach((sub) => {
      if (sub.id == id) {
        subCategory = sub;
      }
    });
    return subCategory;
  }

   // Set the availability of the product to false , not delete it permentely :)
   onDelete() {
    this.alertMsg = 'Product Deleted !';
    this.productService.deleteProduct(this.productId);
    this.showMessage();
  }


  // Show an alert for 2 seconds only
  showMessage() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.location.back();
    }, 2000);
  }

  //UnSubscripe the subscriptions to prevent any memory leaks 
  ngOnDestroy(): void {
    this.cate_subscription.unsubscribe();
    this.sub_subscription.unsubscribe();
  }
}
