import { Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { DOCUMENT } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from '../services/product/product.service';

import { HttpClient } from '@angular/common/http'
import { Product } from '../models/product';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  addForm: FormGroup;
  url = '';
  urlVideo = '';
  public myAngularxQrCode: string = null;
  selectFile: File = null;
  element: HTMLCollection;

  error: boolean = false;
  errorText: string = "";

  safeSrc: SafeResourceUrl = null;

  product: any = {};

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) document) {
  }


  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');
    this.element = document.getElementById('qr').children as HTMLCollection;


    this.addForm = this.formBuilder.group({
      "codeBar": [' ', Validators.required],
      "name": ['', Validators.required],
      "description": ['', Validators.required],
      "priceIn": ['', Validators.required],
      "priceOut": ['', Validators.required],
      "discount": ['', Validators.required],
      "photo": [''],
      "qr": [''],
      "video": [''],
      "email": ["hola@123"]
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
      this.productService.createProduct(this.addForm.value).subscribe((data: any) => {
        if (data.error && data.error != 'creado exitosamente') {
          this.error = true;
          this.errorText = data.error;
        } else if (data.error == 'creado exitosamente') {
          setTimeout(() => {
            this.router.navigate(['admin/products']);
          }, 500);
        }
      });
    } else {
      this.addForm.patchValue({ photo: this.url })
      this.productService.editProduct(this.addForm.value, id);
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

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }
}
