import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private httpClientService: HttpClient) { }

  public getProducts(query: any): Observable<any> {
    return this.httpClientService.get<any>('http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
  }
}
