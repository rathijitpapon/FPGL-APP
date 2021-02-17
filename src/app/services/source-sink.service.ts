import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SourceSinkService {

  // url = 'https://cross-promo-analytics-api.herokuapp.com';
  url = 'http://localhost:5000';

  constructor(private http: HttpClient) {
  }

  getTotalBucksSpendAndEarning(selectedDatabase: string | undefined, upperLimitOfBucks: number, lowerLimitOfBucks: number): any {
    return this.http.post(this.url + '/sourceSink/bucksStatus/totalSpendAndEarning', {
      db: selectedDatabase,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks
    });
  }

  getBucksStatus(database: string | undefined, upperLimitOfBucks: number | undefined, lowerLimitOfBucks: number | undefined): any {
    return this.http.post(this.url + '/sourceSink/bucksStatus', {
      db: database,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks
    });
  }

  getBucksSpendAndEarning(selectedDatabase: string | undefined, upperLimitOfBucks: number, lowerLimitOfBucks: number): any {
    return this.http.post(this.url + '/sourceSink/bucksSpendAndEarning', {
      db: selectedDatabase,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks
    });
  }
}
