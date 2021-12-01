import { Product } from '../../models/product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-item',
  templateUrl: './checkout-item.component.html',
  styleUrls: ['./checkout-item.component.scss']
})
export class CheckoutItemComponent implements OnInit {
  @Input() checkoutItem :Product;
  constructor() { }

  public ngOnInit(): void {
  }

}
