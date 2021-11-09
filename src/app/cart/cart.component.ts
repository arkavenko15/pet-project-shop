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
  constructor(private cartService: CartService) { }
  ngOnInit() {
    this.cartService.cartItems.subscribe((products: Product[]) => {
      this.addProductToCart(products)
    })

    this.cartService.totalItemsQty.subscribe((qty: number) => {
      this.updateItemsQty(qty);
    })
  }
  addProductToCart(products: Product[]) {

    console.log('cartItems', products);

    this.cartItems = products;

    // let productExists = false;
    // for (let i in this.cartItems) {
    //   if (this.cartItems[i].id === product.id) {
    //     this.cartItems[i].qty++
    //     productExists = true
    //     break;
    //   }
    // }
    // if (!productExists) {
    //   this.cartItems.push({
    //     id: product.id,
    //     productName: product.name,
    //     qty: 1,
    //     price: product.price
    //   })
    // }
    debugger
    this.cartTotal = 0
    this.cartItems.forEach((item: { qty: number; price: number; }) => {
      this.cartTotal += (item.qty * item.price)
    })
  }

  updateItemsQty(qty: number): void {
    debugger
    this.totalQty = qty;
    this.totalQtyOutput.emit(qty);
  }


}
