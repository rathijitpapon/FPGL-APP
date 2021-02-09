import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CtrService {
  url = 'https://cross-promo-analytics-api.herokuapp.com';

  constructor(private http: HttpClient) { }

  getData(limit: number, offset: number): any {
    return this.http.post(this.url + '/ctr', {
      count: limit,
      offset,
    });
  }

  getCTR(limit: number, offset: number, database: string): any {
    return this.http.post(this.url + '/game', {
      database,
      limit,
      offset,
    });
  }
}
