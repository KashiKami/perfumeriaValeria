import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';  
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Product } from '../models/product';
import { Provider } from '../models/provider';
import { Router } from '@angular/router';
import { ProviderService } from '../services/provider/provider.service';
import { ProducInventoryService } from '../services/productInventory/produc-inventory.service';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  public products: Product[];
  public productsAmount: Product[] = null;
  providers: Provider[] = [];

  asyncSelected: string;
  dataSource: Observable<any>;

  asyncSelectedProvider: string;
  dataSourceProvider: Observable<any>;

  addForm: FormGroup;


  headElements = ['Producto', 'Nombre Proveedor', 'Telefono Proveedor', 'Cantidad'];

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              private producInventiryServide: ProducInventoryService,
              private providerService: ProviderService,
              private router: Router
              ) {
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
