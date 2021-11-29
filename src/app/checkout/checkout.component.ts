import { CheckoutInfo } from './checkout-info.model';
import { CheckoutDialogComponent } from './checkout-dialog/checkout-dialog.component';
import { CartService } from 'src/app/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../products/models/product.model';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CheckoutService } from './checkout.service';
import { forbiddenFirstNameValidator, forbiddenLastNameValidator } from './custom-validation.directive';
import { first} from 'rxjs/operators';
import { ActivatedRoute} from '@angular/router';
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
  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
    private checkoutService: CheckoutService,
    private readonly route: ActivatedRoute,

  ) {

  }



  public ngOnInit(): void {
    this.cartService.cartItems.subscribe((products: Product[]) => {
      this.getCheckoutProducts(products);
    })
    this.initForm();
    this.route.data.pipe(first()).subscribe((data) => {
      this.populateForm(data.checkout)
    })
    this.checkoutService.getStorageCheckoutInfo();
  }

  public populateForm(info: CheckoutInfo): void {
    this.orderForm.controls['email'].setValue(info.email)
    this.orderForm.controls['firstName'].setValue(info.firstName)
    this.orderForm.controls['lastName'].setValue(info.lastName)
    this.orderForm.controls['city'].setValue(info.city)
    this.orderForm.controls['state'].setValue(info.state)
    this.orderForm.controls['zip'].setValue(info.zip)
    this.orderForm.controls['cardNumber'].setValue(info.cardNumber)
    this.orderForm.controls['date'].setValue(info.date)
    this.orderForm.controls['CCV'].setValue(info.CCV)

  }

  public initForm(): void {
    this.orderForm = new FormGroup({
      email: new FormControl('', { updateOn: 'change' }),
      firstName: new FormControl('', { updateOn: 'change' }),
      lastName: new FormControl('', { updateOn: 'change' }),
      city: new FormControl('', { updateOn: 'change' }),
      state: new FormControl('', { updateOn: 'change' }),
      zip: new FormControl('', { updateOn: 'change' }),
      cardNumber: new FormControl('', { updateOn: 'change' }),
      date: new FormControl(moment(), { updateOn: 'change' }),
      CCV: new FormControl('', { updateOn: 'change' }),

    })

    this.orderForm.valueChanges.subscribe((orderForm) => {
      this.checkoutService.setStorageCheckoutInfo(orderForm)

    })

    this.orderForm.get('email').setValidators(Validators.required);
    this.orderForm.get('firstName').setValidators([Validators.required, forbiddenFirstNameValidator(/ryan/i)]);
    this.orderForm.get('lastName').setValidators([Validators.required, forbiddenLastNameValidator(/gosling/i)]);
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

    this.orderForm.controls['cardNumber'].valueChanges.subscribe(cardNumber => {
      if (cardNumber.length !== 16) {
        this.cardNumberInvalide = true;
      } else {
        this.cardNumberInvalide = false;
      }

    })
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

  public chosenYearHandler(normalizedYear: Moment): void {
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



