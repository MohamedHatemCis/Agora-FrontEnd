import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductsListComponent } from './products/products-list/products-list.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path:'products',component:ProductsListComponent},
  {path:'products/:id',component:ProductDetailComponent},
  {path:'cart',component:CartListComponent},
  {path:'orders',component:OrderListComponent},
  {path:'aboutUs',component:AboutUsComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {

}
