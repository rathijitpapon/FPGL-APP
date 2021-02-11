import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CtrService {
  // url = 'https://cross-promo-analytics-api.herokuapp.com';
  url = 'http://localhost:5000';

  constructor(private http: HttpClient) {
  }

  getData(limit: number, offset: number): any {
    return this.http.post(this.url + '/ctr', {
      count: limit,
      offset,
    });
  }

  getCTR(limit: number, offset: number, database: string, version: string): any {
    return this.http.post(this.url + '/ctr/' + database, {
      version,
      limit,
      offset,
    });
  }

  getVersions(limit: number, offset: number, database: string): any {
    return this.http.post(this.url + '/versions/' + database, {
      limit,
      offset,
    });
  }

  getTotalAdCompletion(): any {
    return this.http.post(this.url + '/adCompletion', {});
  }

  setDataBase(dbName: string | null): any {
    return this.http.get(this.url + '/adCompletion/' + dbName);
  }
}
