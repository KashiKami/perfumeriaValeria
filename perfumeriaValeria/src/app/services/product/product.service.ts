import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost/api/product/';

  constructor(private http: HttpClient) { }

  public getProducts() {
    return this.http.get(`${this.baseUrl}getAll.php`);
  }

  public getProductsByCategory(id: any) {
    return this.http.get(`${this.baseUrl}getAllByCategory.php?id=`+id);
  }


  public getOneProduct(id: any) {
    return this.http.get(`${this.baseUrl}getProduct.php?id=`+id);
  }

  createProduct(product: any) {
    return this.http.post(`${this.baseUrl}create.php`, JSON.stringify(product));
  }

  editProduct(product: any, id: any) {
    return this.http.post(`${this.baseUrl}edit.php?id=` + id, JSON.stringify(product)).subscribe();
  }

  deleteProduct(product: any) {
    return this.http.post(`${this.baseUrl}delete.php`, JSON.stringify(product)).subscribe();
  }
}
