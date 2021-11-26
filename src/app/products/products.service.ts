import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageRefService } from '../local-storage.service';
import { Product } from './models/product.model';

@Injectable()
export class ProductsService {
  private _localStorage: Storage = this._localStorageRefService.localStorage;
  constructor(private httpClientService: HttpClient, private _localStorageRefService: LocalStorageRefService) { }
  public getProducts(query: any): Observable<any> {
    const whishlist: Product[] = JSON.parse(this._localStorage.getItem('wishlistData'))
    console.log(whishlist);

    query.pageSize = query.pageSize || '10';
    query.pageIndex = query.pageIndex || '0';
    return this.httpClientService.get<any>(`http://makeup-api.herokuapp.com/api/v1/products.json`, { params: query }).pipe(
      map((res: Product[]) => {
        res.map((product) => {
          product.isLiked = !!whishlist?.find(wishlistItem => wishlistItem.id == product.id)
        })
        // res = res.filter(x => x.name.toLowerCase().includes('clean'))
        let products: Product[] = res.slice(+query.pageIndex * +query.pageSize, (+query.pageIndex) * +query.pageSize + +query.pageSize)
        return { products: products, length: res?.length || 0 };
      })
    );

  }
  public getProduct(productId: number): Observable<Product> {
    return this.httpClientService.get<any>(`http://makeup-api.herokuapp.com/api/v1/products.json?product_category=powder&id=${productId}`).pipe(
      map((res: Product[]) => {
        return res.find(x => x.id === productId) as Product;
      })
    );
  }


}
