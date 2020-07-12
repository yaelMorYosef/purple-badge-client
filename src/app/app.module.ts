import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms'
import { SignInComponent } from './sign-in/sign-in.component';


import { NotFoundComponent } from './not-found/not-found.component';

import { BusinessComponent } from './business/business.component';
import { AddBusinessComponent } from './add-business/add-business.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { ScannerComponent } from './scanner/scanner.component';

import { TimeLineSingleComponent } from './time-line-single/time-line-single.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { PrintCoderComponent } from './print-coder/print-coder.component';







@NgModule({
  declarations: [
    AppComponent,
    BusinessComponent,
    LoginComponent,
    NotFoundComponent,
    CustomerComponent,
    SignInComponent,
    TimeLineComponent,
    TimeLineSingleComponent,
    AddBusinessComponent,
    ScannerComponent,
    PrintCoderComponent,

 
  
   

    // HttpClientModule

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



 
  






