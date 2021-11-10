import { Product } from './../models/product.model';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],

})
export class ProductItemComponent implements OnInit {
  products: any[];
  productCount:number=1;
  @Input()
  product: Product;
  constructor(private msg: CartService) {
    this.products = [];
  }
  ngOnInit() {

  }
  handleAddToCart() {
    this.product.qty =this.productCount;
    this.msg.setCartItems(Object.assign({},this.product),true)

  }
  onImgError(event: any) {
    event.target.src = 'assets/no-image.png'
  }
  liked: boolean = false;
  toggle() {
    this.liked = !this.liked;
  }
  onDecrementClick(){
    return this.productCount-=1;
  }
  onIncrementClick(){
    return this.productCount+=1;
  }
  ///////////////////////////
  decrementDisabled(){
    if(this.productCount<=1){
      return true
    }
    return false
  }
  incrementDisabled(){
    if(this.productCount>=10){
      return true
    }
    return false
  }
}
