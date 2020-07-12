import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Timeline } from 'src/Model/Timeline';
import { BusinessService } from '../business.service';
import { BusinessUsers } from 'src/Model/BusinessUsers';
import { Customer } from 'src/Model/Customer';
import { CustomerService } from '../customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-time-line-single',
  templateUrl: './time-line-single.component.html',
  styleUrls: ['./time-line-single.component.css']
})

export class TimeLineSingleComponent implements OnInit {
  @Input()
  myR: Timeline;
@Input()
 cuss: Customer;
 
  public cusId: string;
 
  public load: boolean = false;
  

  userBus: BusinessUsers = JSON.parse(localStorage.getItem("CurrentUser"));

  constructor(public router: Router, public activated: ActivatedRoute, public serCus: CustomerService) { }
  ngOnInit() {
    this.load=false;
    this.activated.params.subscribe(param => this.cusId = param["customerID"]);
    console.log(this.cusId);
    // //שליפת פרטי לקוח
    if (this.cusId != null) {

      this.serCus.GetCustomersById(this.cusId).subscribe(succ => { 
        this.cuss = succ;
        this.load=true;

       }, err => {
        Swal.fire({
          icon: "warning",
          title: 'Oops...',
          text: 'שגיאה בגישה למסד נתונים',
        })
      });

    }

  }

}










