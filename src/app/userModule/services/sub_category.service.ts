import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { Sub_Category } from '../models/Sub_Category';
import { AuthenticationStorageService } from 'src/app/localStorage/authenticationStorage.service';

/**
 * The main purpose of this service is to :-
          -  Save subCategory to specific category in the database .
          -  Get all subCategories of specific category.
 */
@Injectable({ providedIn: 'root' })
export class Sub_CategoryService {

  baseUrl: string = 'http://localhost:8080/api/v1/agora/sub_category';
  headers = {
    'content-type': 'application/json',
    Authorization:
      'Bearer ' + this.authenticateStorage.getUserTokenFromStorage(),
  };

  sub_categories: Sub_Category[];
  sub_categoryChanged = new Subject<Sub_Category[]>();

  constructor(
    private http: HttpClient,
    private authenticateStorage: AuthenticationStorageService
  ) {}

  // Get all subCategories of the selected category from database then emit the subject .
  getAllSub_Categories(id: number) {
    this.http.get<Sub_Category[]>(this.baseUrl + '/' + id, { headers: this.headers })
      .subscribe((res) => {
        this.sub_categories = res;
        this.sub_categoryChanged.next(res);    
      });
    return this.sub_categories;
  }

  // Save a new subCategory in database
  async saveSubCategory(subCategory: Sub_Category) {
    const response = this.http.post<Boolean>(this.baseUrl,JSON.stringify(subCategory),
      { headers: this.headers });
    return await firstValueFrom(response);
  }

   //Delete subCategory from database
   async deleteSubCategory(sub_id:number){
    const response = this.http.delete<number>(this.baseUrl+"/"+sub_id,
      { headers: this.headers });
    return await firstValueFrom(response);
  }
}
