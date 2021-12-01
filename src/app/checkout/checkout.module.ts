import { CheckoutResolver } from './checkout.resolver';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';

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
import { CheckoutDialogComponent } from './checkout-dialog/checkout-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutItemComponent,
    CheckoutDialogComponent,
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
    MatDialogModule,
    MatTabsModule
  ],
  providers: [
    CheckoutResolver
  ]
})
export class CheckoutModule { }
