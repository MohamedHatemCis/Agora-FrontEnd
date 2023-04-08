import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './userModule/about-us/about-us.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ProductsListComponent } from './userModule/products/products-list/products-list.component';
import { ProductDetailComponent } from './userModule/products/product-detail/product-detail.component';
import { CartListComponent } from './userModule/cart/cart-list/cart-list.component';
import { OrderListComponent } from './userModule/order/order-list/order-list.component';
import { OrderDetailsComponent } from './userModule/order/order-details/order-details.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddProductComponent } from './adminModule/add-product/add-product.component';
import { AddCategoryComponent } from './adminModule/add-category/add-category.component';
import { ImagesSliderComponent } from './images-slider/images-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProductsListComponent,
    ProductDetailComponent,
    FooterComponent,
    AboutUsComponent,
    CartListComponent,
    OrderListComponent,
    OrderDetailsComponent,
    ErrorPageComponent,
    AddProductComponent,
    AddCategoryComponent,
    ImagesSliderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
