import { CartService } from 'src/app/cart/cart.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Product } from '../products/models/product.model';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CheckoutComponent implements OnInit {
  checkoutItems: any[];
  dateInvalide: boolean = false;
  cardNumberInvalide: boolean = false;
  total = 0;
  dialogData: any;
  orderForm: FormGroup;
  constructor(private cartService: CartService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm();

    this.cartService.cartItems.subscribe((products: Product[]) => {
      this.getCheckoutProducts(products)
    })

  }

  initForm(): void {
    this.orderForm = new FormGroup({
      email: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      city: new FormControl(null, {
        updateOn: 'change'
      }),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      cardNumber: new FormControl('', Validators.required),
      date: new FormControl(moment()),
      cardCcv: new FormControl('', Validators.required),

    })
    this.orderForm.get('email').setValidators(Validators.email);
    this.orderForm.controls['city'].valueChanges.subscribe(res => {
      if (res === "lviv") {
        this.orderForm.controls['zip'].setValue('79007');
      } else {
        this.orderForm.controls['zip'].setValue('');
      }
    });
    this.orderForm.controls['cardNumber'].valueChanges.subscribe(res=>{
      if(res.length<16){
        this.cardNumberInvalide=true;
      }else if(!(/^\d+$/.test(res))){
        this.cardNumberInvalide=true;
      }
      else{
        this.cardNumberInvalide=false;
      }
    })
    this.orderForm.controls['date'].valueChanges.subscribe(res => {
      console.log('selectedDate', res);
      res = res.format('MM/YYYY')
      res = res.split('/')
      if(+res[1]<2021){
        this.dateInvalide=true;
        console.log('form invalid');
      }else{
        this.dateInvalide = false;
      }
    });

  }

  getCheckoutProducts(products: Product[]) {
    this.checkoutItems = products;
    this.total = 0;
    this.checkoutItems.forEach((item: { qty: number; price: number; }) => {
      this.total += (item.qty * item.price)
    })
  }

  onSubmit() {
    let orderInfo: any = Object.assign({}, this.orderForm.value)
    orderInfo.date = orderInfo.date.format('MM/YYYY');
    this.dialogData = { orderInfo: orderInfo, checkoutItems: this.checkoutItems };
    this.orderForm.reset();
    this.openDialog()

  }
  openDialog() {
    const dialogRef = this.dialog.open(CheckoutDialog, { data: this.dialogData });
    dialogRef.afterClosed().subscribe(result => {
      return result
    });
  }

}


@Component({
  selector: 'checkout-dialog',
  templateUrl: 'checkout-dialog.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutDialog {
  constructor(
    public dialogRef: MatDialogRef<CheckoutDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
