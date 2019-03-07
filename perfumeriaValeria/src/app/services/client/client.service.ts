import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = 'http://localhost/api/client/';

  constructor(private http: HttpClient) { }


  public getClients() {
    return this.http.get(`${this.baseUrl}getAll.php`);
  }

  createClient(client: any) {
    return this.http.post(`${this.baseUrl}create.php`, JSON.stringify(client));
  }

  public getAllOrder(email: any) {
    return this.http.post(`${this.baseUrl}getAllOrder.php`, JSON.stringify(email));
  }


  confirmOrder(id: any) {
    return this.http.post(`${this.baseUrl}confirmOrder.php`, JSON.stringify(id)).subscribe();
  }

  createOrderClient(order: any) {
    return this.http.post(`${this.baseUrl}getOrder.php`, JSON.stringify(order)).subscribe((data: any) => {
        localStorage.setItem('currentOrder', JSON.stringify(data));
    });
  }

  addProduct(order: any, id: any) {
    return this.http.post(`${this.baseUrl}addProduct.php?id=` + id, JSON.stringify(order)).subscribe();
  }

  public getOrderSpecify(order: any) {
    return this.http.post(`${this.baseUrl}getOrderSpecify.php`, JSON.stringify(order));
  }
  deleteClients(client: any) {
    return this.http.post(`${this.baseUrl}delete.php`, JSON.stringify(client)).subscribe();
  }
}
