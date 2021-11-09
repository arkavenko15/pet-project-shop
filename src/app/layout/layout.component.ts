import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader/loader.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  showFiller = false;
  public qty: number = 0;

  constructor(public loaderService:LoaderService) { }
  ngOnInit(): void {
  }

  setTotalCartItemsQty(qty: number): void {
    this.qty = qty || 0;
  }
}
