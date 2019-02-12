import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Order } from '../models/order';
import { ClientService } from '../services/client/client.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-order-list-client',
  templateUrl: './order-list-client.component.html',
  styleUrls: ['./order-list-client.component.scss']
})
export class OrderListClientComponent implements OnInit {

  public orders: Order[] = null;
  order: any = {}
  currentUser: User;
  currentOrder: any;

  headElements = ['#', 'Fecha'];

  constructor(private clientService: ClientService,
              private router: Router) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
  }

  getProcedure() {
    this.order.email = this.currentUser.email;
    this.order.state = 'T';
    console.log(this.order);
    this.getOrders();
  }

  getValidate() {
    this.order.email = this.currentUser.email;
    this.order.state = 'V';
    this.getOrders();
  }

  getDispatched() {
    this.order.email = this.currentUser.email;
    this.order.state = 'D';
    this.getOrders();
  }

  getOrders(): void {
    this.clientService.getOrderSpecify(this.order).subscribe((data: Order[]) => {
      this.orders = data;
    });
  }


  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
