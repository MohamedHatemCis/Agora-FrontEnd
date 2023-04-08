import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './userModule/about-us/about-us.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { CartListComponent } from './userModule/cart/cart-list/cart-list.component';
import { OrderListComponent } from './userModule/order/order-list/order-list.component';
import { ProductDetailComponent } from './userModule/products/product-detail/product-detail.component';
import { ProductsListComponent } from './userModule/products/products-list/products-list.component';
import { AddProductComponent } from './adminModule/add-product/add-product.component';
import { AddCategoryComponent } from './adminModule/add-category/add-category.component';
import { AuthenticationGuard } from './Authentication_AuthorizationGuard/AuthenticationGuard';
import { Admin_AuthorizationGuard } from './Authentication_AuthorizationGuard/Admin_AuthorizationGuard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { User_AuthorizationGuard } from './Authentication_AuthorizationGuard/User_AuthorizationGuard';



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path:'aboutUs',component:AboutUsComponent},
  {path:'products',component:ProductsListComponent,canActivate:[AuthenticationGuard]},
  {path:'products/:id',component:ProductDetailComponent,canActivate:[AuthenticationGuard]},
  {path:'cart',component:CartListComponent,canActivate:[AuthenticationGuard,User_AuthorizationGuard]},
  {path:'orders',component:OrderListComponent,canActivate:[AuthenticationGuard,User_AuthorizationGuard]},
  //admin pages
  {path:"admin/add-product",component:AddProductComponent,canActivate:[AuthenticationGuard,Admin_AuthorizationGuard]},
  {path:'admin/categories',component:AddCategoryComponent,canActivate:[AuthenticationGuard,Admin_AuthorizationGuard]},
  {path:'admin/edit-product/:id',component:AddProductComponent,canActivate:[AuthenticationGuard,Admin_AuthorizationGuard]},
  {path:'admin/all-orders',component:OrderListComponent,canActivate:[AuthenticationGuard,Admin_AuthorizationGuard]},
  {path:'error',component:ErrorPageComponent},
  {path:"**",component:LoginComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {

}
