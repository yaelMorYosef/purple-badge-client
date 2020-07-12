import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Business } from 'src/Model/Business';
import { BusinessOwner } from 'src/Model/BusinessOwner';

import { path } from './http.service'
@Injectable({
  providedIn: 'root'
})
export class BusinessOwnerService {

  constructor(public http:HttpClient) {
  }

  
    GetAllBusinessOwners(busId:string)
    {
      const params = new HttpParams({
        fromObject: {
          busId :busId
  
        } });
    return this.http.get <Array<BusinessOwner>>(path+"/BusinessOwner/GetAllBusinessOwners",{params:params});
    }

    GetBusinessOwnerById(ownerId:string)
    {
      const params = new HttpParams({
        fromObject: {
          ownerId :ownerId
  
        }
      });
    return this.http.get<BusinessOwner>(path+"/BusinessOwner/GetBusinessOwnerById",{params:params});
    }
   
    AddBusinessOwner(businessO:BusinessOwner)
    {
      return this.http.post(path+"/BusinessOwner/AddBusinessOwner",businessO);
    }





   
}
