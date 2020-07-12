import { Component, OnInit } from '@angular/core';

import { element } from 'protractor';
import { debug } from 'util';
import { type } from 'os';
import { stringify } from 'querystring';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/Model/Customer';
import { Timeline } from 'src/Model/Timeline';
import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  cusstomer: Customer = null;
  isExistTimeLineSame: Timeline = null;
  MyNewTimeLine: Timeline = new Timeline();
  realode: boolean;
  isActiveCus: number;
  businessId: string;
  public listtimelinetoday: Array<Timeline>

  constructor(public ser: TimelineService, public activated: ActivatedRoute, public router: Router) {


  }

  ngOnInit() {
    this.cusstomer = JSON.parse(localStorage.getItem("CurrentCustomer"));
    this.activated.params.subscribe(param => this.businessId = '' + param["businessId"]);
    this.ser.GetCustomersNowByBusinessId(this.businessId).subscribe(suc => {

      //נכנס כבר היום למערכת
      if (suc != null) {

        this.listtimelinetoday = suc;
        this.listtimelinetoday.forEach(element => {
          if (element.customerID == this.cusstomer.customerID) {
            //יש ללקוח זה כניסה ללא יציאה היום
            //לקוח מבצע סריקה אחר סריקה ללא יציאה
            //נמצאה רשומה דומה היום לעסק זה ללקוח זה ולא בוצעה יציאה
            if (element.exitTime == null)
              Swal.fire({
                icon: "warning",
                title: 'Oops...',
                text: 'לא ניתן לבצע כניסה ללא יציאה ',
              })
            //ניווט לקסטומר קומפוננט כדי לבצע יציאה
            this.isActiveCus = 1;
            this.router.navigate(["customer", this.isActiveCus]);
          }
        });
        //הוספה טיים ליין למערכת


   

      }
      // היום לקוח ראשון
      // else if (suc == null) {
      this.MyNewTimeLine.customerID = this.cusstomer.customerID;
      this.MyNewTimeLine.businessID = parseInt(this.businessId);
      this.MyNewTimeLine.entranceDate = null;
      this.MyNewTimeLine.entranceTime = null;
      this.MyNewTimeLine.exitTime = null;

      this.ser.AddTimeLine(this.MyNewTimeLine).subscribe(succ => {

        Swal.fire(
          'Good job!',
          'נרשמה כניסה',
          'success'
        ), err => {
          alert("שגיאה בגישה למסד נתונים");
          this.router.navigate([""]);
        }
      }, err => {
        alert("שגיאה בגישה למסד נתונים");
        this.router.navigate([""]);
      }
      );



    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'שגיאה בגישה למסד נתונים',
      })
    });
  }
  //חיפוש אם לקוח זה קיים ברשימה של בלקוחות של ב=היום לחנות זו
  //אם קיים והיציאה האחרונה שלו שווה נאל
  //נסמן את שעת היציאה 
  //וננווט לדף הבית!!
  //כדי למנוע ממנו להקיש פעמייים יציאה!!
  //או שלא קיים או שבא שוב 
  //נוסיף טיים ליין חדש ללא יציאה


}




