import { CartResolver } from './cart/cart.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  {
    path: '', component: LayoutComponent, resolve: {cart : CartResolver}, children: [
      { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
      { path: 'authentification', loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationModule) },
      { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },

    ]

  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
