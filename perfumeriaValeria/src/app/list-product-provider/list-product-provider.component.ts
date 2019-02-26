import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { OrderService } from '../services/order/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductProviderService } from '../services/productoprovider/product-provider.service';
import { ProductProvider } from '../models/productprovider';

@Component({
  selector: 'app-list-product-provider',
  templateUrl: './list-product-provider.component.html',
  styleUrls: ['./list-product-provider.component.scss']
})
export class ListProductProviderComponent implements OnInit {

  public products: any[];
  currentUser: User;
  currentOrder: any;
  order: any = {};
  email:any;
  date:any;

  constructor(private orderService: OrderService,
    private router: Router,
    private productProviderService: ProductProviderService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.email=params['email'];
        this.date=params['date'];
      });

     }

  ngOnInit() {
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  this.currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
  this.getProducts();
  }


  getProducts(): void {
    this.productProviderService.getProducts(this.email,this.date).subscribe((data: ProductProvider[]) => {
      this.products = data;
    });
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}