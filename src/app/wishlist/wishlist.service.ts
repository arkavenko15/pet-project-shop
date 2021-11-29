import { Product } from './../products/models/product.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LocalStorageRefService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private _localStorage: Storage = this._localStorageRefService.localStorage;

  private _wishlistItems: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(JSON.parse(this._localStorage.getItem('wishlistData')) || []);
  public wishlistItems: Observable<Product[]> = this._wishlistItems.asObservable();

  private _changedItem: Subject<Product> = new Subject<Product>();
  public changedItem: Observable<Product> = this._changedItem.asObservable();

  // private _wishlistData$ = new Subject<Product[]>();
  // public wishlistData$: Observable<Product[]> = this._wishlistData$.asObservable();

  constructor(private _localStorageRefService: LocalStorageRefService) { }

  public setWishlistItems(newWishlistItem: Product) {
    let wishlistItems: Product[] = this._wishlistItems.value || [];
    wishlistItems = wishlistItems.concat([newWishlistItem])
    this.setStorageWishListItems(wishlistItems)
    this._wishlistItems.next(wishlistItems);

  }

  public removeWishlistItem(item: Product): void {
    let wishlistItems: Product[] = this._wishlistItems.value || [];
    this._changedItem.next(item);
    wishlistItems = wishlistItems.filter((i) => i.id !== item.id);
    this.setStorageWishListItems(wishlistItems);
    this._wishlistItems.next(wishlistItems);
  }

  public setStorageWishListItems(data: Product[]): void {
    const jsonData = JSON.stringify(data)
    this._localStorage.setItem('wishlistData', jsonData)
  }
}


