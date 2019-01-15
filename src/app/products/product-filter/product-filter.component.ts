import { CategoryService } from './../../category.service';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  @Input('category') selectedCategory;
  
  categoryList$;
  constructor(private categoryService:CategoryService) {
    this.categoryList$ = categoryService.getCategories();
   }

}
