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
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  public products: Product[] = null;
  public availableProducts: Product[];
  public client: Client = null;

  public auxProduct: any = {};

  headElements = ['Cliente', 'Telefono'];

  addForm: FormGroup;
  editForm: FormGroup;

  constructor(private orderService: OrderService,
              private clientService: ClientService,
              private productServie: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public toastr: ToastrManager) {
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      "codeBar": ['', Validators.required],
      "amount": ['', Validators.required]
    });

    this.editForm = this.formBuilder.group({
      "codeBar": ['', Validators.required],
      "amount": ['', Validators.required]
    });


    setTimeout(() => {
      this.getProducts();
    }, 100);

    setTimeout(() => {
      this.getClients();
    }, 100);

    setTimeout(() => {
      this.getClient();
    }, 100);
  }

  getProducts(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.orderService.getProducts(id).subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  getClient(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.orderService.getClient(id).subscribe((data: Client) => {
      this.client = data;
    });
  }

  getClients(): void {
    this.productServie.getProductsInventory().subscribe((data: Product[]) => {
      this.availableProducts = data;
    });
  }

  delete(product: any) {
    let id = this.route.snapshot.paramMap.get('id');
    this.orderService.deleteProduct(product, id);
    setTimeout(() => {
      this.getProducts();
    }, 100);
  }

  editProduct(product: any) {
    let id = this.route.snapshot.paramMap.get('id');
    this.editForm.patchValue({codeBar:product.codeBar});
    console.log(this.editForm.value);
    this.orderService.editProduct(this.editForm.value, id);
    setTimeout(() => {
      this.getProducts();
    }, 100);
  }

  addProduct() {
    let id = this.route.snapshot.paramMap.get('id');
    this.orderService.addProduct(this.addForm.value, id).subscribe((data: any) => {
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

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }

  
  showSuccess() {
    this.toastr.successToastr('Producto agregado', 'Esta hecho!');
  }

  showAlarm(text: any) {
    this.toastr.warningToastr(text, 'Cuidado!');
  }

  ok(){
    this.router.navigate(['/admin/orders']);
  }

}
