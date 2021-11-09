import { Product } from './../models/product.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { ProductsQuery } from '../models/product-query.model';

import { ProductsService } from './../products.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {

  private id: number = 0;
  product: Product;
  productsQuery: ProductsQuery = {};
  constructor(private activatedRoute: ActivatedRoute,private readonly productsService: ProductsService,private msg: CartService) {
  }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.params['id'];
    console.log(this.id)
    this.showProduct(this.id)
  }
  handleAddToCart() {
    this.msg.setCartItems(this.product)

  }
  showProduct(id:number){
    this.productsService.getProduct(id).subscribe((product: any) => {
      this.product = product;
    })

 }
}
