import { AuthentificationService } from './../authentification.service';

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profileEmail: any;
  constructor(public authService: AuthentificationService,public fireAuth: AngularFireAuth) {
    this.fireAuth.authState.pipe(first()).subscribe((user)=>{
      this.profileEmail = user.email;
    })
   }

  ngOnInit(): void {

  }

}
