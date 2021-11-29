import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Product } from '../products/models/product.model';
import { CartService } from './cart.service';


@Injectable()
export class CartResolver implements Resolve<Product[]> {
  constructor(private readonly cartService: CartService) {
  }
  public resolve(): Observable<Product[]> {
    return of(this.cartService.getCartItems());
  }
}
