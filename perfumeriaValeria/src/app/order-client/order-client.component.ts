import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

import { OrderService } from '../services/order/order.service';
import { Router, ActivatedRoute } from "@angular/router";
import { User } from '../models/user';
import { ClientService } from '../services/client/client.service';

import { formatDate } from '@angular/common';


@Component({
  selector: 'app-order-client',
  templateUrl: './order-client.component.html',
  styleUrls: ['./order-client.component.scss']
})
export class OrderClientComponent implements OnInit {

  public products: Product[];
  currentUser: User;
  currentOrder: any;
  order: any = {};

  constructor(private orderService: OrderService,
              private router: Router,
              private clientService: ClientService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
    this.getProducts();
  }


  getProducts(): void {
    this.orderService.getProducts(this.currentOrder.id).subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

  delete(product: any) {
    this.orderService.deleteProduct(product);
    setTimeout(() => {
      this.getProducts();
    }, 100);
  }

  confirmOrder() {
    this.clientService.confirmOrder(this.currentOrder);
    let myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.order.date = myDate;
    this.order.email = this.currentUser.email;
    setTimeout(() => {
    this.clientService.createOrderClient(this.order);  
    }, 200);
  }
}
