import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { ProductsQuery } from '../models/product-query.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[];
  productsQuery: ProductsQuery = {
    product_category: 'powder'
  };
  constructor(private readonly productsService: ProductsService) {
    this.products = [];
  }

  ngOnInit() {
    this.productsService.getProducts(this.productsQuery).subscribe((products: ProductsService[]) => {
      console.log(products)
      this.products = products;
    })
  }

  showSelectedBrand(brand: string): void {
    this.productsQuery.brand=brand;
    this.productsService.getProducts( this.productsQuery).subscribe((products: ProductsService[]) => {
      console.log(products)
      this.products = products;
    })
  }
  showSelectedCategory(category: string): void {
    this.productsQuery.product_category = category
    this.productsService.getProducts( this.productsQuery).subscribe((products: ProductsService[]) => {
      console.log(products)
      this.products = products;
    })
  }
  showSelectedType(type:string): void{
    this.productsQuery.product_type = type;
    this.productsService.getProducts(this.productsQuery).subscribe((products:ProductsService[])=>{
      this.products = products;
    })
  }

}
