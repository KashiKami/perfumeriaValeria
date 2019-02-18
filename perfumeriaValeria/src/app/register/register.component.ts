import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl } from "@angular/forms";
import { ClientService } from '../services/client/client.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  addForm: FormGroup;

  constructor(private clientService: ClientService) { }

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
  }

  onSubmit() {
    this.clientService.createClient(this.addForm.value);
  }
}
