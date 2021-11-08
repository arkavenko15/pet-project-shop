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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoPageComponent } from './no-page/no-page.component';
@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductItemComponent,
    FilterComponent,
    PaginatorComponent,
    NoPageComponent,

  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FlexLayoutModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
