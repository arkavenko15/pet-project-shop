import { CheckoutInfo } from './checkout-info.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageRefService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private _localStorage: Storage = this._localStorageRefService.localStorage;
  private _checkoutInfo: BehaviorSubject<CheckoutInfo> = new BehaviorSubject<CheckoutInfo>(JSON.parse(this._localStorage.getItem('checkoutInfo')) || {});
  public checkoutInfo: Observable<CheckoutInfo> = this._checkoutInfo.asObservable();
  constructor(private _localStorageRefService: LocalStorageRefService) { }

  public setStorageCheckoutInfo(info: CheckoutInfo): void {

    const jsonData = JSON.stringify(info);
    this._localStorage.setItem('checkoutInfo', jsonData)
    this._checkoutInfo.next(info)
  }


}
