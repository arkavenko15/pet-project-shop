import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './product-routing.module';
import { ProductsService } from './products.service';
import { ProductItemComponent } from './product-item/product-item.component';
import { FilterComponent } from './filter/filter.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductItemComponent,
    FilterComponent,

  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FlexLayoutModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
