import { Shipping } from './../models/shipping';
import { Order } from './../models/order';
import { AuthService } from './../auth.service';
import { Product } from './../models/product';
import { Subscription } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{ 
  shipping:Shipping = {
    name: "",
    addressLine1: "",
    addressLine2: "",
    city:""
  }; 
  cart: ShoppingCart;
  
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderSerice: OrderService,
    private shoppingCartService: ShoppingCartService){}

  async ngOnInit(){
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
  
  
  async placeOrder() {
    let order = new Order(this.userId,this.shipping,this.cart);
   
    let result = await this.orderSerice.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }    
}
