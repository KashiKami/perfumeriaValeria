import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl } from "@angular/forms";
import { ClientService } from '../services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category/category.service';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  addForm: FormGroup;
  error: boolean = false;
  errorText: string = "";

  public categories: any[] = null;
  public subCategories: any[] = null;


  constructor(private clientService: ClientService,
              private router: Router,
              private categoryService: CategoryService,
              public toastr: ToastrManager) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      'email': new FormControl('', [Validators.required,Validators.email]),
      'name': new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      'lastName': new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      'password': new FormControl('', [Validators.required]),
      'direction': new FormControl('', [Validators.required]),
      'phone':  new FormControl('', [Validators.required,Validators.pattern('[0-9]*')]),
      'identify': new FormControl('', [Validators.required,Validators.pattern('[0-9]*')]),
    });

    this.getCategories();
  }

  onSubmit() {
    this.clientService.createClient(this.addForm.value).subscribe((data: any) => {
      if (data.error && data.error != 'creado exitosamente') {
        this.showAlert(data.error);
      } else if (data.error == 'creado exitosamente') {
        this.showSuccess();
        this.router.navigate(['/login']);
      }
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

  closeAlert() {
    this.error = false;
  }

  showSuccess() {
    this.toastr.successToastr('Registro completo', 'Esta hecho!');
  }

  showAlert(text: any) {
    this.toastr.warningToastr(text, 'Cuidado!');
  }
}
