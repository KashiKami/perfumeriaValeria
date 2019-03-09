import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/user/authentication.service';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/client/client.service';
import { formatDate } from '@angular/common';
import { CategoryService } from '../services/category/category.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('alert') alert: ElementRef;

  loginForm: FormGroup;
  currentUser: User;
  order: any = {};

  login: boolean = true;

  error: boolean = false;
  textError: string = "";

  public categories: any[] = null;
  public subCategories: any[] = null;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private clientService: ClientService,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              public toastr: ToastrManager) { }

  ngOnInit() {
    let state = this.route.snapshot.paramMap.get('state');
    this.getCategories();
    if (state) {
      this.error = true;
      this.textError = "creado exitosamente";
    }

    this.loginForm =  new FormGroup({
      'email': new FormControl('', [Validators.required,Validators.email]),
      'password': new FormControl('', [Validators.required])
    });

  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {

      return;
    }

    this.authenticationService.login(this.loginForm.value).subscribe((data: any) => {
      if (data.email) {
        this.showSuccess(data.name);
        localStorage.setItem('currentUser', JSON.stringify(data));
      } else if (data.error) {
        this.showAlarm(data.error);
      }

    });

    setTimeout(() => {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      if (this.currentUser != null) {

        if (this.currentUser.typeUser == 'A') {
        this.router.navigate(['admin/products']);
        } else if (this.currentUser.typeUser == 'P') {
          this.router.navigate(['provider']);
        } else if (this.currentUser.typeUser == 'C') {
          let myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
          this.order.date = myDate;
          console.log(this.order);
          this.clientService.createOrderClient(this.order);
          this.router.navigate(['viewClient']);
        }
      }
      else{
        this.login = false;
      }
    }
      , 500);
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

  closeAlert() {
    this.error = false;
  }

  showSuccess(text: any) {
    this.toastr.successToastr('Disfruta de nuesta tienda', 'Bienvenido '+ text);
  }

  showAlarm(text: any) {
    this.toastr.warningToastr(text, 'Cuidado!');
  }

}
