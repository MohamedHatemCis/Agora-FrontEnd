import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { Category } from '../models/Category';
import { AuthenticationStorageService } from 'src/app/localStorage/authenticationStorage.service';

/**
 * The main purpose of this service is to :-
          -  Save category to database .
          -  Get all categories .
 */
@Injectable({ providedIn: 'root' })
export class CategoryService {

  baseUrl: string = 'http://localhost:8080/api/v1/agora/category';
  headers = {
    'content-type': 'application/json',
    Authorization:
      'Bearer ' + this.authenticateStorage.getUserTokenFromStorage(),
  };

  categories: Category[];
  categoryChanged = new Subject<Category[]>();

  constructor(
    private http: HttpClient,
    private authenticateStorage: AuthenticationStorageService
  ) {}

  // Get all categories from database then emit the subject .
  getAllCategories() {
    this.http.get<Category[]>(this.baseUrl, { headers: this.headers })
      .subscribe((res) => {
        this.categories = res;
        this.categoryChanged.next(res);
      });
    return this.categories;
  }

  // Save a new category in database
  async saveCategory(category: Category) {
    const response = this.http.post<Boolean>(this.baseUrl,JSON.stringify(category),
      { headers: this.headers });
    return await firstValueFrom(response);
  }

  //Delete category from database
  async deleteCategory(cate_id:number){
    const response = this.http.delete<number>(this.baseUrl+"/"+cate_id,
      { headers: this.headers });
    return await firstValueFrom(response);
  }
}
