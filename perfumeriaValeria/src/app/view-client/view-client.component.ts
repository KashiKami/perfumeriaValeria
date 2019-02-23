import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product/product.service';
import { User } from '../models/user';
import { Router, ActivatedRoute } from "@angular/router";
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {

  public products: Product[];
  currentUser: User;
  currentOrder: any;

  public categories: any[] = null;
  public subCategories: any[] = null;

  isCategoryEmpty: boolean = false;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
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
