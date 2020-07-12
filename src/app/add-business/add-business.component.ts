import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';

import { element } from 'protractor';
import { NgForm } from '@angular/forms';
import { type } from 'os';
import { stringify } from 'querystring';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Business } from 'src/Model/Business';
import { BusinessUsers } from 'src/Model/BusinessUsers';
import { BusinessService } from '../business.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {

  public userMy: BusinessUsers;
  public businessID: string;
  public myyy: Business;
  public href: string;
  public isActiveCus: number;



  constructor(private location: Location, public ser: BusinessService, public activated: ActivatedRoute, public router: Router) {

    this.myyy = new Business();
  }

  @ViewChildren('MyInputsDiv')
  div: QueryList<ElementRef>;

  ngOnInit() {


    this.userMy = JSON.parse(localStorage.getItem("CurrentUser"));



    this.myyy.businessOwnerID = this.userMy.userName;
    this.ser.GetMaxIDBusiness().subscribe(succ => {
      //לא קיים עסק עדייין

      this.myyy.businessID = succ;

    }, err => { alert("שגיאה בגישה למסד נתונים"); });
  }


  save() {

    if (this.myyy.businessPhoneNo == null) {
      alert("הקש מספר טלפון ")


    }


    else if (this.myyy.businessPhoneNo.length < 9 || this.myyy.businessPhoneNo.length > 10) {
      alert("מספר טלפון לא תקין")



    }

    else if (this.myyy.businessAddress == null) {
      alert("הקש כתובת")


    }

    else if (this.myyy.businessCity == null) {
      alert("הקש עיר ")


    }

    else if (this.myyy.businessName == null) {
      alert("הקש את שם העסק")


    }

    // if(this.myyy.noOfRegisters==null)
    else {
      this.businessID = '' + this.myyy.businessID;
      console.log("hh" + this.businessID)
      //Automat Id is not necessary
      // this.ser.GetIfBusinessExist(this.businessID).subscribe(succ => {
      //   //לא קיים כזה עסק עדייין
      //   if (succ != null) {
      //     // this.MyNewBusiness = null;
      //     console.log("Exists");
      //     alert
      //     { "exist business" }
      //   }
      //   else {

      this.ser.AddBusiness(this.myyy).subscribe(succ => {

        if (succ == null) {

          Swal.fire({
            icon: "warning",
            title: 'שגיאה',
            text: 'עסק זה קיים . בחר נתונים שונים',
          })
        }
        else {

          this.myyy = succ;
          Swal.fire(
            'Good job!',
            'עסק נוסף בהצלחה',
            'success'
          )
          this.location.back();
        }
      }, err => { alert("שגיאה בהוספת עסק"); });



      // }, err => { alert("something Wrong checking"); });
      // //this.router.navigate([""]);


    }

  }


  cancel() {
    // document.location.reload();
    this.location.back();
  }




  onkeyDownNumber(e) {

    if (e.keyCode == 8 || e.keyCode == 46) {
      if (e.preventDefault)
        e.preventDefault = false;
    }

    else if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105))
      e.preventDefault();
    else if (e.preventDefault)
      e.preventDefault = false;

  }
  onkeyDownLetters(e) {

    var flag = true;
    if (e.keyCode == 8 || e.keyCode == 46) {
     flag=true;
    }
    else if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105))
      flag = true;
    else if (e.preventDefault)
      flag = false;
    if (!flag)
      e.preventDefault();
    else if (e.preventDefault)
      e.preventDefault = false;

  }

}

