import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = 'http://localhost/api/order/';

  constructor(private http: HttpClient) { }

  public getOrders() {
    return this.http.get(`${this.baseUrl}getAll.php`);
  }

  public getProducts(id: any) {
    return this.http.get(`${this.baseUrl}getProducts.php?id=`+id);
  }

  public getClient(id: any) {
    return this.http.get(`${this.baseUrl}getClient.php?id=`+id);
  }


  addOrder(order: any) {
    return this.http.post(`${this.baseUrl}create.php`, JSON.stringify(order));
  }

  addProduct(order: any, id: any) {
    return this.http.post(`${this.baseUrl}addProduct.php?id=`+id, JSON.stringify(order));
  }

  deleteOrder(order: any) {
    return this.http.post(`${this.baseUrl}delete.php`, JSON.stringify(order)).subscribe();
  }

  deleteProduct(product: any, idOrder: any) {
    return this.http.post(`${this.baseUrl}deleteProduct.php?id=`+idOrder, JSON.stringify(product)).subscribe();
  }

  editProduct(product: any, idOrder: any) {
    return this.http.post(`${this.baseUrl}editProduct.php?id=`+idOrder, JSON.stringify(product)).subscribe();
  }

  editOrder(order: any) {
    return this.http.post(`${this.baseUrl}edit.php`, JSON.stringify(order)).subscribe();
  }
}
