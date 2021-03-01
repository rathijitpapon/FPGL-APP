import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CtrService {
  url = 'https://cross-promo-analytics-api.herokuapp.com';
  // url = 'http://localhost:5000';

  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.headers.set('access-control-allow-origin', '*');
  }

  getData(limit: number, offset: number): any {
    return this.http.post(this.url + '/ctr', {
      count: limit,
      offset,
    }, {headers: this.headers});
  }

  getOtherCTR(limit: number, offset: number, database: string, version: string): any {
    return this.http.post(this.url + '/otherctr/' + database, {
      version,
      limit,
      offset,
    }, {headers: this.headers});
  }

  getThisCTR(limit: number, offset: number, database: string, c1: string): any {
    return this.http.post(this.url + '/thisctr/' + database, {
      limit,
      offset,
      c1,
    }, {headers: this.headers});
  }

  getVersions(limit: number, offset: number, database: string): any {
    return this.http.post(this.url + '/versions/' + database, {
      limit,
      offset,
    }, {headers: this.headers});
  }

  getTotalAdCompletion(database: string): any {
    return this.http.post(this.url + '/adCompletion/' + database, {}, {headers: this.headers});
  }

  getCTRWrtSource(database: string): any {
    return this.http.get(this.url + '/ctrwrtsrc/' + database, {headers: this.headers});
  }
}
