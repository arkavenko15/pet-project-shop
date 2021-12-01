import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { CartService } from '../cart/cart.service';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class CheckoutGuardService implements CanActivate {
  public items: Product[];
  constructor(private cartService: CartService, public router: Router) {}

  public canActivate(): Observable<boolean> {
    return this.cartService.cartItems.pipe(
      first(),
      map((products: Product[]) => {
        if(!!!products.length)alert("Please, add products to cart!")
        return !!products.length;
      })
    );
  }
}
