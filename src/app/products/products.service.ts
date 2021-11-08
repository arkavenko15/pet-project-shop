import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductsService {
  constructor(private httpClientService: HttpClient) { }
  public getProducts(query: any): Observable<any> {
    query.pageSize = query.pageSize || '10';
    query.pageIndex = query.pageIndex || '0';
    console.log('FinalQuery', query);

    return this.httpClientService.get<any>(`http://makeup-api.herokuapp.com/api/v1/products.json`, { params: query }).pipe(
      map((res: any[]) => {
        // res = res.filter(x => x.name.toLowerCase().includes('clean'))
        let products = res.slice(+query.pageIndex * +query.pageSize, (+query.pageIndex) * +query.pageSize + +query.pageSize)

        return {products: products, length: res?.length || 0};
      })
    );

  }
}
