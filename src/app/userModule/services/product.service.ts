import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { Product } from '../models/Product';
import { AuthenticationStorageService } from 'src/app/localStorage/authenticationStorage.service';

/**
 * The main purpose of this service is to :-
          -  Get the products of a specific category and subCategory .
          -  Get Product details by id .
          -  Save and delete products .
 */
@Injectable({ providedIn: 'root' })
export class ProductService{

  baseUrl: string = 'http://localhost:8080/api/v1/agora/products';
  headers = {
    'content-type': 'application/json',
    Authorization:
      'Bearer ' + this.authenticateStorage.getUserTokenFromStorage(),
  };

  productsChanged = new Subject<Product[]>();
  products: Product[];

  constructor(
    private http: HttpClient,
    private authenticateStorage: AuthenticationStorageService
  ) {}

  // Get the products of a specific category and subCategory
  getAllProductsWithCategoryAndSubCategory(cate_id: number, sub_id: number) {
    this.http.get<Product[]>(this.baseUrl + '/' + cate_id + '/' + sub_id,
       {headers: this.headers,})
      .subscribe((res) => {
        this.products = res;
        this.productsChanged.next(res);
    });
    return this.products;
  }

  // Get Product details by id
  async getProductById(id: number) {
    let product: Product = new Product();
    const res = await firstValueFrom(
      this.http.get<Product>(this.baseUrl + '/' + id, { headers: this.headers })
    );
    return res;
  }

  // Save product to database
  async saveProduct(product: Product) {
    const response = this.http.post<Boolean>(this.baseUrl,
      JSON.stringify(product),
      { headers: this.headers });
    return await firstValueFrom(response);
  }

  // Delete product softly from database
  async deleteProduct(id: number) {
    const response = this.http.delete<number>(this.baseUrl + '/' + id, 
    {headers: this.headers,});
    return await firstValueFrom(response);
  }

}
