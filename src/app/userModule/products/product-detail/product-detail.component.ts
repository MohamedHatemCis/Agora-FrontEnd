import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationStorageService } from 'src/app/localStorage/authenticationStorage.service';
import { Cart_Item } from '../../models/cart_Item';
import { Product } from '../../models/Product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { HelperFunctions } from 'src/app/helperFunctions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})

/**
 * The main role of this component is to show the details of the selected product with more details
    and with add the item to the cart with a entered quantity
 */
export class ProductDetailComponent implements OnInit {
  selectedProduct: Product;
  quantity: number = 1;
  canBuy: Boolean = true;
  isAdmin: Boolean = false;
  showAlert: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authenticateStorage: AuthenticationStorageService,
    private helperFunctions: HelperFunctions
  ) {}

  /**
   * Get the authenticated token , if admin > show edit button , else > show add to cart button .
   * Get the id of the product to be fetched from database .
   * Then the user can add it if it's not found before in my cart . 
   */
  async ngOnInit() {
    this.isAdmin = this.authenticateStorage.checkIfIsAdmin();
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      this.productService.getProductById(id).then(async (res) => {
        this.selectedProduct = res;
        this.canBuy = !(await this.cartService.checkInCartItem( this.selectedProduct.id));
      });
    });
  }

  // Add the item to the cart then show added message
  addToCart() {
    let item: Cart_Item = new Cart_Item();
    item.user_id = this.authenticateStorage.getUserIdFromToken();
    item.prod_quantity = this.quantity;
    item.product = this.selectedProduct;
    this.cartService.addCartItem(item);
    this.showMessage();
  }
  
  //Display an alert for 2.5 seconds
  showMessage() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.helperFunctions.reloadPage(this.router.url);
    }, 2500);
  }

}
