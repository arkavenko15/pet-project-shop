import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { ProductsQuery } from '../models/product-query.model';
import { ActivatedRoute, Router } from '@angular/router';
interface Brand{
    value: string;
    viewValue: string;
}
interface Category{
  value: string;
  viewValue: string;
}
interface Type{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  form: FormGroup;

  @Output() selectedQuery:EventEmitter<ProductsQuery> = new EventEmitter();

  brands: Brand[] = [
    {value: '', viewValue: 'All'},
    {value: 'almay', viewValue: 'Almay'},
    {value: 'alva', viewValue: 'Alva'},
    {value: 'covergirl', viewValue: 'CoverGirl'},
    {value: 'marcelle', viewValue: 'Marcelle'},
    {value: 'pure anada', viewValue: 'Pure Anada'},
  ];
  categories: Category[] = [
    {value: '', viewValue: 'All'},
    {value: 'powder', viewValue: 'Powder'},
    {value: 'cream', viewValue: 'Cream'},
    {value: 'pencil', viewValue: 'Pencil'},
    {value: 'liquid', viewValue: 'Liquid'},
    {value: 'gel', viewValue: 'Gel'},
  ];
  types: Type[] = [
    {value: '', viewValue: 'All'},
    {value: 'foundation', viewValue: 'Foundation'},
    {value: 'blush', viewValue: 'Blush'},
    {value: 'bronzer', viewValue: 'Bronzer'},
  ]
  brandControl = new FormControl();
  categoryControl = new FormControl();
  typeControl = new FormControl()

  productsQuery: ProductsQuery = {
    product_category: 'powder'
  };
  defaultQuery : ProductsQuery = {
    product_category: 'powder'
  };
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      brand: this.brandControl,
      category: this.categoryControl,
      type: this.typeControl
  }); }
  resetFilter(){
    this.productsQuery =this.defaultQuery;
     this.selectedQuery.emit(this.productsQuery);
     this.brandControl.setValue('',{emitEvent:false})
     this.categoryControl.setValue('',{emitEvent:false})
     this.typeControl.setValue('',{emitEvent:false})

  }
  ngOnInit(): void {
    this.brandControl.valueChanges.subscribe(brand=>{
      this.productsQuery.brand =brand;
      this.refreshUrl(this.productsQuery)
    });
    this.categoryControl.valueChanges.subscribe(product_category=>{
      this.productsQuery.product_category =product_category;
      this.refreshUrl(this.productsQuery)
    });
    this.typeControl.valueChanges.subscribe(type=>{
      this.productsQuery.product_type =type;
      this.refreshUrl(this.productsQuery)
    })
    this.activatedRoute.queryParams.subscribe(
      (queryParam: any) => {
        this.productsQuery.brand = queryParam['brand'] || '';
        this.productsQuery.product_category = queryParam['product_category'] || this.productsQuery.product_category;
        this.productsQuery.product_type = queryParam['product_type'] || ''
        this.selectedQuery.emit(this.productsQuery)
        this.brandControl.setValue(this.productsQuery.brand,{emitEvent:false})
        this.categoryControl.setValue(this.productsQuery.product_category,{emitEvent:false})
        this.typeControl.setValue(this.productsQuery.product_type,{emitEvent:false})
      }

    );
  }
  refreshUrl(query: ProductsQuery) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {
          'product_category': query.product_category,
          'product_type': query.product_type,
          'brand': query.brand
        },
      }
    );
  }

}
