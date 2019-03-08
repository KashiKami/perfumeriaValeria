import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductProviderService {

  baseUrl = 'http://localhost/api/productProvider/';

  constructor(private http: HttpClient) { }

  public getProducts(id: any) {
    const data = {
      id: id
    };
    return this.http.get(`${this.baseUrl}getDetailOrder.php`, { params: data });
  }

  public getProduct(id: any) {
    return this.http.get(`${this.baseUrl}getProduct.php?id=` + id);
  }

  addProduct(provider: any) {
    return this.http.post(`${this.baseUrl}create.php`, JSON.stringify(provider)).subscribe();
  }

  deleteProduct(provider: any) {
    return this.http.post(`${this.baseUrl}deleteProduct.php`, JSON.stringify(provider)).subscribe();
  }

  editProduct(provider: any) {
    return this.http.post(`${this.baseUrl}reduceInventory.php`, JSON.stringify(provider)).subscribe();
  }

  removeProduct(provider: any) {
    return this.http.post(`${this.baseUrl}edit.php`, JSON.stringify(provider)).subscribe();
  }
}
