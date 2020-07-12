

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Timeline } from 'src/Model/Timeline';
import { path } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(public http: HttpClient) {


  }

  GetTimeLinebyDatee(dateS: string, businessID: string) {

    const params = new HttpParams({
      fromObject: {
        dateS: dateS,
        businessID: businessID

      }
    });
    return this.http.get<Array<Timeline>>(path + "/Timeline/GetTimeLinebyDatee", { params: params });

  }

  GetTimeLinebyDateAndEnteranceTime(businessID: string, dateS: string, enteranceTimeS: string) {
    const params = new HttpParams({
      fromObject: {
        businessID: businessID,
        dateS: dateS,
        enteranceTimeS: enteranceTimeS

      }
    });
    return this.http.get<Array<Timeline>>(path + "/Timeline/GetTimeLinebyDateAndEnteranceTime", { params: params });
  }

  GetTmeLineByBusinessId(businessID: string) {
    const params = new HttpParams({
      fromObject: {
        businessID: businessID
      }
    });
    return this.http.get<Array<Timeline>>(path + "/Timeline/GetTmeLineByBusinessId" ,{params:params});
  }

  GetAllTimeLines() {
    return this.http.get<Array<Timeline>>(path + "/Timeline/GetAllTimeLines");
  }
 
  GetCustomersNowByBusinessId(businessID: string) {
    const params = new HttpParams({
      fromObject: {
        businessID: businessID
      }
    });

    return this.http.get<Array<Timeline>>(path + "/Timeline/GetCustomersNowByBusinessId", { params: params });

  }

 
  UpdateTimeLine(MyNewTimeLine: Timeline) {
    return this.http.post(path + "/Timeline/UpdateTimeLine", MyNewTimeLine)

  }
  AddTimeLine(MyNewTimeLine: Timeline) {
    return this.http.post(path + "/Timeline/AddTimeLine", MyNewTimeLine)

  }

  GetTimeLinebyDate(businessIdS: string) {
    const params = new HttpParams({
      fromObject: {
        businessIdS: businessIdS
      }
    });

    return this.http.get<Array<Timeline>>(path + "/Timeline/GetTimeLinebyDate", { params: params });

  }
  GetTimeLinebyHouers(businessID: string, dateS: string, entranceTimeS: string, exitTimeS: string) {

    const params = new HttpParams({
      fromObject: {
        businessID: businessID,
        dateS: dateS,
        entranceTimeS: entranceTimeS,
        exitTimeS: exitTimeS
      }
    });

    return this.http.get<Array<Timeline>>(path + "/Timeline/GetTimeLinebyHouers", { params: params });

  }
  GetDate()
  {
    return this.http.get<Date>(path + "/Timeline/GetDate");
  }



}

