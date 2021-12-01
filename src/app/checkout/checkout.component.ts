import { CheckoutInfo } from './checkout-info.model';
import { CheckoutDialogComponent } from './checkout-dialog/checkout-dialog.component';
import { CartService } from 'src/app/cart/cart.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from '../models/product.model';
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
  encapsulation: ViewEncapsulation.None
})

export class CheckoutComponent implements OnInit {
  public checkoutItems: Product[];
  public dateInvalide: boolean = false;
  public cardNumberInvalide: boolean = false;
  public total: number = 0;
  public dialogData: any;
  public orderForm: FormGroup;
  public formInfo: CheckoutInfo;
  public selectedFile: File;
  public selectedFiles:File[] = [];
  public selectedFileName :string;
  public tabIndex: number = 0;

  public uploadImageUrls: any[] = [];

  public uploadImageUrl: any;

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


  public selectFile(event: any):void {
    console.log(event.target.files);

    this.selectedFiles = this.selectedFiles.concat(event.target.files[0])


    this.selectedFiles.map((item)=>{
      const reader = new FileReader();
      reader.readAsDataURL(item);
      reader.onload = (_event) => {
        console.log(reader.result);
        //this.uploadImageUrls.length = 0;
        this.uploadImageUrls.push(reader.result)
        this.uploadImageUrl = reader.result;
      }
    })

    // this.selectedFile = event.target.files[0]
    // this.selectedFileName = this.selectedFile.name;
    // const reader = new FileReader();
    // reader.readAsDataURL(this.selectedFile);
    // reader.onload = (_event) => {
    //     this.uploadImageUrl = reader.result;
    // }

  }

  public proceedToPayment():void {
    const tabCount = 2;
    this.tabIndex = (this.tabIndex + 1) % tabCount;
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
      if (cardNumber?.length !== 16) {
        this.cardNumberInvalide = true;
      } else {
        this.cardNumberInvalide = false;
      }

    })
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
      return result
    });
  }

  public chosenYearHandler(normalizedYear: Moment): void {
    this.orderForm.controls['date'].setValue(new Date((new Date()).setFullYear(normalizedYear.year())));
  }

  public chosenMonthHandler(datepicker: MatDatepicker<Moment>, normalizedMonth: Moment): void {
    const ctrlValue = this.orderForm.controls['date'].value;
    this.orderForm.controls['date'].setValue(new Date(ctrlValue.setMonth(normalizedMonth.month())));
    datepicker.close();
  }

}



