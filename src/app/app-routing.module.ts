import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';

import { BusinessComponent } from './business/business.component';

import { CustomerComponent } from './customer/customer.component';
import { TimeLineComponent } from "./time-line/time-line.component";
import { TimeLineSingleComponent } from './time-line-single/time-line-single.component';
import { AddBusinessComponent } from './add-business/add-business.component';
import { ScannerComponent } from './scanner/scanner.component';
import { PrintCoderComponent } from './print-coder/print-coder.component';

const routes: Routes = [

  {path:'time line/:businessID',component:TimeLineComponent },
  {path:'sign in/:userPassword/:userName',component:SignInComponent},
  {path:'log in',component:LoginComponent},
  {path:'customer/:isActiveCus',component:CustomerComponent},
 {path:'time line single/:customerID',component:TimeLineSingleComponent},
  {path:'add business/:userName',component:AddBusinessComponent},
  {path:'print coder/:ima',component:PrintCoderComponent},
  {path:'scanner/:businessId',component:ScannerComponent},

  
  {path:'business',component:BusinessComponent},
  {path:"", redirectTo:"/app", pathMatch:"full"},
  {path:"**", component:NotFoundComponent, pathMatch:"full"},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]


})
export class AppRoutingModule { }





