import { AuthentificationService } from './authentification.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthentificationRoutingModule } from './authentification-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AuthentificationRoutingModule,
    FlexLayoutModule
  ],
  providers: [
    AuthentificationService
  ]
})
export class AuthentificationModule { }
