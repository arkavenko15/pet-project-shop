import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageRefService } from '../local-storage.service';

import { Product } from './../products/models/product.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartItems: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public cartItems: Observable<Product[]> = this._cartItems.asObservable();

  private _totalItemsQty: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public totalItemsQty: Observable<number> = this._totalItemsQty.asObservable();
  //storage
  private _localStorage: Storage;
  private _cartData$ = new BehaviorSubject<any>(null)
  public cartData$ = this._cartData$.asObservable()

  //storage
  constructor(private _localStorageRefService: LocalStorageRefService) {
    this._localStorage = _localStorageRefService.localStorage
  }

  //storage
  setInfo(data: any) {
    const jsonData = JSON.stringify(data)
    this._localStorage.setItem('cartData', jsonData)
    this._cartData$.next(data)
  }

  loadInfo() {
    const data = JSON.parse(this._localStorage.getItem('cartData'))
    this._cartData$.next(data)
  }
  //storage

  setCartItems(newCartItem: Product, isProductAdded: boolean): void {
    let items: Product[] = this._cartItems.value || [];

    if (isProductAdded) {
      let existedCartItem: Product = items.find(c => c.id === newCartItem.id) as Product;
      if (existedCartItem) {
        items.forEach(item => {
          if (item.id == newCartItem.id) {
            item.qty = item.qty + newCartItem.qty;
          }
        })
      }

      items = existedCartItem ? items : (items).concat([newCartItem]); // (previousCartItems).concat(newCartItem)
      // fires new arrays of cartItems
    } else {
      items.find(item => item.id === newCartItem.id).qty = newCartItem.qty
    }
    this._cartItems.next(items);
    this.setTotalQty(items)
  }

  removeCartItem(cartItem: Product): void {
    let items: Product[] = this._cartItems.value || [];
    items = items.filter(item => item.id !== cartItem.id);
    this._cartItems.next(items);
    this.setTotalQty(items)
  }

  setTotalQty(items: Product[]): void {
    let total: number = 0;
    total = items.reduce((a, b) => a + b.qty, 0)
    this._totalItemsQty.next(total);
  }

  decrementQty(): void {
    this._totalItemsQty.next(this._totalItemsQty.value - 1);
  }

}
