import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

import { OrderService } from '../services/order/order.service';
import { Router, ActivatedRoute } from "@angular/router";
import { User } from '../models/user';
import { ClientService } from '../services/client/client.service';

import { formatDate } from '@angular/common';

@Component({
  selector: 'app-detail-order-client',
  templateUrl: './detail-order-client.component.html',
  styleUrls: ['./detail-order-client.component.scss']
})
export class DetailOrderClientComponent implements OnInit {

  public products: any[];
  currentUser: User;
  currentOrder: any;
  order: any = {};


  constructor(private orderService: OrderService,
    private router: Router,
    private clientService: ClientService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
    this.getProducts();
  }


  getProducts(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.orderService.getProducts(id).subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
