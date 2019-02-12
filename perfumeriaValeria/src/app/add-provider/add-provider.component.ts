import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../services/provider/provider.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.scss']
})
export class AddProviderComponent implements OnInit {

  addForm: FormGroup;

  constructor(private providerService: ProviderService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let email = this.route.snapshot.paramMap.get('email');

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
        this.addForm.patchValue({ password: ''})
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
