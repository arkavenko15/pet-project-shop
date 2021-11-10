import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutItemComponent } from './checkout-item/checkout-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutItemComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class CheckoutModule { }
