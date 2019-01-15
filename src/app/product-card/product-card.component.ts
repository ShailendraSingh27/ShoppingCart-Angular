import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {

  constructor(private shoppingCartService: ShoppingCartService) { }

  @Input('product') product: Product;
  @Input('show-action-button') showActionButton = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  addToCart(){
    this.shoppingCartService.addToCart(this.product);       
  }

}
