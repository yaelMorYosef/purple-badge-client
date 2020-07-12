import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/Model/Business';
import { BusinessService } from '../business.service';
import { BusinessUsers } from 'src/Model/BusinessUsers';
import { BusinessOwnerService } from '../business-owner.service';
import { BusinessOwner } from 'src/Model/BusinessOwner';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  MylistB: Array<Business>;

  userName: string;
  ownerId: string;
  buss: Business;

  user: BusinessUsers = JSON.parse(localStorage.getItem("CurrentUser"));
  @Input()
  owner: BusinessOwner;

  constructor(public serBusiness: BusinessService, public serOwner: BusinessOwnerService,
    public activated: ActivatedRoute,
    public router: Router) {
    this.buss = new Business();

  }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem("CurrentUser"));
    this.userName = this.user.userName;
    this.ownerId = this.userName;
    //מציאת שם הבעלים להצגה בוולקם
    console.log(this.userName);
    this.serOwner.GetBusinessOwnerById(this.ownerId).subscribe(succ => {
      if (succ != null) {
        this.owner = succ;

      }

    }, err => {
      alert("שגיאה בגישה למסד נתונים");
      this.router.navigate([""]);
    });

    this.serBusiness.GetBusinessByOwnerId(this.userName).subscribe(succ => {
      if (succ != null) {
        this.MylistB = succ;
        console.log("Exists");
        console.log(this.MylistB);
      }
      else {
        console.log("NotExists");
      }

    }, err => {
      alert("שגיאה בגישה למסד נתונים");
      this.router.navigate([""]);
    });

  }


  //הצגת פרטי סניף שנבחר
  ChozenBusiness(bus: Business) {
    console.log(bus)
    this.buss = bus;
    this.router.navigate(["time line", this.buss.businessID]);


  }
  addNewBusiness() {
    this.router.navigate(["add business", this.userName]);

  }

  back() {

    document.location.reload();
  }

}