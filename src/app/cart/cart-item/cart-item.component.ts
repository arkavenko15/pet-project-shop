import { CartService } from 'src/app/cart/cart.service';
import { Product } from './../../products/models/product.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: Product;
  @Output()
  updatedQtyOutput: EventEmitter<number> = new EventEmitter<number>();

  constructor(private readonly cartService: CartService, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  decrementClick(): void {
    let item = Object.assign({}, this.cartItem)
    item.qty -= 1;
    if (item.qty == 0) {
      this.openDialog()
    } else
      this.cartService.setCartItems(item, false)
  }

  incrementClick(): void {
    let item = Object.assign({}, this.cartItem)
    item.qty += 1;
    this.cartService.setCartItems(item, false)
  }
  openDialog() {
    const dialogRef = this.dialog.open(CartDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.removeCartItem(this.cartItem)
      };
    });
  }
}
