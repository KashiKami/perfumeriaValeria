import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product/product.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {

  public products: Product[];



  format(price: number) {
    return price.toLocaleString('es-CO', { currency: 'COP', style: 'currency' });
  }

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.getProducts();
    }, 500);
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  delete(product: any) {
    this.productService.deleteProduct(product);
    setTimeout(() => {
      this.getProducts();
    }, 100);
  }


  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }
}
