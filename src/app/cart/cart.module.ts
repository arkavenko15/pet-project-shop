import { CartItemComponent } from './cart-item/cart-item.component';
import { CartComponent } from './cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent
  ],
  exports: [CartComponent],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  // providers: [CartService]
})
export class CartModule { }
