import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { OrderService } from '../services/order/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductProviderService } from '../services/productoprovider/product-provider.service';
import { ProductProvider } from '../models/productprovider';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { OrderProviderService } from '../services/orderProvider/order-provider.service';
import { Product } from '../models/product';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-list-product-provider',
  templateUrl: './list-product-provider.component.html',
  styleUrls: ['./list-product-provider.component.scss']
})
export class ListProductProviderComponent implements OnInit {
  addForm: FormGroup;
  formBuilder: FormBuilder;
  products: any[];
  allProducts: any[];
  currentUser: User;
  currentOrder: any;
  order: any = {};
  id: any;
  error: boolean = false;
  errorText: string = "";
  aux: any = {};

  constructor(private router: Router,
    private productProviderService: ProductProviderService,
    private orderProviderService: OrderProviderService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.formBuilder = new FormBuilder();
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.addForm = this.formBuilder.group({
      'codeBar': ['', Validators.required],
      'amount': ['', Validators.required],
      'priceIn': ['', Validators.required],

    });
  }

  onSubmit() {
    let myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.addForm.patchValue({ date: myDate })
    let id = this.route.snapshot.params.id;
    this.orderProviderService.addProduct(this.addForm.value, id).subscribe((data: any) => {
      this.productProviderService.removeProduct(this.addForm.value);
      if (data.error && data.error != 'creado exitosamente') {
        this.error = true;
        this.errorText = data.error;
      } else if (data.error == 'creado exitosamente') {
        //this.productProviderService.removeProduct(this.order);
        console.log("creado exitosamente")
        this.router.navigate(['admin/orders/edit-order/' + this.aux.idOrder]);
      }
    });
    this.getProducts();
  }

  ngOnInit() {
    let myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.addForm.patchValue({ date: myDate })
    this.getAllProducts();
    this.getProducts();
  }




  getProducts(): void {
    this.productProviderService.getProducts(this.id).subscribe((data: ProductProvider[]) => {
      this.products = data;
    });
  }


  getAllProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.allProducts = data;
    });
  }

  addProduct() {
    let id = this.route.snapshot.paramMap.get('id');
    this.orderProviderService.addProduct(this.addForm.value, id);
    setTimeout(() => {
      this.getProducts();
    }, 100);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}