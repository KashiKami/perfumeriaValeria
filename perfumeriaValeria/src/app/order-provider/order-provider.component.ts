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

@Component({
  selector: 'app-order-provider',
  templateUrl: './order-provider.component.html',
  styleUrls: ['./order-provider.component.scss']
})
export class OrderProviderComponent implements OnInit {
  public products: Product[] = null;
  public availableProducts: Product[];

  public disable: boolean = false;

  addForm: FormGroup;

  asyncSelectedClient: string;
  dataSourceClient: Observable<any>;

  constructor(private orderService: OrderService,
              private clientService: ClientService,
              private productServie: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.dataSourceClient = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelectedClient);
    })
      .pipe(
        mergeMap((token: string) => this.getProvidersAsObservable(token))
      );
  }

  getProvidersAsObservable(token: string): Observable<any> {
    const query = new RegExp(token, 'i');
    return of(
      this.availableProducts.filter((state: any) => {
        return query.test(state.name);
      })
    );
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      "codeBar": ['', Validators.required],
      "amount": ['', Validators.required]
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
    this.orderService.getProducts(id).subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  getClients(): void {
    this.productServie.getProducts().subscribe((data: Product[]) => {
      this.availableProducts = data;
    });
  }

  delete(product: any) {
    this.orderService.deleteProduct(product);
    setTimeout(() => {
      this.getProducts();
    }, 100);
  }

  addProduct() {
    let id = this.route.snapshot.paramMap.get('id');
    this.orderService.addProduct(this.addForm.value, id);
    setTimeout(() => {
      this.getProducts();
    }, 100);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }


}
