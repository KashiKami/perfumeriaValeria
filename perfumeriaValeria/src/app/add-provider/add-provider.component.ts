import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../services/provider/provider.service';
import {FormGroup, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.scss']
})
export class AddProviderComponent implements OnInit {

  addForm: FormGroup;

  constructor(private providerService: ProviderService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let email = this.route.snapshot.paramMap.get('email');

    this.addForm = new FormGroup({

      'email': new FormControl('', [Validators.required,Validators.email]),
      'name': new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      'lastName': new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      'password': new FormControl('', [Validators.required]),
      'direction': new FormControl('', [Validators.required]),
      'phone':  new FormControl('', [Validators.required,Validators.pattern('[0-9]*')]),
      'identify': new FormControl('', [Validators.required,Validators.pattern('[0-9]*')]),
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
