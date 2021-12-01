export class User {
  uid: string;
  email?: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  constructor(options: any = {}) {
    this.uid = options.uid;
    this.email = options.email;
    this.displayName = options.displayName;
    this.photoURL = options.photoURL;
    this.emailVerified = options.emailVerified;

  }
}



