import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ProductService } from '../services/product/product.service';
import { Product } from '../models/product';
import { Router, ActivatedRoute } from "@angular/router";
import { ClientService } from '../services/client/client.service';
import { CategoryService } from '../services/category/category.service';

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

  public categories: any[] = null;
  public subCategories: any[] = null;

  constructor(private router: Router,
              private productService: ProductService,
              private route: ActivatedRoute,
              private clienService: ClientService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentOrder = JSON.parse(localStorage.getItem('currentOrder'));

    this.getCategories();

    this.productService.getOneProduct(id).subscribe(data => {
      this.product = data;
    })
  }

  addProduct() {
    this.productAdd.codeBar = this.product.codeBar;
    setTimeout(() => {
    this.clienService.addProduct(this.productAdd, this.currentOrder.id);
      this.router.navigate(['/order']);
    }, 300);
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

}
