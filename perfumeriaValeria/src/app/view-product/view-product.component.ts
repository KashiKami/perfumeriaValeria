import { Component, OnInit,OnDestroy } from '@angular/core';
import { User } from '../models/user';
import { ProductService } from '../services/product/product.service';
import { Product } from '../models/product';
import { Router, ActivatedRoute,NavigationEnd } from "@angular/router";
import { ClientService } from '../services/client/client.service';
import { CategoryService } from '../services/category/category.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit, OnDestroy {

  currentUser: User;
  currentOrder: any;
  product: any = {};
  productAdd: any = {};

  navigationSubscription;

  public categories: any[] = null;
  public subCategories: any[] = null;

  public products: Product[] = null;

  constructor(private router: Router,
              private productService: ProductService,
              private route: ActivatedRoute,
              private clienService: ClientService,
              private categoryService: CategoryService,
              public toastr: ToastrManager) { 
                this.navigationSubscription = this.router.events.subscribe((e: any) => {
                  // If it is a NavigationEnd event re-initalise the component
                  if (e instanceof NavigationEnd) {
                    let id = this.route.snapshot.paramMap.get('id');
                    this.productService.getOneProduct(id).subscribe(data => {
                      this.product = data;
                    })
                  }
                });
              }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentOrder = JSON.parse(localStorage.getItem('currentOrder'));

    this.getCategories();
    this.getProducts();

    this.productService.getOneProduct(id).subscribe(data => {
      this.product = data;
    })
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  addProduct() {
    this.productAdd.codeBar = this.product.codeBar;
      this.clienService.addProduct(this.productAdd, this.currentOrder.id).subscribe((data: any) => {
        if (data.error && data.error != 'creado exitosamente') {
          this.showAlarm(data.error);
        } else if (data.error == 'creado exitosamente') {
          setTimeout(() => {
            this.showSuccess();
            this.router.navigate(['/order']);
          }, 500);
        }
      });
  }

  getProducts(): void {
    this.productService.getProductsInventory().subscribe((data: Product[]) => {
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

  showSuccess() {
    this.toastr.successToastr('Producto agregado.', 'Esta hecho!');
  }

  showAlarm(text: any) {
    this.toastr.warningToastr(text, 'Cuidadado!');
  }


  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }
}
