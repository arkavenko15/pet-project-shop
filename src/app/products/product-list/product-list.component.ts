import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private readonly productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts(0).subscribe((result:any)=>{
      console.log(result)
    })
  }

}
