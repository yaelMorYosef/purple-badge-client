import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/Model/Customer';
import { BusinessService } from '../business.service';
import { CustomerService } from '../customer.service';
import { TimelineService } from '../timeline.service';
import { TimeLineComponent } from '../time-line/time-line.component';
import { Timeline } from 'src/Model/Timeline';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public MyNewCustomer: Customer;
  isNewCus: number;
  existCustomer: Customer = null;

  public listT: Array<Timeline>;
  public businessId: number;
  public businessID: string;
  tt: any;
  i: number;

  constructor(public timeser: TimelineService, public cusser: CustomerService, public ser: BusinessService, public activated: ActivatedRoute, public router: Router) {
    this.MyNewCustomer = new Customer();
  }

  ngOnInit() {
    document.getElementById('c').removeAttribute('disabled');
    document.getElementById('c2').removeAttribute('disabled');
    console.log("dddddddddd")


    document.getElementById('enter').style.display = 'none';
    // localStorage.clear();
    //האם לקוח קיים=1 לא קיים=0
    this.activated.params.subscribe(param => this.isNewCus = param["isActiveCus"]);
    if (this.isNewCus != 0 && this.isNewCus != 1) {
      this.businessId = this.isNewCus;
      document.getElementById('enter').style.display = 'block';
      if (localStorage.getItem("CurrentCustomer") == null)
        this.isNewCus = 0;
      else {
        this.isNewCus = 1;

      }

    }
    if (this.isNewCus == 0) {


      document.getElementById('new').style.display = 'block';

    }
    if (this.isNewCus == 1) {


      this.existCustomer = JSON.parse(localStorage.getItem("CurrentCustomer"));
      this.MyNewCustomer.customerID = this.existCustomer.customerID;
      this.MyNewCustomer.customerPhoneNo = this.existCustomer.customerPhoneNo;
      document.getElementById('c').setAttribute('disabled', '');
      document.getElementById('c2').setAttribute('disabled', '');


      document.getElementById('new').style.display = 'block';
      document.getElementById('exit').style.display = 'block';
      document.getElementById('back').style.display = 'block';





    }


  }

  //שמירת פרטי לקוח פעם אחת במערכת!!
  scan() {

    if (this.MyNewCustomer.customerID == null || this.MyNewCustomer.customerPhoneNo == null) {
      Swal.fire({
        icon: "warning",
        title: 'אופס',
        text: 'ישנם שדות ריקים .',
      })
    }
    else if (this.MyNewCustomer.customerID.length != 9 || !(this.LegalTz(this.MyNewCustomer.customerID))) {
      alert("ת.ז. לא תקינה")
      this.MyNewCustomer.customerID = "";

    }
    else if (this.MyNewCustomer.customerPhoneNo.length < 9 || this.MyNewCustomer.customerPhoneNo.length > 10) {
      alert("מספר טלפון לא תקין")
    }
    else {

      //לקוח קיים במאגר
      if (this.isNewCus == 1) {
        this.router.navigate(["scanner", this.businessId]);

      }
      //אם לקוח חדש


      else {

        this.SaveLocal(this.MyNewCustomer);

        this.cusser.AddCustomer(this.MyNewCustomer).subscribe(succ => {
          this.MyNewCustomer = succ;
          this.isNewCus = 1;
          Swal.fire(
            'Good job!',
            ' זוהי כניסתך הראשונה למערכת',
            'success'


          )
            , err => {
              alert("שגיאה בגישה למסד נתונים");
              this.router.navigate([""]);
            }
        });
        // this.existCustomer = this.MyNewCustomer;
        this.router.navigate(["scanner", this.businessId]);

      }







    }

  }
  exit() {


    if (this.MyNewCustomer.customerID == null || this.MyNewCustomer.customerPhoneNo == null) {
      Swal.fire({
        icon: "warning",
        title: 'Oops...',
        text: 'ישנם שדות ריקים .',
      })
    }

    else {



      //הקש פרטים!! אם חדש
      //ניווט לטיים ליין ועדכון שעת יציאה
      //update exit
      //ניווט לאפפ
      //אם הוקש יציאה ללא כניסה 
      this.businessID = this.businessId + '';
      // this.businessID = "10017";
      this.timeser.GetTmeLineByBusinessId(this.businessID).subscribe(succ => {
        console.log(succ)
        if (succ == null) {
          Swal.fire({
            icon: "warning",
            title: 'Oops...',
            text: 'לא נרשמה כניסה למערכת .',
          })


        }
        if (succ != null) {
          this.listT = succ;
          this.listT.forEach(element => {
            if (element.customerID == this.existCustomer.customerID) {
              //נמצאה כניסה ללא יציאה
              if (element.exitTime == null) {
                this.timeser.UpdateTimeLine(element).subscribe(succ => {
                  this.MyNewCustomer = succ;
                  Swal.fire(
                    'Good job!',
                    ' זוהי כניסתך הראשונה למערכת',
                    'success'
                  )
                }, err => {
                  alert("something Wrong by updating");
                  this.router.navigate([""]);
                });
              }

            }




          }


          )
          alert("לא נמצאה יציאה לעדכן");
        }
      }, err => {
        alert("בעיה בעת חיפוש לקוחות לעסק");
        document.location.reload();
      });





    }
  }

  SaveLocal(cus: Customer) {
    localStorage.setItem("CurrentCustomer", JSON.stringify(cus));
  }


  back() {


    document.location.reload();
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
}