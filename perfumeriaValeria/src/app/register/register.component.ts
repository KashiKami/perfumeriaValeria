import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClientService } from '../services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private router: Router,) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      "email": ['', Validators.required],
      "name": ['', Validators.required],
      "lastName": ['', Validators.required],
      "password": ['', Validators.required],
      "direction": ['', Validators.required],
      "phone": ['', Validators.required],
      "identify": ['', Validators.required]
    });
  }

  onSubmit() {
    this.clientService.createClient(this.addForm.value);
    this.router.navigate(['/login']);
  }
}
