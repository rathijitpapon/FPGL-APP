import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CtrService {
  url = 'https://cross-promo-analytics-api.herokuapp.com';
  // url = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getData(limit: number, offset: number): any {
    return this.http.post(this.url + '/ctr', {
      count: limit,
      offset,
    });
  }

  getOtherCTR(limit: number, offset: number, database: string, version: string): any {
    return this.http.post(this.url + '/otherctr/' + database, {
      version,
      limit,
      offset,
    });
  }

  getThisCTR(limit: number, offset: number, database: string, c1: string): any {
    return this.http.post(this.url + '/thisctr/' + database, {
      limit,
      offset,
      c1,
    });
  }

  getVersions(limit: number, offset: number, database: string): any {
    return this.http.post(this.url + '/versions/' + database, {
      limit,
      offset,
    });
  }
}
