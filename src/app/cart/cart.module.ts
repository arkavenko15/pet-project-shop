import { CartItemComponent } from './cart-item/cart-item.component';
import { CartComponent } from './cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CartDialogComponent } from './cart-item/cart-dialog/cart-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent,
    CartDialogComponent
  ],
  exports: [CartComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule
  ],

})
export class CartModule { }
