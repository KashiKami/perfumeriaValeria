import { Component, OnInit, Directive } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product/product.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProducInventoryService } from '../services/productInventory/produc-inventory.service';

import { Observable, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { mergeMap } from 'rxjs/operators';
import { Provider } from '../models/provider';
import { ProviderService } from '../services/provider/provider.service';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {

  asyncSelected: string;
  dataSource: Observable<any>;

  asyncSelectedProvider: string;
  dataSourceProvider: Observable<any>;

  public products: Product[];
  public productsAmount: Product[];
  providers: Provider[] = [];

  headElements = ['Nombre Producto', 'Cantidad'];

  addForm: FormGroup;

  format(price: number) {
    return price.toLocaleString('es-CO', { currency: 'COP', style: 'currency' });
  }

  constructor(private productService: ProductService,
    private formBuilder: FormBuilder,
    private producInventiryServide: ProducInventoryService,
    private providerService: ProviderService,
    private router: Router) {

    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    })
      .pipe(
      mergeMap((token: string) => this.getProductsAsObservable(token))
    );

    this.dataSourceProvider = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelectedProvider);
    })
      .pipe(
      mergeMap((token: string) => this.getProvidersAsObservable(token))
      );

  }

  getProductsAsObservable(token: string): Observable<any> {
    const query = new RegExp(token, 'i');
    return of(
      this.products.filter((state: any) => {
        return query.test(state.name);
      })
    );
  }

  getProvidersAsObservable(token: string): Observable<any> {
    const query = new RegExp(token, 'i');
    return of(
      this.providers.filter((state: any) => {
        return query.test(state.name);
      })
    );
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      "codeBar": ['', Validators.required],
      "amount": ['', Validators.required],
      "email": ['', Validators.required]
    });
    setTimeout(() => {
      this.getProducts();
    }, 100);

    setTimeout(() => {
      this.getProductsAmount();
    }, 100);

    setTimeout(() => {
      this.getProviders();
    }, 100);
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  getProductsAmount(): void {
    this.producInventiryServide.getProducts().subscribe((data: Product[]) => {
      this.productsAmount = data;
    });
  }

  delete(product: any) {
    this.productService.deleteProduct(product);
    setTimeout(() => {
      this.getProducts();
    }, 100);
  }

  getProviders() {
    this.providerService.getProviders().subscribe((data: Provider[]) => {
      this.providers = data;
    });
  }

  onSubmit() {
    this.producInventiryServide.addProduct(this.addForm.value);

    setTimeout(() => {
      this.getProductsAmount();
    }, 100);

    this.addForm = this.formBuilder.group({
      "codeBar": ['', Validators.required],
      "amount": ['', Validators.required],
      "email": ['', Validators.required]
    });
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }
}
