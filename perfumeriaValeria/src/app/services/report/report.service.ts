import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  baseUrl = 'http://localhost/api/report/';

  constructor(private http: HttpClient) { }

  getSales(date: any) {
    return this.http.post(`${this.baseUrl}getSels.php`, JSON.stringify(date));
  }

  getPriceSales(date: any) {
    return this.http.post(`${this.baseUrl}getPriceSell.php`, JSON.stringify(date));
  }
}
