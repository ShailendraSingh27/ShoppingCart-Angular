import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product)
  {
    this.db.list('/products').push(product);
  }

  getProduct()
  {
    return this.db.list('/products');
  }

  getProductByID(id){
    return this.db.object('/products/' + id);
  }

  updateProduct(productId, product)
  {
    this.db.object('/products/' + productId).update(product);
  }

  removeProduct(productID){
    return this.db.object('/products/' + productID).remove();
  }
}
