import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {
  public loginForm: FormGroup;

  public email = '';
  public password = '';
  public matcher = new ErrorStateMatcher();
  public isLoadingResults = false;



  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]

    });
  }

  public onFormSubmit(form: NgForm) {


  }

  public register() {

    this.router.navigate(['register']);

  }


}
