import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/user/authentication.service';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/client/client.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  currentUser: User;
  order: any = {};

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private clientService: ClientService) { }

  ngOnInit() {
    this.loginForm =  new FormGroup({
      'email': new FormControl('', [Validators.required,Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)])
    });

  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.loginForm.value);

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
          this.clientService.createOrderClient(this.order);
          this.router.navigate(['viewClient']);
        }
      }
    }
      , 500);
  }

}
