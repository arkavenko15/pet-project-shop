import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CheckoutResolver } from './checkout.resolver';

const routes: Routes = [
  {
    path: '', component: CheckoutComponent,
    resolve: { checkout: CheckoutResolver }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class CheckoutRoutingModule { }
