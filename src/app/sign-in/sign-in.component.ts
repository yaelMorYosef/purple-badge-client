import { Component, OnInit, QueryList, Input, ViewChildren, ElementRef } from '@angular/core';

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

import { BusinessUsers } from 'src/Model/BusinessUsers';
import { BusinessOwnerService } from '../business-owner.service';
import { BusinessOwner } from 'src/Model/BusinessOwner';
import { BusinessUsersService } from '../business-users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public us: BusinessOwner;
  public password: string;
  public user: BusinessUsers;
  tt: any;
  i: any;
  constructor(public ser: BusinessOwnerService, public activated: ActivatedRoute, public router: Router, public serUser: BusinessUsersService) {
    this.us = new BusinessOwner();



  }
  @ViewChildren('MyInputsDiv')
  div: QueryList<ElementRef>;

  ngOnInit() {
    this.activated.params.subscribe(param => this.password = param["userPassword"]);
    this.activated.params.subscribe(param => this.us.ownerID = param["userName"]);



  }
  Save() {
    if (this.us.ownerID == '' && this.us.ownerName == null && this.us.ownerPhoneNo == null) {

      Swal.fire({
        icon: 'error',
        title: 'אופס',
        text: 'שדות חובה לא מולאו',
      })

    }
    else if (this.us.ownerID == null) {

      Swal.fire({
        icon: 'error',
        title: 'אופס',
        text: 'ת.ז. בעל עסק  הנו שדה חובה',
      })
    }
    else if (this.us.ownerID.length != 9 || !(this.LegalTz(this.us.ownerID))) {
      alert("ת.ז. לא תקינה")
      this.us.ownerID = "";
    }
    else if (this.us.ownerName == null) {
      Swal.fire({
        icon: 'error',
        title: 'אופס',
        text: 'שם בעל עסק הנו שדה חובה',
      })
    }
    else if (this.us.ownerPhoneNo == null) {
      Swal.fire({
        icon: 'error',
        title: 'אופס',
        text: 'טלפון בעל עסק הנו שדה חובה',
      })
    }

    else if (this.us.ownerPhoneNo.length < 9 || this.us.ownerPhoneNo.length > 10) {
      alert("מספר טלפון לא תקין")
    }

    else {



      this.ser.AddBusinessOwner(this.us).subscribe(suc => {
        if (suc == null) {

          Swal.fire({
            icon: "warning",
            title: 'שגיאה',
            text: 'אתה כבר קיים במערכת',
          })


          this.div.first.nativeElement.childNodes.forEach(element => {
            if (element.value != "sign in")
              element.value = "";
          });
        }
        else if (suc != null) {
          Swal.fire(
            'Good job!',
            'בעל עסק נוסף בהצלחה',
            'success'
          )

          this.user = new BusinessUsers();
          this.user.userName = this.us.ownerID;
          this.user.userPassword = this.password;

          this.serUser.AddBusinessUser(this.user).subscribe(suc => {
            if (suc == null) {
              Swal.fire({
                icon: "warning",
                title: 'שגיאה',
                text: 'שגיאה בגשיה למסד נתונים',
              })
            }

            else if (suc != null) {
              Swal.fire(
                'Good job!',
                'משתמש נוסף בהצלחה',
                'success'
              )

              this.SaveLocal(this.user);
              this.router.navigate(["business"]);
            }

          }, err => {
            Swal.fire({
              icon: 'error',
              title: 'שגיאה',
              text: 'שגיאה בגישה למסד נתונים',
            })
          });
        }

        // this.div.first.nativeElement.childNodes.forEach(element => {
        //   if (element.value != "sign in")
        //     element.value = "";
        // });




      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'שגיאה',
          text: 'משהו השתבש בחיבור',
        })
      });
    }


  }


  SaveLocal(user: BusinessUsers) {
    localStorage.setItem("CurrentUser", JSON.stringify(user));
  }
  cancel() {
    document.location.reload();
  }
  LegalTz(num) {
    var tot = 0;
    var tz = new String(num);

    for (this.i = 0; this.i < 8; this.i++) {
       this.tt = (((this.i % 2) + 1) *Number(tz.charAt(this.i))) ;
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
      flag = true;
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






