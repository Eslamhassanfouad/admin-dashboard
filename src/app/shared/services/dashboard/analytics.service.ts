import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../../constants/baseURL';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private _HttpClient: HttpClient) {}

  //get products
  getProductsAnalytics(): Observable<any> {
    return this._HttpClient.get(`${baseURL}/products`);
  }
}
