import { CheckoutInfo } from './checkout-info.model';
import { CheckoutDialogComponent } from './checkout-dialog/checkout-dialog.component';
import { CartService } from 'src/app/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../products/models/product.model';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CheckoutService } from './checkout.service';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMMM YYYY',
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
  checkoutItems: Product[];
  dateInvalide: boolean = false;
  cardNumberInvalide: boolean = false;
  total: number = 0;
  dialogData: any;
  orderForm: FormGroup;
  formInfo: CheckoutInfo;
  constructor(private cartService: CartService, public dialog: MatDialog, private checkoutService: CheckoutService) { }

  public ngOnInit(): void {
    this.cartService.cartItems.subscribe((products: Product[]) => {
      this.getCheckoutProducts(products);
    })
    this.checkoutService.checkoutInfo.subscribe((checkoutInfo: CheckoutInfo) => {
      this.formInfo = checkoutInfo;
    })

    this.initForm();
    this.orderForm.controls['date'].setValue(this.formInfo.date)
  }

  public initForm(): void {
    this.orderForm = new FormGroup({
      email: new FormControl(this.formInfo.email, { updateOn: 'change' }),
      firstName: new FormControl(this.formInfo.firstName, { updateOn: 'change' }),
      lastName: new FormControl(this.formInfo.lastName, { updateOn: 'change' }),
      city: new FormControl(this.formInfo.city, { updateOn: 'change' }),
      state: new FormControl(this.formInfo.state, { updateOn: 'change' }),
      zip: new FormControl(this.formInfo.zip, { updateOn: 'change' }),
      cardNumber: new FormControl(this.formInfo.cardNumber, { updateOn: 'change' }),
      date: new FormControl(moment()),
      CCV: new FormControl(this.formInfo.CCV, { updateOn: 'change' }),

    })

    this.orderForm.valueChanges.subscribe((orderForm) => {

      this.checkoutService.setStorageCheckoutInfo(orderForm)

    })

    this.orderForm.get('email').setValidators(Validators.required);
    this.orderForm.get('firstName').setValidators(Validators.required);
    this.orderForm.get('lastName').setValidators(Validators.required);
    this.orderForm.get('city').setValidators(Validators.required);
    this.orderForm.get('state').setValidators(Validators.required);
    this.orderForm.get('zip').setValidators(Validators.required);
    this.orderForm.get('cardNumber').setValidators(Validators.required);
    this.orderForm.get('date').setValidators(Validators.required);
    this.orderForm.get('CCV').setValidators(Validators.required);



    this.orderForm.controls['city'].valueChanges.subscribe(res => {
      if (res === "lviv") {
        this.orderForm.controls['zip'].setValue('79007');
      }
    });

    // this.orderForm.controls['cardNumber'].valueChanges.subscribe(cardNumber => {
    //   if (cardNumber.length < 16) {
    //     this.cardNumberInvalide = true;
    //   } else if (!(/^\d+$/.test(cardNumber))) {
    //     this.cardNumberInvalide = true;
    //   }
    //   else {
    //     this.cardNumberInvalide = false;
    //   }
    // })
    this.orderForm.controls['date'].valueChanges.subscribe(date => {

      // date = date.format('MM/YYYY')
      // console.log(date);


      // date = date.split('/')
      // if (+date[1] < 2021) {
      //   this.dateInvalide = true;
      // } else {
      //   this.dateInvalide = false;
      // }

    });

  }

  public getCheckoutProducts(products: Product[]): void {
    this.checkoutItems = products;
    this.total = 0;
    this.checkoutItems.forEach((item: { qty: number; price: number; }) => {
      this.total += (item.qty * item.price)
    })
  }

  public onSubmit(): void {
    let orderInfo: CheckoutInfo = Object.assign({}, this.orderForm.value)

    this.checkoutService.setStorageCheckoutInfo(orderInfo);
    this.dialogData = { orderInfo: orderInfo, checkoutItems: this.checkoutItems };
    this.openDialog()
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CheckoutDialogComponent, { data: this.dialogData });
    dialogRef.afterClosed().subscribe(result => {
      // this.orderForm.reset();
      return result
    });
  }

  public chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.orderForm.controls['date'].value;
    ctrlValue.year(normalizedYear.year());
    this.orderForm.controls['date'].setValue(ctrlValue);

  }

  public chosenMonthHandler(datepicker: MatDatepicker<Moment>, normalizedMonth: Moment): void {

    const ctrlValue = this.orderForm.controls['date'].value;
    ctrlValue.month(normalizedMonth.month());
    this.orderForm.controls['date'].setValue(ctrlValue);
    datepicker.close();

  }

}



