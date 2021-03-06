import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { LoaderService } from './loader/loader.service';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  showFiller = false;
  public qty: number = 0;

  constructor(public loaderService:LoaderService, public dialog: MatDialog) { }
  ngOnInit(): void {
  }

  setTotalCartItemsQty(qty: number): void {
    this.qty = qty || 0;
  }



  public openDialog() {
    this.dialog.open(WishlistComponent);
  }

}
