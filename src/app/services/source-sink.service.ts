import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SourceSinkService {

  url = 'https://cross-promo-analytics-api.herokuapp.com';
  // url = 'http://localhost:5000';
  socket: any;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }



  getTotalBucksSpendAndEarning(selectedDatabase: string, upperLimitOfBucks: number, lowerLimitOfBucks: number,
                               minTimeSpan: number, maxTimeSpan: number): any {
    return this.http.post(this.url + '/sourceSink/bucksStatus/totalSpendAndEarning', {
      db: selectedDatabase,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks,
      minTimeSpan,
      maxTimeSpan
    });
  }

  getBucksStatus(database: string, upperLimitOfBucks: number, lowerLimitOfBucks: number,
                 minTimeSpan: number, maxTimeSpan: number): any {
    return this.http.post(this.url + '/sourceSink/bucksStatus', {
      db: database,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks,
      minTimeSpan,
      maxTimeSpan
    });
  }

  getBucksSpendAndEarning(selectedDatabase: string , upperLimitOfBucks: number,
                          lowerLimitOfBucks: number, minTimeSpan: number, maxTimeSpan: number): any {
    return this.http.post(this.url + '/sourceSink/bucksStatus/bucksSpendAndEarning', {
      db: selectedDatabase,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks,
      minTimeSpan,
      maxTimeSpan
    });
  }

  getBucksColumns(database: string): any {
    return this.http.get(this.url + '/sourceSink/columns/' + database);
  }

  getAverageCumulativeBucksSpendAndEarn(database: string, upperLimit: number, lowerLimit: number,
                                        minTimeSpan: number, maxTimeSpan: number): any {
    return this.http.post(this.url + '/sourceSink/averageBucksSpendAndEarning/' + database, {
      upperLimit,
      lowerLimit,
      minTimeSpan,
      maxTimeSpan
    });
  }

  getAverageAdShowPerSource(database: string, timeSpan: number, reqType: string): any {
    this.sendData({
        database,
        reqType,
        hoursBefore: timeSpan,
      });
    // return this.http.post(this.url + '/sourceSink/averageAdShowPerSource/' + database, {
    //   reqType,
    //   hoursBefore: timeSpan,
    // });
  }

  sendData(data: any): any {
    this.socket.emit('join', data);
    this.socket.emit('sendData', data);
  }

  getData(dataId: string): any{
    return new Observable(observer => {
      this.socket.on(dataId, (data: any) => {
        observer.next(data);
      });
    });
  }

  sendAdCompletionData(data: any): any {
    this.socket.emit('join', data);
    this.socket.emit('sendCompletedAdData', data);
  }

  getAdCompletionData(dataId: string): any{
    return new Observable(observer => {
      this.socket.on(dataId, (data: any) => {
        observer.next(data);
      });
    });
  }

  getVersions(selectedDatabase: string | undefined) {
    return this.http.get(this.url + '/sourceSink/bucksStatus/getVersions/' + selectedDatabase);
  }
}
