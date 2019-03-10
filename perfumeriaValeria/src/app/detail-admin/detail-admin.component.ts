import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';
import { ProviderService } from '../services/provider/provider.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-admin',
  templateUrl: './detail-admin.component.html',
  styleUrls: ['./detail-admin.component.scss']
})
export class DetailAdminComponent implements OnInit {

  addForm: FormGroup;

  currentUser: User;

  constructor(private providerService: ProviderService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let email = this.currentUser.email;

    this.addForm = this.formBuilder.group({
      "email": ['', Validators.required],
      "name": ['', Validators.required],
      "lastName": ['', Validators.required],
      "password": ['', Validators.required],
      "direction": ['', Validators.required],
      "phone": ['', Validators.required],
      "identify": ['', Validators.required]
    });

    if (email != null) {
      this.providerService.getOneProvider(email).subscribe(data => {
        this.addForm.setValue(data);
        this.addForm.patchValue({ password: '' });
      })
    }


  }

  onSubmit() {
    let email = this.route.snapshot.paramMap.get('email');
    if (email != null) {
      this.providerService.editProvider(this.addForm.value, email);
    } else {
      this.providerService.createProvider(this.addForm.value);
    }
    this.router.navigate(['admin/providers']);
  }


  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }
}
