import { Component, OnInit } from '@angular/core';
import { BusinessUsers } from 'src/Model/BusinessUsers';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BusinessOwner } from 'src/Model/BusinessOwner';
import { BusinessUsersService } from '../business-users.service';
import { NgForOf } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;


  us: BusinessUsers;
  x: Array<BusinessUsers>;
  user: BusinessUsers;
  uu: BusinessUsers;
  tt: any;
  i: number;


  constructor(public active: ActivatedRoute, public router: Router, public businessUserser: BusinessUsersService) {
    this.us = new BusinessUsers();
    this.us.userPassword = '';
  }
  Check() {

    if (this.us.userPassword == '' && this.us.userName == null) {

      Swal.fire({
        icon: 'warning',
        title: 'אופס',
        text: 'שדות חובה לא מולאו',
      })

    }
    else if (this.us.userName == null && this.us.userPassword != '') {

      Swal.fire({
        icon: 'warning',
        title: 'אופס',
        text: 'ת.ז. משתמש הנו שדה חובה',
      })
    }
    // else if (this.us.userName.length != 9 || !(this.LegalTz(this.us.userName))) {
    //   alert("ת.ז. לא תקינה")
    //   this.us.userName = "";
    // }




    else if (this.us.userName != null && this.us.userPassword == '')
      Swal.fire({
        icon: 'warning',
        title: 'אופס',
        text: 'סיסמא הינו שדה חובה',
      })

    // else if (this.us.userPassword.length != 6) {
    //   alert("הקש סיסמא בעלת 6 תווים")
    // }

    else {
      this.businessUserser.GetBusinessUserById(this.us.userName).subscribe(succ => {
        if (succ != null) {
          this.user = succ;
          if (this.user.userPassword == this.us.userPassword) {
            Swal.fire(
              'success!',
              'התחברת בהצלחה',
              'success'
            )

            this.SaveLocal(this.user);
            this.router.navigate(["business"]);

          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'אופס',
              text: 'סיסמה שגויה',
            })

          }
        }
        else {

          Swal.fire({
            icon: 'warning',
            title: 'היי',
            text: 'ת.ז. משתמש לא מוכרת',
          })
          this.router.navigate(["sign in", this.us.userPassword,this.us.userName]);
          document.getElementById('signin').hidden = false;
        }

      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'שגיאה',
          text: 'שגיאה בהתחברות למסד הנתונים',
        })
      });
    }
  }

  New() {

    if (this.us.userPassword == '' && this.us.userName == null) {

      Swal.fire({
        icon: 'warning',
        title: 'אופס',
        text: 'שדות חובה לא מולאו',
      })

    }
    else if (this.us.userName == null && this.us.userPassword != '') {

      Swal.fire({
        icon: 'warning',
        title: 'אופס',
        text: 'ת.ז. משתמש הינו שדה חובה',
      })
    }
    else if (this.us.userName.length != 9 || !(this.LegalTz(this.us.userName))) {
      alert("ת.ז. לא תקינה")
    }

    else if (this.us.userName != null && this.us.userPassword == '')
      Swal.fire({
        icon: 'warning',
        title: 'אופס',
        text: 'סיסמא הינה שדה חובה',
      })

    else if (this.us.userPassword.length != 6) {
      alert("הקש סיסמא בעלת 6 תווים")
    }

    else {


      this.router.navigate(["sign in", this.us.userPassword]);
      document.getElementById('signin').hidden = false;
    }

  }
  ngOnInit() {
    // localStorage.clear();


  }

  cancel() {
    document.location.reload();

  }
  SaveLocal(user: BusinessUsers) {
    localStorage.setItem("CurrentUser", JSON.stringify(user));
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



  LegalTz(num) {
    var tot = 0;
    var tz = new String(num);

    for (this.i = 0; this.i < 8; this.i++) {
      this.tt = (((this.i % 2) + 1) * Number(tz.charAt(this.i)));
      if (this.tt > 9) {
        this.tt = this.tt.toString();
        this.tt = parseInt(this.tt.charAt(0)) + parseInt(this.tt.charAt(1))
      }
      tot += this.tt;
    }

    if ((tot + parseInt(tz.charAt(8))) % 10 == 0) {

      return true;
    } else {


      return false;
    }
  }





}











