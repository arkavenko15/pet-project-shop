import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

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
  @Output() selectedBrand = new EventEmitter();
  @Output() selectedCategory = new EventEmitter();
  @Output() selectedType = new EventEmitter();

  brands: Brand[] = [
    {value: 'almay', viewValue: 'Almay'},
    {value: 'alva', viewValue: 'Alva'},
    {value: 'covergirl', viewValue: 'CoverGirl'},
    {value: 'marcelle', viewValue: 'Marcelle'},
    {value: 'pure anada', viewValue: 'Pure Anada'},
  ];
  categories: Category[] = [
    {value: 'powder', viewValue: 'Powder'},
    {value: 'cream', viewValue: 'Cream'},
    {value: 'pencil', viewValue: 'Pencil'},
    {value: 'liquid', viewValue: 'Liquid'},
    {value: 'gel', viewValue: 'Gel'},
  ];
  types: Type[] = [
    {value: 'foundation', viewValue: 'Powder'},
    {value: 'blush', viewValue: 'Cream'},
    {value: 'bronzer', viewValue: 'Pencil'},
  ]
  brandControl = new FormControl();
  categoryControl = new FormControl();
  typeControl = new FormControl()
  constructor() {
    this.form = new FormGroup({
      brand: this.brandControl,
      category: this.categoryControl,
      type: this.typeControl
  }); }

  ngOnInit(): void {
    this.brandControl.valueChanges.subscribe(result=>{
      this.selectedBrand.emit(result);
      console.log(result)
    });
    this.categoryControl.valueChanges.subscribe(result=>{
      this.selectedCategory.emit(result);
      console.log(result)
    });
    this.typeControl.valueChanges.subscribe(result=>{
      this.selectedCategory.emit(result)
    })
  }
}
