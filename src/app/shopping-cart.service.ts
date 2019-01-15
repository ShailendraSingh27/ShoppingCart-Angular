import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from './models/product';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { promise } from 'protractor';
import { ShoppingCart } from './models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object("shopping-cart/"+cartId+"/items").remove();
  }


  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();    
    return this.db.object('/shopping-cart/' +  cartId)
    .map(x => new ShoppingCart(x.items));
  }

  async addToCart(product: Product){
    this.updateItemQuantity(product, 1);
    
  }

  async removeFromCart(product: Product){
    this.updateItemQuantity(product, -1);
  }

  private create(){
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartID');
    
    if(cartId) return cartId;
        
    let result = await this.create();
    localStorage.setItem('cartID', result.key);
    return result.key;
   }
  
 
  private async updateItemQuantity(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();

    let item$ = this.db.object('/shopping-cart/' + cartId + '/items/' + product.$key);

    item$.take(1).subscribe(item => {


      if(item.$exists()) 
      {
        let newQuantity = item.quantity + change;
        if(newQuantity === 0)
           item$.remove();
        else
          item$.update({quantity: newQuantity});
      }
      else item$.set({
        //Product: product,
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: 1
      });
    })
  }
}
