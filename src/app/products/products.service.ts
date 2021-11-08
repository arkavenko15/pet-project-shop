import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsQuery } from './models/product-query.model';

@Injectable()
export class ProductsService {
  constructor(private httpClientService: HttpClient) { }
  public getProducts(query: any): Observable<any> {

    
    // return this.httpClientService.get<any>(`http://makeup-api.herokuapp.com/api/v1/products.json?product_category=${query.product_category}`);
    return this.httpClientService.get<any>(`http://makeup-api.herokuapp.com/api/v1/products.json`, {params: query});

  }
}
