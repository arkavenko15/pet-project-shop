import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from './cart.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() drawer: any;
  @Output() public totalQtyOutput: EventEmitter<number> = new EventEmitter<number>();

  public cartItems: Product[] = [];
  public cartTotal = 0;
  public totalQty: number;
  public storageData$: Product[] = [];

  constructor(private cartService: CartService, private route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.data.pipe(first()).subscribe((data) => {
      this.addProductToCart(data.cart)

    })
    this.cartService.cartItems.subscribe((products: Product[]) => {
      this.addProductToCart(products)
    })

    this.cartService.totalItemsQty.subscribe((qty: number) => {
      this.updateItemsQty(qty);
    })
  }

  public addProductToCart(products: Product[]): void {
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

  public updateItemsQty(qty: number): void {
    this.totalQty = qty;
    this.totalQtyOutput.emit(qty);
  }

}
