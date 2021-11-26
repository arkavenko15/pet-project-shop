import { WishlistService } from './../../wishlist/wishlist.service';
import { Color } from './../models/color.model';
import { Product } from './../models/product.model';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],

})
export class ProductItemComponent implements OnInit {
  public products: any[];
  public productCount: number = 1;
  public productColor: string;
  public warningToSetColor: boolean = false;
  @Input()
  product: Product;

  constructor(private cartService: CartService, private wishlistService: WishlistService) {
    this.products = [];
  }
  public ngOnInit() {

  }

  public setSelectedColor(hex_color: string): void {
    this.productColor = hex_color;
    this.product.product_colors.map((c: Color) => c.selected = c.hex_value === hex_color);
    this.warningToSetColor = false;
  }


  public checkIsColorSet(): void {
    if (this.productColor == undefined) {
      this.warningToSetColor = true;
    }
    else {
      this.handleAddToCart();
      const cartBtn = document.getElementById('cartBtn');
      cartBtn.click();
    }
  }


  public handleAddToCart() {
    this.product.qty = this.productCount;
    this.product.product_color = this.productColor;
    this.cartService.setCartItems(Object.assign({}, this.product), true)
    console.log(this.product);

  }
  public handleAddToWishlist(): void {
    this.wishlistService.setWishlistItems(Object.assign({}, this.product))
  }
  public handleRemoveFromWishlist(): void {
    this.wishlistService.removeWishlistItem(Object.assign({}, this.product))
  }
  public onImgError(event: any) {
    event.target.src = 'assets/no-image.png'
  }

  public setProductLiked() {
    this.product.isLiked = !this.product.isLiked;
    if (this.product.isLiked) {
      this.handleAddToWishlist();
    }
    else {
      this.handleRemoveFromWishlist();
    }
  }
  public onDecrementClick() {
    return this.productCount -= 1;
  }
  public onIncrementClick() {
    return this.productCount += 1;
  }

  public decrementDisabled() {
    if (this.productCount <= 1) {
      return true
    }
    return false
  }
  public incrementDisabled() {
    if (this.productCount >= 10) {
      return true
    }
    return false
  }

}
