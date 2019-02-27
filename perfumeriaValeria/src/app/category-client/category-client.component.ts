import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/user';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Product } from '../models/product';
import { ProductService } from '../services/product/product.service';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-category-client',
  templateUrl: './category-client.component.html',
  styleUrls: ['./category-client.component.scss']
})
export class CategoryClientComponent implements OnInit, OnDestroy {

  navigationSubscription;

  currentUser: User;
  public products: Product[] = null;
  public categories: any[] = null;
  public subCategories: any[] = null;
  public subCategoriesMenuLeft: any[] = null;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.getProducts();
      }
    });
  }

  ngOnInit() {
    this.products = null;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getCategories();
    this.getSubCategoriesMenuLeft();
    this.getProducts();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getProducts(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductsByCategory(id).subscribe((data: Product[]) => {
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

  getSubCategoriesMenuLeft(): void {
    this.subCategoriesMenuLeft = null;
    this.categoryService.getSubCategoriesMenuLeft().subscribe((data: any[]) => {
      this.subCategoriesMenuLeft = data;
    });

  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

}
