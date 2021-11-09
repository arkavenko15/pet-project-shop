import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Product } from './../products/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public cartItems: Observable<Product[]> = this._cartItems.asObservable();

  private _totalItemsQty: Subject<number> = new Subject<number>();
  public totalItemsQty: Observable<number> = this._totalItemsQty.asObservable();

  constructor() { }

  setCartItems(newCartItem: Product): void {
    console.log('newCartItem', newCartItem);
    let items: Product[] = this._cartItems.value || [];


    let existedCartItem: Product = items.find(c => c.id === newCartItem.id) as Product;

    debugger
    if (existedCartItem) {
      items.forEach(item => {
        if (item.id === newCartItem.id) {
          item.qty = item.qty + newCartItem.qty;
        }
      })
    }

    items = existedCartItem ? items : (items).concat([newCartItem]); // (previousCartItems).concat(newCartItem)


    this.setTotalQty(items)
    this._cartItems.next(items); // fires new arrays of cartItems
  }

  setTotalQty(items: Product[]): void {

    this._totalItemsQty.next(4);
  }
}
