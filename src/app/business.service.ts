import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Business } from 'src/Model/Business';
import { path } from './http.service'



@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(public http: HttpClient) {

  }

  GetAllBusiness() {
    return this.http.get<Array<Business>>(path + "/Business/GetAllBusiness");
  }
  GetBusinessByOwnerId(userName: string) {
    const params = new HttpParams({
      fromObject: {
        userName: userName

      }
    });

    return this.http.get<Array<Business>>(path + "/Business/GetBusinessByOwnerId", { params: params });
  }
  GetMaxIDBusiness() {
    return this.http.get<number>(path + "/Business/GetMaxIDBusiness");
  }



  GetIfBusinessExist(businessID: string) {

    const params = new HttpParams({
      fromObject: {
        businessID: businessID

      }
    });
    return this.http.get<Business>(path + "/Business/GetIfBusinessExist", { params: params });
  }

  GetBusinessCoder(urlBusiness: string) {
    const params = new HttpParams({
      fromObject: {
        urlBusiness: urlBusiness

      }
    });

    return this.http.get<string>(path + "/Business/GetBusinessCoder", { params: params });

  }
  GetBusinessByBussinessID(bussinesID: number) {
    return this.http.get<Business>(path + "/Business/GetBusinessByBussinessID?number/bussinesID");


  }

  AddBusiness(myyy: Business) {

    return this.http.post(path + "/Business/AddBusiness", myyy);
  }






}
