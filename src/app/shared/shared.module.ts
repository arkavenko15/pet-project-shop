import { ProductItemComponent } from './product-item/product-item.component';
import { NgModule } from "@angular/core";
import { FormatPricePipe } from 'src/app/shared/format-price.pipe';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from '../products/product-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations:[
    ProductItemComponent,
    FormatPricePipe,
  ],
  imports:[

    MatIconModule,
    CommonModule,
    ProductsRoutingModule,
    FlexLayoutModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ProductItemComponent
  ]

})
export class SharedModule {}
