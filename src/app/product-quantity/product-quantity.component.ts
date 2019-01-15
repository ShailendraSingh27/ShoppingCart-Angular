import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  constructor(private shoppingCartService: ShoppingCartService) { }

  @Input('product') product: Product;  
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  addToCart(){
    this.shoppingCartService.addToCart(this.product);       
  }

  removeFromCart(){
    this.shoppingCartService.removeFromCart(this.product);  
  }


}
