import { CheckoutInfo } from './checkout-info.model';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageRefService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private _localStorage: Storage = this._localStorageRefService.localStorage;
  private _checkoutInfo: Subject<CheckoutInfo> = new Subject;
  public checkoutInfo: Observable<CheckoutInfo> = this._checkoutInfo.asObservable();
  constructor(private _localStorageRefService: LocalStorageRefService) { }

  public setStorageCheckoutInfo(info: CheckoutInfo): void {
    const jsonData = JSON.stringify(info);
    this._localStorage.setItem('checkoutInfo', jsonData)
  }

  public getStorageCheckoutInfo() :CheckoutInfo{
    const jsonData = JSON.parse(this._localStorage.getItem('checkoutInfo'));
    console.log(jsonData);
    this._checkoutInfo.next(jsonData)
    return jsonData
  }


}
