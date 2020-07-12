import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Timeline } from 'src/Model/Timeline';
import { Business } from 'src/Model/Business';
import { TimelineService } from '../timeline.service';
import Swal from 'sweetalert2';
import { BusinessService } from '../business.service';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { BusinessUsers } from 'src/Model/BusinessUsers';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-time-line',
    templateUrl: './time-line.component.html',
    styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit {
    public busId: number;
    public MylistTimeLine: Array<Timeline>;
    public tl: Timeline;
    public people: number;

    public enteranceTime: Date;
    public exitTime: Date;
    public business: Business;
    public businessID: string;
    public businessIdS: string;
    public mybusines: Business;
    public dateS: string;
    public enteranceTimeS: string;
    public exitTimeS: string;
    public timer = null;
    public href: string = '';
    public userMy: BusinessUsers;
    public isActiveCus: number;
    myDate: Date = new Date();
    @Input()
    public ima: string;

    date: Date;


    constructor(private domSanitizer: DomSanitizer, private location: Location, public serTimeLine: TimelineService, public activated: ActivatedRoute, public router: Router, public busser: BusinessService) {
        // Called first time before the ngOnInit()
        //   this.business = new Business();

        // this.tl = new Timeline();

    }
    ngOnInit() {
        //מציאת פרטי עסק על פי קוד עסק




        this.userMy = JSON.parse(localStorage.getItem("CurrentUser"));
        //סורק 
        //אם אין יוזר עסק -לקוח שסרק
        //בעל עסק יכול לסרוק רק על ידי כניסה כלקוח
        if (this.userMy == null) {
            if (localStorage.getItem("CurrentCustomer") == null)
                this.href = window.location.href;
            var last = this.href.substring(this.href.lastIndexOf("/") + 1, this.href.length);
            console.log(last);
            this.isActiveCus = parseInt(last);


            this.router.navigate(["customer", this.isActiveCus]);
        }




        this.activated.params.subscribe(param => this.busId = param["businessID"]);
        // this.tl.businessID = this.busId;
        this.businessID = this.busId + '';
        console.log(this.businessID);

        this.busser.GetIfBusinessExist(this.businessID).subscribe(succ => {
            if (succ != null) {
                this.business = succ;
                console.log(this.business)
              
                //  document.getElementById('myModal').style.display = 'block';
            }
            if (succ == null) {
                console.log("NotExists");
            }
        }, err => { alert("שגיאה בגישה למסד נתונים"); });


        this.serTimeLine.GetTimeLinebyDate(this.businessID).subscribe(succ => {
            if (succ.length != null) {
                this.MylistTimeLine = succ;


                console.log("Existsss");

            }
            else {
                console.log("NotExists");
                alert("לא נמצאו לקוחות");
                this.MylistTimeLine = null;
            }
        }, err => {
            Swal.fire({
                icon: "warning",
                title: 'שגיאה',
                text: 'שגיאה בגישה למסד נתונים',
            });
            console.log("time-line");
        });

    }

    ShowTimeLineSingle(t: Timeline) {
        this.router.navigate(["time line single", t.customerID]);
    }
    check() {






        if (this.date != null && this.enteranceTime != null && this.exitTime != null) {
            this.dateS = this.date + '';
            this.enteranceTimeS = this.enteranceTime + '';
            this.exitTimeS = this.exitTime + '';

            this.serTimeLine.GetTimeLinebyHouers(this.businessID, this.dateS, this.enteranceTimeS, this.exitTimeS).subscribe(succ => {
                if (succ.length != 0) {
                    this.MylistTimeLine = succ;
                    document.getElementById('myModal').style.display = 'block';
                }

                else {
                    {
                        Swal.fire({
                            icon: "warning",
                            title: 'אופס',
                            text: 'לא נמצאו לקוחות',
                        });
                        this.MylistTimeLine = null;

                    }
                }
            }, err => {
                Swal.fire({
                    icon: "warning",
                    title: 'שגיאה',
                    text: 'שגיאה בגישה למסד נתונים',
                });
                console.log("time-line");
            });

        }

        else if (this.date != null && this.enteranceTime == null && this.exitTime != null) {
            Swal.fire({
                icon: "warning",
                title: 'אופס',
                text: 'הקש שעת כניסה',
            });

        }
        else if (this.date != null && this.enteranceTime != null && this.exitTime == null) {
            this.dateS = this.date + '';
            this.enteranceTimeS = this.enteranceTime + '';
            this.serTimeLine.GetTimeLinebyDateAndEnteranceTime(this.businessID, this.dateS, this.enteranceTimeS).subscribe(succ => {
                if (succ.length != 0) {


                    this.MylistTimeLine = succ;
                    document.getElementById('myModal').style.display = 'block';
                }
                else {
                    {
                        Swal.fire({
                            icon: "warning",
                            title: 'אופס ',
                            text: 'לא נמצאו לקוחות',
                        });
                        this.MylistTimeLine = null;

                    }
                }
            }, err => {
                Swal.fire({
                    icon: "warning",
                    title: 'שגיאה',
                    text: 'שגיאה בגישה למסד נתונים',
                });
                console.log("time-line");
            });
        }
        else if (this.date != null && this.enteranceTime == null && this.exitTime == null) {
            this.dateS = this.date + '';
            this.serTimeLine.GetTimeLinebyDatee(this.dateS, this.businessID).subscribe(succ => {
                if (succ.length != 0) {
                    this.MylistTimeLine = succ;
                    console.log(this.MylistTimeLine.length);
                    document.getElementById('myModal').style.display = 'block';
                }

                else {
                    {
                        Swal.fire({
                            icon: "warning",
                            title: 'אופס',
                            text: 'לא נמצאו לקוחות',
                        });
                        this.MylistTimeLine = null;

                    }
                }
            }, err => {
                Swal.fire({
                    icon: "warning",
                    title: 'Oops...',
                    text: 'שגיאה בגישה למסד נתונים',
                });
                console.log("time-line");
            });

        }
        else {

            this.serTimeLine.GetTimeLinebyDate(this.businessID).subscribe(succ => {
                if (succ != null) {
                    this.MylistTimeLine = succ;
                    console.log(this.MylistTimeLine.length);
                    document.getElementById('myModal').style.display = 'block';

                }

                else {
                    {
                        Swal.fire({
                            icon: "warning",
                            title: 'אופס',
                            text: 'ל נמצאו לקוחות',
                        });
                        this.MylistTimeLine = null;

                    }
                }
            }, err => {
                Swal.fire({
                    icon: "warning",
                    title: 'שגיאה',
                    text: 'שגיאה בגישה למסד נתונים',
                });
                console.log("time-line");
            });


        }
    }

    cleanFilter() {


        this.enteranceTime = null;
        this.exitTime = null;
        this.date = null;

        document.getElementById('myModal').style.display = 'none';

    }
    back() {
        this.location.back();


    }
    NoOfPeople() {
        //פונקצייה הסוכמת את כל האלה שלא יצאו והיום
        this.serTimeLine.GetCustomersNowByBusinessId(this.businessID).subscribe(succ => {
            if (succ.length != null) {
                this.MylistTimeLine = succ;
                this.people = this.MylistTimeLine.length;
            }
            else {
                console.log("NotExists");
                this.MylistTimeLine = null;
                this.people = 0;
            }
        }, err => { alert("שגיאה בגישה למסד נתונים"); console.log("time-line"); });
    }


    close() {
        document.getElementById("myModal").style.display = "none";


    }
    print() {
        this.href = window.location.href;
        console.log(this.href);
        //  
        this.busser.GetBusinessCoder(this.href).subscribe(succ => {
            if (succ != null) {
                this.ima = succ;
                this.ima = 'data:image/jpg;base64,' + (this.domSanitizer.bypassSecurityTrustResourceUrl(succ) as any).changingThisBreaksApplicationSecurity;
                this.router.navigate(["print coder", this.ima]);

                console.log(this.ima);


                console.log(this.ima)
                console.log("see me ima");

            }
            else {
                console.log("NotExists");

            }
        }, err => { alert("שגיאה בגישה למסד נתונים"); console.log("time-lineImg"); });
    }

}
