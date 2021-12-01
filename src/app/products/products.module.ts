import { SharedModule } from './../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './product-routing.module';
import { ProductsService } from './products.service';
import { FilterComponent } from './filter/filter.component';
import { MatInputModule } from '@angular/material/input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    FilterComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FlexLayoutModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,

    //custom
    SharedModule
  ],
  providers: [
    ProductsService,

  ]
})
export class ProductsModule { }
