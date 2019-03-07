import { Component, OnInit, NgZone } from '@angular/core';
import { Provider } from '../models/provider';
import { ProviderService } from '../services/provider/provider.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import * as moment from 'moment';
import * as esLocale from 'date-fns/locale/es';
import { OrderProviderService } from '../services/orderProvider/order-provider.service';
import { OrderProvider } from '../models/orderProvider';
import { formatDate } from '@angular/common';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})


export class ProviderListComponent implements OnInit {
  addForm: FormGroup;
  formBuilder: FormBuilder;
  providers: Provider[] = [];
  orders: OrderProvider[] = [];
  providersFilter: OrderProvider[] = [];
  formFilter:FormGroup;
  error: boolean = false;
  errorText: string = "";
  aux: any = {};
  headElements = ['Identificador','Nombre','Correo','Fecha'];
  filtroFechas: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'YYYY-MM-DD',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: esLocale,
    maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Filtro por fechas', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };
  
  constructor(private orderProviderService :OrderProviderService,
               private router: Router) {
                 this.formBuilder=new FormBuilder();
               
                this.formFilter=new FormGroup({
                  'nombre': new FormControl(''),
                  'fecha':new FormControl('')

                });
  (<FormControl>this.formFilter.get('nombre')).valueChanges.subscribe(()=>{
    this.filterData();
  });
  (<FormControl>this.formFilter.get('fecha')).valueChanges.subscribe((value)=>{
    const date=moment(value).format('YYYY-MM-DD');
    this.formFilter.value['fecha']=date;
    this.filterData();
  });
  

                }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      "idOrder": ['', Validators.required],
      "email": ['', Validators.required],
      "date": ['', Validators.required]
    });

      this.getOrders();
      this.getProviders();
    setTimeout(() => {
      this.getProviders();
    }, 200);
  }

  getProviders(){
    this.orderProviderService.getProviders().subscribe((data: Provider[]) => {
      
      this.providers = data;
      this.filterData();
    });
  }
  getOrders(): void {

    this.orderProviderService.getOrders().subscribe((data: OrderProvider[]) => {
      this.orders = data;
      });

  }
  

  //delete (provider: any) {
    //this.orderProviderService.deleteProvider(provider);
    //setTimeout(() => {
      //this.getProviders();
    //}, 200);
  //}

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }
  filterData(){
    const filter= this.formFilter.value;
    this.providersFilter=[];
    console.log(filter);
    for (const provider of this.orders) {
      let add=true;
      if (filter.nombre != '') {
        const fullName:string=provider.name+' '+provider.lastName;
        if (fullName.indexOf(filter.nombre)<0) {
          add=false;
        }
      }
      if (filter.fecha != '') {
        if(typeof filter.fecha != 'string'){
          const date=moment(filter.fecha).format('YYYY-MM-DD');
          filter.fecha = date;
        }
        if (provider.date!=filter.fecha) {
        add=false;
        }
      }
      if(add){
        this.providersFilter.push(provider);
      }
    }
  }

  onSubmit() {
    let myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.addForm.patchValue({ date: myDate })
    this.orderProviderService.addOrder(this.addForm.value).subscribe((data: any) => {
      if (data.error && data.error != 'creado exitosamente') {
        this.error = true;
        this.errorText = data.error;
      } else if (data.error == 'creado exitosamente') {
        console.log("creado exitosamente")
        this.router.navigate(['admin/orders/edit-order/' + this.aux.idOrder]);
      }
    });


   this.getOrders();

    this.addForm = this.formBuilder.group({
      'idOrder': ['', Validators.required],
      'email': ['', Validators.required],
      'date': ['', Validators.required]
    });
  }

}
