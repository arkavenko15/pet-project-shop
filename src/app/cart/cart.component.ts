import { Product } from './../products/models/product.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input()
  drawer: any;
  cartItems: any = [];
  cartTotal = 0;
  @Output()
  totalQtyOutput: EventEmitter<number> = new EventEmitter<number>();
  totalQty: number;

  storageData$: any = [];

  constructor(private cartService: CartService) { }
  ngOnInit() {
    //load products to storage


    // this.storageData$ = this.cartService.loadStorageCartItems();
    //this.cartService.loadStorageCartItems();

    this.cartService.cartItems.subscribe((products: Product[]) => {
      this.addProductToCart(products)
    })

    this.cartService.totalItemsQty.subscribe((qty: number) => {
      this.updateItemsQty(qty);
    })
  }
  addProductToCart(products: Product[]) {
    this.cartItems = products;
    //set product to storage
    this.cartService.setStorageCartItems(
      this.cartItems
    )
    this.cartTotal = 0;
    this.cartItems.forEach((item: { qty: number; price: number; }) => {
      this.cartTotal += (item.qty * item.price)
    })
  }



  updateItemsQty(qty: number): void {
    this.totalQty = qty;
    this.totalQtyOutput.emit(qty);
  }

}
