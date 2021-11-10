import { CartService } from 'src/app/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../products/models/product.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutItems: any[];
  total = 0;


  orderForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.formBuilder.group({
      city: [''],
      state: [''],
      zip: ['']
    }),
    payment: this.formBuilder.group({
      cardNumber:[''],
      cardExp:[''],
      cardCcv:['']
    })

  });

  constructor(private cartService: CartService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.cartService.cartItems.subscribe((products: Product[]) => {
      this.getCheckoutProducts(products)
    })
  }

  getCheckoutProducts(products: Product[]) {
    this.checkoutItems = products;
    this.total = 0;
    this.checkoutItems.forEach((item: { qty: number; price: number; }) => {
      this.total += (item.qty * item.price)
    })
  }

  onSubmit() {
    console.log(this.orderForm.value);
    this.orderForm.reset();
  }
}


