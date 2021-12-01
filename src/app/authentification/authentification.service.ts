import { Router } from '@angular/router';
import { User } from './../models/user.model';
import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public userData: User;
  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedIn.asObservable();


  constructor(
    public firestore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
  ) {
    this.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn.next(true);
      } else {
        this.loggedIn.next(false);
      }
    });

  }

  public signIn(email:string, password: string): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      window.alert('You are succesfully signed up!')
      this.setUserData(result.user);
      this.router.navigate(['products'])

    })
    .catch((error) =>{
      window.alert(error)
    })
  }

  public signUp(email:string, password: string): Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {

        this.setUserData(result.user)
        window.alert('You are succesfully signed up!')
      })
      .catch((error)=>{
        window.alert(error);
      })
  }

  public signOut() {
    return this.fireAuth.signOut().then(() => {
      this.router.navigate(['products']);
    })
  }

  public setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {merge: true})
  }
}
