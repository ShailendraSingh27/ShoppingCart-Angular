import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  productList: Product[];
  filteredProduct: any[];
  subscription: Subscription;
  constructor(private productService: ProductService) { 
    this.subscription = productService.getProduct().subscribe(productsFromServer =>this.filteredProduct = this.productList = productsFromServer);
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  searchForProduct(searchQuery: string)
  {
    this.filteredProduct = (searchQuery) ? 
                            this.productList.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())) : 
                            this.productList;
  }

}
