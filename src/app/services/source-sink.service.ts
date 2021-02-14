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

  getBucksStatus(database: string | undefined, upperLimitOfBucks: number | undefined, lowerLimitOfBucks: number | undefined): any {
    console.log(database);
    return this.http.post(this.url + '/sourceSink/bucksStatus/' + database, {
      db: database,
      upperLimit: upperLimitOfBucks,
      lowerLimit: lowerLimitOfBucks
    });
  }
}
