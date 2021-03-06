import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator/paginator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WishlistService } from './../../wishlist/wishlist.service';
import { ProductsQuery } from './../models/product-query.model';
import { Product } from './../models/product.model';
import { ProductsService } from './../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  productsQuery: ProductsQuery = {};
  productsLength: number = 0;

  private _destroy$ = new Subject;

  constructor(private readonly productsService: ProductsService, private readonly wishlistService: WishlistService) {
    this.products = [];
  }

  ngOnInit() {
    this.trackChanges();
  }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }

  getProducts(query: ProductsQuery): void {
    this.productsQuery = query;

    this.productsService.getProducts(this.productsQuery).subscribe((products: any) => {
      this.products = products.products.map((p: any) => new Product(p));
      this.productsLength = products.length;
    });
  }

  paginationChange(pageEvent: PageEvent): void {
    this.productsQuery.pageIndex = pageEvent.pageIndex + '';
    this.productsQuery.pageSize = pageEvent.pageSize.toString();
    this.getProducts(this.productsQuery)
  }

  private trackChanges(): void {
    this.wishlistService.changedItem.subscribe((item)=>{
      let product = this.products.find((i)=>i.id == item.id)
      product.isLiked = false;
    })
  }
}
