import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LocalStorageRefService } from '../local-storage.service';

import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _localStorage: Storage = this._localStorageRefService.localStorage;
  private _cartItems: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(JSON.parse(this._localStorage.getItem('cartData')) || []);
  public cartItems: Observable<Product[]> = this._cartItems.asObservable();

  private _totalItemsQty: BehaviorSubject<number> = new BehaviorSubject<number>(this.getTotalQty(JSON.parse(this._localStorage.getItem('cartData'))||[]))
  public totalItemsQty: Observable<number> = this._totalItemsQty.asObservable();

  constructor(private _localStorageRefService: LocalStorageRefService, public router: Router) {}

  public setStorageCartItems(data: Product[]):void {
    const jsonData = JSON.stringify(data)
    this._localStorage.setItem('cartData', jsonData)

  }

  public getCartItems():Product[] {
    const jsonData:Product[] = JSON.parse(this._localStorage.getItem('cartData'))
    this._cartItems.next(jsonData)
    return jsonData
  }

  public setCartItems(newCartItem: Product, isProductAdded: boolean): void {
    let items: Product[] = this._cartItems.value || [];
    if (isProductAdded) {
      let existedCartItem: Product = items.find(c => c.id === newCartItem.id && c.product_color === newCartItem.product_color) as Product;
      if (existedCartItem) {
        items.forEach(item => {
          if (item.id == newCartItem.id && item.product_color == newCartItem.product_color) {
            item.qty = item.qty + newCartItem.qty;
          }
        })
      }


      items = existedCartItem ? items : (items).concat([newCartItem]);
    } else {
      items.find(item => item.id === newCartItem.id).qty = newCartItem.qty;
    }
    this._cartItems.next(items);
    this.setTotalQty(items)
  }

  public removeCartItem(cartItem: Product): void {
    let items: Product[] = this._cartItems.value || [];
    items = items.filter(item => item.product_color !== cartItem.product_color || item.id !== cartItem.id);
    this._cartItems.next(items);
    this.setTotalQty(items)
  }

  public setTotalQty(items: Product[]): void {
    let total: number = 0;
    total = items.reduce((a, b) => a + b.qty, 0) ||0
    this._totalItemsQty.next(total);
  }

  public getTotalQty(items: Product[]) {
    return items.reduce((a, b) => a + b.qty, 0) || 0;
  }

  public decrementQty(): void {
    this._totalItemsQty.next(this._totalItemsQty.value - 1);
  }

  public canActivate(): boolean {
    let items: Product[] = this._cartItems.value || [];
    if (items.length) {
      this.router.navigate(['checkout']);
      return false;
    }
    return true;
  }

}
