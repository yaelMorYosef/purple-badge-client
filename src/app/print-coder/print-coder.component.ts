import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-print-coder',
  templateUrl: './print-coder.component.html',
  styleUrls: ['./print-coder.component.css']
})
export class PrintCoderComponent implements OnInit {


  @Input()
  public ima: string;
  
  constructor(public activated: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.activated.params.subscribe(param => this.ima = param["ima"]);




  }
 

}
