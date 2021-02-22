import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SourceSinkService {

  url = 'https://cross-promo-analytics-api.herokuapp.com';
  // url = 'http://localhost:5000';

  constructor(private http: HttpClient) {
  }

  getTotalBucksSpendAndEarning(selectedDatabase: string, upperLimitOfBucks: number, lowerLimitOfBucks: number,
                               timeSpan: number): any {
    return this.http.post(this.url + '/sourceSink/bucksStatus/totalSpendAndEarning', {
      db: selectedDatabase,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks,
      timeSpan
    });
  }

  getBucksStatus(database: string, upperLimitOfBucks: number, lowerLimitOfBucks: number,
                 timeSpan: number): any {
    return this.http.post(this.url + '/sourceSink/bucksStatus', {
      db: database,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks,
      timeSpan
    });
  }

  getBucksSpendAndEarning(selectedDatabase: string , upperLimitOfBucks: number,
                          lowerLimitOfBucks: number, timeSpan: number): any {
    return this.http.post(this.url + '/sourceSink/bucksStatus/bucksSpendAndEarning', {
      db: selectedDatabase,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks,
      timeSpan
    });
  }

  getBucksColumns(database: string): any {
    return this.http.get(this.url + '/sourceSink/columns/' + database);
  }

  getAverageCumulativeBucksSpendAndEarn(database: string, upperLimit: number, lowerLimit: number, timeSpan: number): any {
    return this.http.post(this.url + '/sourceSink/averageBucksSpendAndEarning/' + database, {
      upperLimit,
      lowerLimit,
      timeSpan
    });
  }

  getAverageAdShowPerSource(database: string, timeSpan: number): any {
    return this.http.get(this.url + '/sourceSink/averageAdShowPerSource/' + database + '/' + timeSpan);
  }
}
