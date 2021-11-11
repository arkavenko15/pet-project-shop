import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent, CheckoutDialog } from './checkout.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutItemComponent } from './checkout-item/checkout-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutItemComponent,
    CheckoutDialog
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class CheckoutModule { }
