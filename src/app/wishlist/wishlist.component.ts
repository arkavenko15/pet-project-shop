import { WishlistService } from './wishlist.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from '../models/product.model';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WishlistComponent implements OnInit, OnDestroy {
  public wishlistItems: any[];
  public isWishlistItem: boolean = true;
  private _destroy$ = new Subject;
  constructor(private readonly wishlistService: WishlistService) { }

  public ngOnInit(): void {
    this.wishlistService.wishlistItems.pipe(takeUntil(this._destroy$)).subscribe((products: Product[]) => {
      this.wishlistItems = products;
    })
  }

  public ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }
}
