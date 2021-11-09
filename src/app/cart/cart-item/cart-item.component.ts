import { Product } from './../../products/models/product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: Product
  constructor() { }

  ngOnInit(): void {
    console.log('this.cartItem', this.cartItem)
  }

}
