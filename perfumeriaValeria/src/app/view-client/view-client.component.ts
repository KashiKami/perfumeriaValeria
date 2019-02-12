import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product/product.service';
import { User } from '../models/user';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {

  public products: Product[];
  currentUser: User;
  currentOrder: any;

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit() {
    this.getProducts();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
