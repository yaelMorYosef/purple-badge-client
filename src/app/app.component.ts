import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



import Swal from 'sweetalert2';
import { Customer } from 'src/Model/Customer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 public isActiveCus: number;

  title = 'PurpleBadageAngular';
 
  constructor(
    public activated: ActivatedRoute,
    public router: Router) { }
  







  logOut() {
    if (localStorage.length != 0) {
      localStorage.clear();
      Swal.fire(
        'bye bye :)',
        'היה לנו נחמד בשהותך תחזור בהקדם',
        'success'
      )
      console.log("נקי");
      this.router.navigate([""]);
      
      document.location.reload();
    }
    else {
      this.router.navigate([""]);
      console.log("נקי");
    }
  }


  ngOnInit() {
   
    this.isActiveCus=null;  
      // localStorage.setItem("CurrentCustomer", JSON.stringify(new Customer("123456789","0256654521")));
    document.getElementById('pressed').style.display = 'none';
    if (localStorage.getItem("CurrentCustomer") == null)
      document.getElementById('customerBut').style.display = 'none';
      else
      document.getElementById('customerBut').style.display = 'block';


  }








  goToLogin() {
    
    document.getElementById("11").style.backgroundImage = "url('./assets/g.jpg')";
    document.getElementById('start').style.display = 'none';
    if (localStorage.getItem("CurrentUser") == null) {
      document.getElementById('pressed').style.display = 'block';
      this.router.navigate(["log in"]);


    }

    else
      this.router.navigate(["business"]);
    document.getElementById('businessBut').style.display = 'none';
    document.getElementById('customerBut').style.display = 'none';
    document.getElementById('pressed').style.display = 'block';


  }
  goToCustomer() {
    document.getElementById("11").style.backgroundImage = "url('./assets/g.jpg')";  
   
    document.getElementById('navb').style.display = 'none';
    document.getElementById('start').style.display = 'none';

    console.log("cus " + localStorage.getItem("CurrentCustomer"));
    //לקוח חדש
    if (localStorage.getItem("CurrentCustomer") == null) {
      this.isActiveCus = 0;
      this.router.navigate(["customer", this.isActiveCus]);
      document.getElementById('businessBut').style.display = 'none';
      document.getElementById('customerBut').style.display = 'none';
      document.getElementById('pressed').style.display = 'block';

    }
    //לקוח קיים
    else {
      this.isActiveCus = 1; 
      document.getElementById('businessBut').style.display = 'block';
      document.getElementById('customerBut').style.display = 'block';
      document.getElementById('pressed').style.display = 'block';
      this.router.navigate(["customer", this.isActiveCus]);
      document.getElementById('businessBut').style.display = 'none';
      document.getElementById('customerBut').style.display = 'none';
    }

  }
}
