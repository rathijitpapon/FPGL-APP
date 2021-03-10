import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseIphoneDataServiceService {

  url = 'https://corsresolver.herokuapp.com/https://firebase-iphone-da-api.herokuapp.com/';
  // url = 'http://localhost:5000';

  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.headers.set('Access-Control-Allow-Origin', 'https://fpgl-app.herokuapp.com');
    this.headers.set('Access-Control-Allow-Credentials', 'true');
    this.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  }

  async getEventUserData(eventName: string, metricName: string, game: string, startDate: string, endDate: string): Promise<any>{

    let sessionID = '';
    await this.http.post(this.url + '/prepare/event/userData', {
      eventName,
      metricName,
      game,
      startDate,
      endDate
    }, {headers: this.headers}).toPromise()
      .then((result: any) => {
        if (result.statusCode === 200) {
          sessionID = result.sessionID;
        }
      });

    return this.getData(sessionID);
  }

  async getGames(): Promise<any>{
    let sessionID = '';
    await this.http.get(this.url + '/prepare/games', {headers: this.headers}).toPromise()
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
