import { ProductsQuery } from './../models/product-query.model';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private readonly productsService: ProductsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.products = [];
  }

  ngOnInit() {

  }

  showSelectedQuery(query: ProductsQuery): void {
    console.log(query)
    this.productsService.getProducts(query).subscribe((products: ProductsService[]) => {
      console.log(products);
      
      this.products = products;
    })

  }

}
