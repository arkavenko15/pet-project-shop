import { NoPageComponent } from './no-page/no-page.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: ProductListComponent },
      { path: ':id', component: ProductDetailsComponent },
      // { path: '**', component: NoPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
