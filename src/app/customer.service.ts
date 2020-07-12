import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Customer } from 'src/Model/Customer';
import { path } from './http.service'


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public http: HttpClient) {

  }
  GetCustomersById(cusId: string) {
    const params = new HttpParams({
      fromObject: {
        cusId: cusId

      }
    });
    return this.http.get<Customer>(path + "/Customer/GetCustomersById", { params: params });
  }


  GetAllCustoners() {
    return this.http.get<Array<Customer>>(path + "/Customer/GetAllCustoners");
  }


  AddCustomer(MyNewCustomer: Customer) {
    return this.http.post(path + "/Customer/AddCustomer", MyNewCustomer)
  }







}
