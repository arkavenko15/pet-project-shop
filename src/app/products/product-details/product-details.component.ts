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
  productCount:number=1;
  constructor(private activatedRoute: ActivatedRoute,private readonly productsService: ProductsService,private msg: CartService) {
  }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.params['id'];
    this.showProduct(this.id)
  }
  public handleAddToCart(): void {
    this.product.qty =this.productCount;
    this.msg.setCartItems(Object.assign({},this.product),true)

  }
  public showProduct(id:number): void{
    this.productsService.getProduct(id).subscribe((product: any) => {
      this.product = product;
    })

 }
  public onDecrementClick(){
    return this.productCount-=1;
  }
  public onIncrementClick(){
    return this.productCount+=1;
  }
  public decrementDisabled(){
    if(this.productCount<=1){
      return true
    }
    return false
  }
  public incrementDisabled(){
    if(this.productCount>=10){
      return true
    }
    return false
  }
}
