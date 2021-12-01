import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Color } from 'src/app/models/color.model';
import { Product } from 'src/app/models/product.model';
import { WishlistService } from 'src/app/wishlist/wishlist.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  public products: Product[];
  public productCount: number = 1;
  public productColor: string;
  public warningToSetColor: boolean = false;

  @Input() product: Product;
  @Input() isProductlistItem: boolean;
  @Input() isWishlistItem: boolean;
  @Input() isProductDetailsItem: boolean;
  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {
    this.products = [];
  }
  public ngOnInit() {}

  public setSelectedColor(hex_color: string): void {
    this.productColor = hex_color;
    this.product.product_colors.map(
      (c: Color) => (c.selected = c.hex_value === hex_color)
    );
    this.warningToSetColor = false;
  }

  public addToCart(): void {
    this.checkIsColorSet();
  }

  public checkIsColorSet(): void {
    if (this.productColor == undefined) {
      this.warningToSetColor = true;
    } else {
      this.handleAddToCart();
      const cartBtn = document.getElementById('cartBtn');
      cartBtn.click();
    }
  }
  public handleAddToCart(): void {
    this.product.qty = this.productCount;
    this.product.product_color = this.productColor;
    this.cartService.setCartItems(Object.assign({}, this.product), true);
  }
  public handleAddToWishlist(): void {
    this.wishlistService.setWishlistItems(Object.assign({}, this.product));
  }
  public handleRemoveFromWishlist(): void {
    this.wishlistService.removeWishlistItem(Object.assign({}, this.product));
  }
  public onImgError(event: any): void {
    event.target.src = 'assets/no-image.png';
  }

  public setProductLiked(): void {
    this.product.isLiked = !this.product.isLiked;
    if (this.product.isLiked) {
      this.handleAddToWishlist();
    } else {
      this.handleRemoveFromWishlist();
    }
  }
  public decrementClick() {
    this.productCount -= 1;
  }
  public incrementClick() {
    this.productCount += 1;
  }

}
