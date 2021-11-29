import { CartResolver } from './cart/cart.resolver';
import { CheckoutModule } from "./checkout/checkout.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorService } from './layout/loader/interceptor.service';
import { CartModule } from './cart/cart.module';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthentificationModule } from './authentification/authentification.module';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WishlistItemComponent } from './wishlist/wishlist-item/wishlist-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    WishlistComponent,
    WishlistItemComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatSelectModule,
    MatPaginatorModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatProgressBarModule,
    MatDialogModule,
    //custom
    AppRoutingModule,
    CartModule,
    CheckoutModule,
    AuthentificationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true},
    CartResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
