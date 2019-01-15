import { Product } from './../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent  {
  
  private _categories$;
  public get categories$() {
    return this._categories$;
  }
  
  productToUpdate = {
    title:"",
    price:0,
    category:"",
    imageUrl:""
    };
  id;

  constructor(
    categoryService: CategoryService, 
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute ) {
    this._categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    
    if(this.id) this.productService.getProductByID(this.id).take(1).subscribe(p => this.productToUpdate = p);
    
  }

  onSave(product)
  {
    if(this.id)  this.productService.updateProduct(this.id,product)
    else  this.productService.create(product);

    this.router.navigateByUrl("/admin/products");
  }

  removeProduct()
  {
    if(!confirm("Do you want to remove the product?"))
      return;
    
    this.productService.removeProduct(this.id);
    this.router.navigateByUrl('/admin/products');
  }
 
}
