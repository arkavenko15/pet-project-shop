import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { Color } from 'src/app/products/models/color.model';
import { Product } from 'src/app/products/models/product.model';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss']
})
export class WishlistItemComponent implements OnInit {
  @Input() wishlistItem: Product;
  public productCount: number = 1;
  public warningToSetColor: boolean = false;
  public productColor: string;



  constructor(private cartService: CartService, private wishlistService: WishlistService) { }

  ngOnInit(): void {
  }

  public onImgError(event: any): void {
    event.target.src = 'assets/no-image.png'
  }

  public setSelectedColor(hex_color: string): void {
    this.productColor = hex_color;
    this.wishlistItem.product_colors.map((c: Color) => c.selected = c.hex_value === hex_color);
    this.warningToSetColor = false;

  }
  public removeFromWishlist(wishlistItem: Product): void {
    wishlistItem.isLiked = false;
    this.wishlistService.removeWishlistItem(wishlistItem)
  }
  public onDecrementClick() {
    return this.productCount -= 1;
  }
  public onIncrementClick() {
    return this.productCount += 1;
  }

  public handleAddToCart():void {
    this.wishlistItem.qty = this.productCount;
    this.wishlistItem.product_color = this.productColor;
    this.cartService.setCartItems(Object.assign({}, this.wishlistItem), true)
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

  public decrementDisabled() {
    if (this.productCount <= 1) {
      return true
    } return false
  }

  public incrementDisabled() {
    if (this.productCount >= 10) {
      return true
    } return false
  }

  public setProductLiked():void {
    this.wishlistItem.isLiked = !this.wishlistItem.isLiked;
  }

}
