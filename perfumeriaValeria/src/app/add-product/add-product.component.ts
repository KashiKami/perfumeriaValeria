import { Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { DOCUMENT } from '@angular/common';

import { mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';  

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from '../services/product/product.service';

import { HttpClient } from '@angular/common/http'
import { Product } from '../models/product';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CategoryService } from '../services/category/category.service';
import { User } from '../models/user';

import { ToastrManager } from 'ng6-toastr-notifications';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  addForm: FormGroup;
  addCategoryForm: FormGroup;

  url = '';
  urlVideo = '';
  public myAngularxQrCode: string = null;
  selectFile: File = null;
  element: HTMLCollection;

  error: boolean = false;
  errorText: string = "";

  safeSrc: SafeResourceUrl = null;

  headElements = ['#', 'Categoria'];

  product: any = {};

  public categories: any[] = null;

  currentUser: User;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private categoryService: CategoryService,
    public toastr: ToastrManager) {
  }

  getProductsAsObservable(token: string): Observable<any> {
    const query = new RegExp(token, 'i');
    return of(
      this.categories.filter((state: any) => {
        return query.test(state.name);
      })
    );
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((data: Product[]) => {
      this.categories = data;
    });
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let id = this.route.snapshot.paramMap.get('id');
    this.element = document.getElementById('qr').children as HTMLCollection;

    setTimeout(() => {
      this.getCategories();
    }, 100);


    this.addForm = this.formBuilder.group({
      "codeBar": [' ', Validators.required],
      "name": ['', Validators.required],
      "description": ['', Validators.required],
      "ganancy": ['', Validators.required],
      "discount": ['', Validators.required],
      "category": ['', Validators.required],
      "photo": [''],
      "qr": [''],
      "video": [''],
      "email": [''],
      "priceIn": ['']
    });

    this.addCategoryForm = this.formBuilder.group({
      "name": ['', Validators.required],
      "superCategory": ['', Validators.required]
    });

    if (id != null) {
      this.productService.getOneProduct(id).subscribe(data => {
        let product = new Product(data);
        this.url = product.photo;
        this.addForm.setValue(data);
        this.loadVideo();
      })
    }

  }



  onSubmit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      this.addForm.patchValue({ photo: this.url })
      this.addForm.patchValue({ qr: this.element[1].getAttribute('src') });
      this.addForm.patchValue({ email:  this.currentUser.email});
      this.productService.createProduct(this.addForm.value).subscribe((data: any) => {
        if (data.error && data.error != 'creado exitosamente') {
          this.showAlarm(data.error);
        } else if (data.error == 'creado exitosamente') {
          this.showSuccess();
          setTimeout(() => {
            this.router.navigate(['admin/products']);
          }, 500);
        }
      });
    } else {
      this.addForm.patchValue({ photo: this.url })
      this.productService.editProduct(this.addForm.value, id);
      setTimeout(() => {
        this.router.navigate(['admin/products']);
      }, 500);
    }
    

  }

  onKey(event: any) {
    this.myAngularxQrCode = event.targetr.value;
  }

  onSelectFile(event) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;

      }
    }
  }

  onSelectFileVideo(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.urlVideo = event.target.result;
      }
    }
  }

  loadVideo() {
    let auxUrl = "https://www.youtube.com/embed/" + this.product.video.substring(32, this.product.video.length);
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(auxUrl);
  }

  closeAlert() {
    this.error = false;
  }

  addCategory() {
    console.log(this.addCategoryForm.value);
    this.categoryService.addCategory(this.addCategoryForm.value).subscribe((data: any) => {
      if (data.error == 'creado exitosamente') {
        this.getCategories();
      }
    });
  }

  deleteCategory(category: any) {
    console.log(category);

    this.categoryService.deleteCategory(category);
    setTimeout(() => {
    this.getCategories();
  }, 500);
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
}
