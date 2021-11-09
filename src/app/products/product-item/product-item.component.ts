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
  @Input()
  product: Product;
  constructor(private msg: CartService) {
    this.products = [];
  }
  ngOnInit() {

  }
  handleAddToCart() {
    this.product.qty =3;
    this.msg.setCartItems(this.product)

  }
  onImgError(event: any) {
    event.target.src = 'assets/no-image.png'
  }
  liked: boolean = false;
  toggle() {
    this.liked = !this.liked;
  }
}
