import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  
  productList: any;
  filteredProduct: Product[] = [];
  selectedCategory: string;
  cartValue: any;
  subscription: Subscription;

  constructor(
    private productService:ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
    ) {
  
    
      this.productService
        .getProduct()
        .switchMap(p => {
          this.productList = p;
          return route.queryParamMap;
        })
        .subscribe(c => {
          this.selectedCategory = c.get('category'); 
          this.filteredProduct = (this.selectedCategory) ?
                                this.productList.filter(p => p.category === this.selectedCategory) :
                                this.productList;
      });

  
   }

   async ngOnInit(){
    
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => this.cartValue = cart);
    
  
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
   
}
