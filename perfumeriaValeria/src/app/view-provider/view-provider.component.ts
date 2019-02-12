import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProducInventoryService } from '../services/productInventory/produc-inventory.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-view-provider',
  templateUrl: './view-provider.component.html',
  styleUrls: ['./view-provider.component.scss']
})
export class ViewProviderComponent implements OnInit {

  headElements = ['Nombre Producto', 'Cantidad'];
  public products: Product[];

  constructor(private producInventiryServide: ProducInventoryService,
              private router: Router,) { }

  ngOnInit() {
    this.getProductsAmount();
  }

  getProductsAmount(): void {
    this.producInventiryServide.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }
}
