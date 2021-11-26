export class CheckoutInfo {
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  date: any;
  CCV: number;
  constructor(options: any = {}) {
    this.email = options.email;
    this.firstName = options.firstName;
    this.lastName = options.lastName;
    this.city = options.city;
    this.state = options.state;
    this.zip = options.zip;
    this.cardNumber = options.cardNumber;
    this.date = options.date;
    this.CCV = options.CCV;
  }
}


