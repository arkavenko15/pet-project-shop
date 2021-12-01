import { Product } from '../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsQuery } from '../../models/product-query.model';

import { ProductsService } from './../products.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  public id: number = 0;
  public product: Product;
  public productsQuery: ProductsQuery = {};

  public isProductDetailsItem: boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly productsService: ProductsService
  ) {}

  public ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.params['id'];
    this.showProduct(this.id);
  }

  public showProduct(id: number): void {
    this.productsService.getProduct(id).subscribe((product: Product) => {
      this.product = product;
    });
  }
}
