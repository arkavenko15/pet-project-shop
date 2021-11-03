import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[];
  constructor(private readonly productsService: ProductsService) {
    this.products = [];
  }
  ngOnInit(){
    this.productsService.getProducts(0).subscribe((products: ProductsService[])=>{
      console.log(products)
      this.products = products;
    })
  }

}
