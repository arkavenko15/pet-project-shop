import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from './cart.service';
import {Product} from '../products/models/product.model'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input()
  drawer:any;
  cartItems:any = [];
  cartTotal = 0;
  @Output()
  totalQtyOutput: EventEmitter<number> = new EventEmitter<number>();
  totalQty: number;
  myInfo$ = this.cartService.cartData$
  constructor(private cartService: CartService) { }
  ngOnInit() {
    this.cartService.cartItems.subscribe((products: Product[]) => {
      this.addProductToCart(products)
      this.cartService.loadInfo()
    })

    this.cartService.totalItemsQty.subscribe((qty: number) => {
      this.updateItemsQty(qty);
    })
  }
  addProductToCart(products: Product[]) {
    this.cartService.setInfo(products)
    this.cartItems = products;
    this.cartTotal = 0
    this.cartItems.forEach((item: { qty: number; price: number; }) => {
      this.cartTotal += (item.qty * item.price)
    })
  }

  updateItemsQty(qty: number): void {
    this.totalQty = qty;
    this.totalQtyOutput.emit(qty);
  }


}
