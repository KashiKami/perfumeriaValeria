import { Component, OnInit } from '@angular/core';

import { Product } from '../models/product';
import { OrderService } from '../services/order/order.service';

import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Client } from '../models/client';
import { ClientService } from '../services/client/client.service';
import { ProductService } from '../services/product/product.service';
import { OrderProviderService } from '../services/orderProvider/order-provider.service';

import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-order-provider',
  templateUrl: './order-provider.component.html',
  styleUrls: ['./order-provider.component.scss']
})
export class OrderProviderComponent implements OnInit {

  public products: Product[] = null;
  public availableProducts: Product[];

  public disable: boolean = false;

  private order: any = {};

  addForm: FormGroup;

  constructor(private orderProviderService: OrderProviderService,
              private productServie: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public toastr: ToastrManager) {
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      "codeBar": ['', Validators.required],
      "amount": ['', Validators.required],
      "priceIn": ['', Validators.required]
    });

    setTimeout(() => {
      this.getProducts();
    }, 100);

    setTimeout(() => {
      this.getClients();
    }, 100);
  }

  getProducts(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.orderProviderService.getProducts(id).subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  getClients(): void {
    this.productServie.getProducts().subscribe((data: Product[]) => {
      this.availableProducts = data;
    });
  }

  delete(product: any) {
    let id = this.route.snapshot.paramMap.get('id');
    this.orderProviderService.deleteProduct(product, id);
    setTimeout(() => {
      this.getProducts();
    }, 100);
  }

  addProduct() {
    console.log(this.addForm.value);
    let id = this.route.snapshot.paramMap.get('id');
    this.orderProviderService.addProduct(this.addForm.value, id).subscribe((data: any) => {
      if (data.error && data.error != 'creado exitosamente') {
        this.showAlarm(data.error);
      } else if (data.error == 'creado exitosamente') {
        this.showSuccess();
        setTimeout(() => {
          this.getProducts();
        }, 100);
      }
    });
  
  }

  verify(){
    this.order.id = this.route.snapshot.paramMap.get('id');
    this.orderProviderService.addInventory(this.order);
    this.showSuccessM('Pedido realizado correctamente');
    this.router.navigate(['admin/products']);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }

  showSuccess() {
    this.toastr.successToastr('Producto agregado', 'Esta hecho!');
  }

  showSuccessM(text: any) {
    this.toastr.successToastr(text, 'Esta hecho!');
  }

  showAlarm(text: any) {
    this.toastr.warningToastr(text, 'Cuidado!');
  }

}
