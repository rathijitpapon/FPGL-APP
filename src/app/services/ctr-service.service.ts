import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CtrService {
  url = 'https://cross-promo-analytics-api.herokuapp.com/ctr';

  constructor(private http: HttpClient) { }

  getData(limit: number, offset: number): any {
    return this.http.post(this.url, {
      count: limit,
      offset,
    });
  }
}
