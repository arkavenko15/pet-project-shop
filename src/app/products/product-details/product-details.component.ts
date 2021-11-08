import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsQuery } from '../models/product-query.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {
  @Output() selectedQuery:EventEmitter<ProductsQuery> = new EventEmitter();
  id: number;
  productsQuery: ProductsQuery = {
    
  };
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.id = activatedRoute.snapshot.params['id'];
    this.productsQuery.id=this.id;
    this.selectedQuery.emit(this.productsQuery)
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (queryParam: any) => {
        this.productsQuery.id = queryParam['id'] || '';
        console.log('QUERYPARAMS', queryParam);
        this.selectedQuery.emit(this.productsQuery)

      }

    );

  }

}
