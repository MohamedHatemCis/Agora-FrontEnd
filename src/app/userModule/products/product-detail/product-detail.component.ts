import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthenticationStorageService } from 'src/app/localStorage/authenticationStorage.service';
import { Cart_Item } from '../../models/cart_Item';
import { Product } from '../../models/Product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';




@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  selectedProduct:Product;
  quantity:number=1;
  canBuy:Boolean=true;
  constructor(private route:ActivatedRoute,private productService:ProductService,private cartService:CartService,private authenticateStorage:AuthenticationStorageService){}
  async ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
         let id = params['id']; 
         this.productService.getProductById(id).then(async res=>{
          this.selectedProduct=res;
             this.canBuy=!await this.cartService.checkInCartItem(this.selectedProduct.id);
   console.log(this.canBuy);
         });
      }
   );

  }
  addToCart(){
      let item:Cart_Item=new Cart_Item();
      item.user_id=this.authenticateStorage.getUserId();
      item.prod_quantity=this.quantity;
      item.product=this.selectedProduct;
      this.cartService.addCartItem(item);
  }
}
