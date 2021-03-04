import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceSinkService {

  url = 'https://corsresolver.herokuapp.com/https://cross-promo-analytics-api.herokuapp.com';
  // url = 'http://localhost:5000';

  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    // this.headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.headers.set('Access-Control-Allow-Origin', 'https://fpgl-app.herokuapp.com');
    this.headers.set('Access-Control-Allow-Credentials', 'true');
    this.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  }

  async getTotalBucksSpendAndEarning(selectedDatabase: string,
                                     upperLimitOfBucks: number,
                                     lowerLimitOfBucks: number,
                                     minTimeSpan: number,
                                     maxTimeSpan: number,
                                     appVersion: number): Promise<any> {
    let sessionID = '';
    await this.http.post(this.url + '/prepare/sourceSink/bucksStatus/totalSpendAndEarning', {
      database: selectedDatabase,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks,
      minTimeSpan,
      maxTimeSpan,
    }, {headers: this.headers}).toPromise()
    .then((result: any) => {
      if (result.statusCode === 200) {
        sessionID = result.sessionID;
      }
    });

    return this.getData(sessionID);
  }

  async getBucksStatus(database: string,
                       upperLimitOfBucks: number,
                       lowerLimitOfBucks: number,
                       minTimeSpan: number,
                       maxTimeSpan: number,
                       appVersion: number): Promise<any> {
    let sessionID = '';
    await this.http.post(this.url + '/prepare/sourceSink/bucksStatus', {
      database,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks,
      minTimeSpan,
      maxTimeSpan
    }, {headers: this.headers}).toPromise()
    .then((result: any) => {
      if (result.statusCode === 200) {
        sessionID = result.sessionID;
      }
    });

    return this.getData(sessionID);
  }

  async getBucksSpendAndEarning(selectedDatabase: string ,
                                upperLimitOfBucks: number,
                                lowerLimitOfBucks: number,
                                minTimeSpan: number,
                                maxTimeSpan: number,
                                appVersion: number): Promise<any> {
    let sessionID = '';
    await this.http.post(this.url + '/prepare/sourceSink/bucksStatus/bucksSpendAndEarning', {
      database: selectedDatabase,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks,
      minTimeSpan,
      maxTimeSpan
    }, {headers: this.headers}).toPromise()
    .then((result: any) => {
      if (result.statusCode === 200) {
        sessionID = result.sessionID;
      }
    });

    return this.getData(sessionID);
  }

  async getBucksColumns(database: string): Promise<any> {
    let sessionID = '';
    await this.http.get(this.url + '/prepare/sourceSink/columns/' + database, {headers: this.headers}).toPromise()
    .then((result: any) => {
      if (result.statusCode === 200) {
        sessionID = result.sessionID;
      }
    });

    return this.getData(sessionID);
  }

  async getAverageCumulativeBucksSpendAndEarn(database: string,
                                              upperLimit: number,
                                              lowerLimit: number,
                                              minTimeSpan: number,
                                              maxTimeSpan: number,
                                              appVersion: number): Promise<any> {
    let sessionID = '';
    await this.http.post(this.url + '/prepare/sourceSink/averageBucksSpendAndEarning/' + database, {
      upperLimit,
      lowerLimit,
      minTimeSpan,
      maxTimeSpan
    }, {headers: this.headers}).toPromise()
    .then((result: any) => {
      if (result.statusCode === 200) {
        sessionID = result.sessionID;
      }
    });

    return this.getData(sessionID);
  }

  async getAverageAdShowPerSource(database: string, reqType: string, hoursMin: number, hoursMax: number): Promise<any> {
    let sessionID = '';
    await this.http.post(this.url + '/prepare/sourceSink/averageAdShowPerSource/' + database, {
      reqType,
      hoursMin,
      hoursMax
    }, {headers: this.headers}).toPromise()
      .then((result: any) => {
        if (result.statusCode === 200) {
          sessionID = result.sessionID;
        }
      });

    return this.getData(sessionID);
  }

  async getAdRejectionData(database: string, reqType: string, hoursMin: number, hoursMax: number): Promise<any>{
    let sessionID = '';
    await this.http.post(this.url + '/prepare/sourceSink/averageAdRejectionPerSource/' + database, {
      reqType,
      hoursMin,
      hoursMax
    }, {headers: this.headers}).toPromise()
      .then((result: any) => {
        if (result.statusCode === 200) {
          sessionID = result.sessionID;
        }
      });

    return this.getData(sessionID);
  }

  async getVersions(selectedDatabase: string | undefined): Promise<any> {
    let sessionID = '';
    await this.http.get(this.url + '/prepare/sourceSink/bucksStatus/getVersions/' + selectedDatabase).toPromise()
    .then((result: any) => {
      if (result.statusCode === 200) {
        sessionID = result.sessionID;
      }
    });

    return this.getData(sessionID);
  }

  async getData(sessionID: string): Promise<any> {
    let data = {};
    let isPending = true;

    while (isPending) {
      let waitingTime = 2000;
      await this.http.post(this.url + '/result/data', {
        sessionID
      }).toPromise()
        .then((result: any) => {
          if (result.STATUS !== 'PENDING'){
            data = result.data;
            isPending = false;
          }
        });
      await this.delay(waitingTime);
      waitingTime *= 2;
      waitingTime = Math.max(waitingTime, 30000);
    }

    return data;
  }

  delay(ms: number): any {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
