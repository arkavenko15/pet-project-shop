import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of, Observable } from 'rxjs';
import { CheckoutInfo } from './checkout-info.model';
import { CheckoutService } from './checkout.service';

@Injectable()
export class CheckoutResolver implements Resolve<CheckoutInfo> {
  constructor(private readonly checkoutService: CheckoutService) {
  }
  public resolve(): Observable<CheckoutInfo> {
    return of(this.checkoutService.getStorageCheckoutInfo());
  }
}
