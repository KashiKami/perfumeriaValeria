import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

import { OrderService } from '../services/order/order.service';
import { Router, ActivatedRoute } from "@angular/router";
import { User } from '../models/user';
import { ClientService } from '../services/client/client.service';

import { formatDate } from '@angular/common';
import { CategoryService } from '../services/category/category.service';

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

  public categories: any[] = null;
  public subCategories: any[] = null;


  constructor(private orderService: OrderService,
    private router: Router,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
    this.getProducts();
    this.getCategories();
  }


  getProducts(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.orderService.getProducts(id).subscribe((data: Product[]) => {
      this.products = data;
    });
  }


  getCategories(): void {
    this.categoryService.getCategoriesTwo().subscribe((data: any[]) => {
      this.categories = data;
    });
  }

  getSubCategories(id: any): void {
    this.subCategories = null;
    this.categoryService.getSubCategories(id).subscribe((data: any[]) => {
      this.subCategories = data;
    });

  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
