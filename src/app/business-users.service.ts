import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BusinessUsers } from 'src/Model/BusinessUsers';
import { path } from './http.service'


@Injectable({
  providedIn: 'root'
})
export class BusinessUsersService {

  constructor(public http: HttpClient) {

  

  }
  GetBusinessUserById(username: string) {
    const params = new HttpParams({
      fromObject: {
       username :username

      }
    });
    return this.http.get<BusinessUsers>(path+"/BusinessUsers/GetBusinessUserById",{params:params});
  }


  CheckIfPasswordExist(passwors: string) {
    return this.http.get<boolean>(path+"/BusinessUsers/CheckIfPasswordExist/passwors");

  }
  AddBusinessUser(busUser: BusinessUsers) {
    return this.http.post(path+"/BusinessUsers/AddBusinessUser", busUser);
  }







}
