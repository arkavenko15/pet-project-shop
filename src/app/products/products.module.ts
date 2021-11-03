import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './product-routing.module';
import { ProductsService } from './products.service';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
