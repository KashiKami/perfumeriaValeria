import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ProductService } from '../services/product/product.service';
import { Product } from '../models/product';
import { Router, ActivatedRoute } from "@angular/router";
import { ClientService } from '../services/client/client.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  currentUser: User;
  currentOrder: any;
  product: any = {};
  productAdd: any = {};

  constructor(private router: Router,
              private productService: ProductService,
              private route: ActivatedRoute,
              private clienService: ClientService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentOrder = JSON.parse(localStorage.getItem('currentOrder'));

    this.productService.getOneProduct(id).subscribe(data => {
      this.product = data;
    })
  }

  addProduct() {
    console.log("compara");
    this.productAdd.codeBar = this.product.codeBar;
    this.clienService.addProduct(this.productAdd, this.currentOrder.id);
    this.router.navigate(['/order']);
  }

}
