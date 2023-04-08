import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelperFunctions } from 'src/app/helperFunctions';
import { Category } from 'src/app/userModule/models/Category';
import { Sub_Category } from 'src/app/userModule/models/Sub_Category';
import { CategoryService } from 'src/app/userModule/services/category.service';
import { Sub_CategoryService } from 'src/app/userModule/services/sub_category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})

/**
 * The main role of this component is to add or edit categories
 */
export class AddCategoryComponent implements OnInit, OnDestroy {
  categories: Category[];
  sub_categories: Sub_Category[];
  cate_subscription: Subscription;
  sub_subscription: Subscription;
  selectedCategoryId: number;
  selectedSubCategoryId: number;
  newSubCategoryName: string;
  newCategoryName: string;
  isAddingCategory: Boolean;

  constructor(
    private categoryService: CategoryService,
    private subCategoryService: Sub_CategoryService,
    private helperFunctions: HelperFunctions,
    private router: Router 
    ) {}


  /*
     * Get all categories while start opening the page .
     * Get All the subCategories of the first category .
  */
  ngOnInit(): void {
    /* 
      - Subscripe to listen if the category changed or not .
      - it take an action after emitting the categoryChanged subject in the service . 
    */
    this.cate_subscription = this.categoryService.categoryChanged.subscribe(
      (res) => {
        this.categories = res;
        this.selectedCategoryId = this.categories[0].id;
        this.subCategoryService.getAllSub_Categories(this.selectedCategoryId);
      }
    );
    this.categoryService.getAllCategories();

    /* 
       Subscripe to listen if the subCategory changed or not .
       it take an action after emitting the sub_categoryChanged subject in the service . 
    */
    this.sub_subscription = this.subCategoryService.sub_categoryChanged.subscribe(
        (sub_categories: Sub_Category[]) => {
          this.sub_categories = sub_categories;
          this.selectedSubCategoryId=this.sub_categories[0].id;
        }
      );
  }

  // Fired when select a category , then get all it's subCategories
  onCategoryChange(event: Event) {
    this.selectedCategoryId = +this.helperFunctions.onOptionSelected(event);
    this.subCategoryService.getAllSub_Categories(this.selectedCategoryId);
  }

  // Fired when select a category , then get the id of the subCategory
  onSubCategoryChange(event: Event) {
    this.selectedSubCategoryId = +this.helperFunctions.onOptionSelected(event);
  }

  //Add a new category
  onAddCategory() {
    if (this.newCategoryName) {
      let category = new Category();
      category.name = this.newCategoryName;
      this.categoryService.saveCategory(category);
      this.helperFunctions.reloadPage(this.router.url);
    }
  }

  //Add a new subCategory to a specific category
  onAddSubCategory() {
    if (this.newSubCategoryName) {
      let subCategory = new Sub_Category();
      subCategory.category = this.getCategory(this.selectedCategoryId);
      subCategory.name = this.newSubCategoryName;
      this.subCategoryService.saveSubCategory(subCategory);
      this.helperFunctions.reloadPage(this.router.url);
    }
  }

  //Show and Hide the add category part in html
  showAddCategory() {
    this.isAddingCategory = !this.isAddingCategory;
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

  //Delete category from database
 async onDeleteCategory(){
   await this.categoryService.deleteCategory(this.selectedCategoryId);
    this.helperFunctions.reloadPage(this.router.url);
  }

 //Delete subCategory from database
 async onDeleteSubCategory(){
   await this.subCategoryService.deleteSubCategory(this.selectedSubCategoryId);
    this.helperFunctions.reloadPage(this.router.url);
  }

  //UnSubscripe the subscriptions to prevent any memory leaks 
  ngOnDestroy(): void {
    this.cate_subscription.unsubscribe();
    this.sub_subscription.unsubscribe();
  }
}
