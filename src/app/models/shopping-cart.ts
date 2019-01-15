import { Product } from './product';
import { ShoppingCartItem } from './shooping-cart-items';
export class ShoppingCart{

    items: ShoppingCartItem[] = [];
    constructor(public itemMap: {[productId:string]: ShoppingCartItem}){
        this.itemMap = itemMap || {};
        for(let productId in itemMap){
            let item = itemMap[productId];
            let x = new ShoppingCartItem();
            Object.assign(x, item);
            x.$key = productId;
            this.items.push(x);
        }
    }

    get totalPrice(){
        let totalPrice = 0;
        for(let product in this.items)
            totalPrice += this.items[product].totalPrice;
        return totalPrice;
    }


    get totalItemCount(){
        let shoppingCartItemCount = 0;  
        for(let productId in this.itemMap)
            shoppingCartItemCount += this.itemMap[productId].quantity;
        return shoppingCartItemCount;
    }

  getQuantity(product: Product){
    let item = this.itemMap[product.$key];
    return item ? item.quantity : 0 ;
  }
}