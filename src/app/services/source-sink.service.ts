import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceSinkService {

  url = 'https://cross-promo-analytics-api.herokuapp.com';
  // url = 'http://localhost:5000';

  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.headers.set('access-control-allow-origin', '*');
  }

  getTotalBucksSpendAndEarning(selectedDatabase: string, upperLimitOfBucks: number, lowerLimitOfBucks: number,
                               minTimeSpan: number, maxTimeSpan: number, appVersion: number): any {
    return this.http.post(this.url + '/sourceSink/bucksStatus/totalSpendAndEarning', {
      db: selectedDatabase,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks,
      minTimeSpan,
      maxTimeSpan,
      appVersion
    }, {headers: this.headers});
  }

  getBucksStatus(database: string, upperLimitOfBucks: number, lowerLimitOfBucks: number,
                 minTimeSpan: number, maxTimeSpan: number, appVersion: number): any {
    return this.http.post(this.url + '/sourceSink/bucksStatus', {
      db: database,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks,
      minTimeSpan,
      maxTimeSpan,
      appVersion
    }, {headers: this.headers});
  }

  getBucksSpendAndEarning(selectedDatabase: string , upperLimitOfBucks: number,
                          lowerLimitOfBucks: number, minTimeSpan: number, maxTimeSpan: number,
                          appVersion: number): any {
    return this.http.post(this.url + '/sourceSink/bucksStatus/bucksSpendAndEarning', {
      db: selectedDatabase,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks,
      minTimeSpan,
      maxTimeSpan,
      appVersion
    }, {headers: this.headers});
  }

  getBucksColumns(database: string): any {
    return this.http.get(this.url + '/sourceSink/columns/' + database, {headers: this.headers});
  }

  getAverageCumulativeBucksSpendAndEarn(database: string, upperLimit: number, lowerLimit: number,
                                        minTimeSpan: number, maxTimeSpan: number,
                                        appVersion: number): any {
    return this.http.post(this.url + '/sourceSink/averageBucksSpendAndEarning/' + database, {
      upperLimit,
      lowerLimit,
      minTimeSpan,
      maxTimeSpan,
      appVersion
    }, {headers: this.headers});
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

  getVersions(selectedDatabase: string | undefined): any {
    return this.http.get(this.url + '/sourceSink/bucksStatus/getVersions/' + selectedDatabase);
  }

  async getData(sessionID: string): Promise<any> {
    let data = {};
    let isPending = true;

    while (isPending) {
      await this.delay(3000);
      await this.http.post(this.url + '/result/data', {
        sessionID
      }).toPromise()
        .then((result: any) => {
          if (result.STATUS !== 'PENDING'){
            data = result.data;
            isPending = false;
          }
        });
    }

    return data;
  }

  delay(ms: number): any {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
