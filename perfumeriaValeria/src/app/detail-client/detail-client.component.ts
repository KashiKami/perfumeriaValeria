import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../services/provider/provider.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from '../models/user';
import { CategoryService } from '../services/category/category.service';


@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss']
})
export class DetailClientComponent implements OnInit {

  addForm: FormGroup;

  currentUser: User;
  currentOrder: any;

  public categories: any[] = null;
  public subCategories: any[] = null;

  constructor(private providerService: ProviderService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService) { }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentOrder = JSON.parse(localStorage.getItem('currentOrder'));

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

    this.getCategories();

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

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }

}
