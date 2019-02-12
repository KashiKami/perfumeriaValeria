import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  baseUrl = 'http://localhost/api/provider/';

  constructor(private http: HttpClient) { }

  public getProviders() {
    return this.http.get(`${this.baseUrl}getAll.php`);
  }

  public getOneProvider(email: any) {
    return this.http.get(`${this.baseUrl}getProvider.php?email=` + email);
  }

  createProvider(provider: any) {
    return this.http.post(`${this.baseUrl}create.php`, JSON.stringify(provider)).subscribe();
  }

  editProvider(provider: any, email: any) {
    return this.http.post(`${this.baseUrl}edit.php?email=` + email, JSON.stringify(provider)).subscribe();
  }

  deleteProvider(product: any) {
    return this.http.post(`${this.baseUrl}delete.php`, JSON.stringify(product)).subscribe();
  }
}
