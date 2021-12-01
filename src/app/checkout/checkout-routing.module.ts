import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CheckoutResolver } from './checkout.resolver';
import {
  CheckoutGuardService as CheckoutGuard
} from './checkout-guard.service';

const routes: Routes = [
  {
    path: '', component: CheckoutComponent,
    resolve: { checkout: CheckoutResolver },
    canActivate: [CheckoutGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class CheckoutRoutingModule { }
