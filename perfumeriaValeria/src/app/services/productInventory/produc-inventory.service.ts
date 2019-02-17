import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProducInventoryService {

  baseUrl = 'http://localhost/api/productInventory/';

  constructor(private http: HttpClient) { }

  public getProducts() {
    return this.http.get(`${this.baseUrl}getAll.php`);
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

  removeProduct(product: any) {
    return this.http.post(`${this.baseUrl}edit.php`, JSON.stringify(product)).subscribe();
  }
}
