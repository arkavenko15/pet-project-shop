import { ProductsService } from '../products.service';
import { Component, Input, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  products: any[];
  @Input()
  product: any;
  constructor(private readonly productsService: ProductsService) {
    this.products = [];
  }
  ngOnInit(){

  }
}
