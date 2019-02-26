import { Component, OnInit, NgZone } from '@angular/core';
import { Provider } from '../models/provider';
import { ProviderService } from '../services/provider/provider.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import * as moment from 'moment';
import * as esLocale from 'date-fns/locale/es';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})


export class ProviderListComponent implements OnInit {

  providers: Provider[] = [];
  providersFilter: Provider[] = [];
  formFilter:FormGroup;
  headElements = ['Nombre', 'Identificación','Correo','Dirección', 'Telefono', 'Total','Fecha'];
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
  
  constructor(private providerService: ProviderService,
               private router: Router) {
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
    setTimeout(() => {
      this.getProviders();
    }, 200);
  }

  getProviders(){
    this.providerService.getProviders().subscribe((data: Provider[]) => {
      
      this.providers = data;
      this.filterData();
    });
  }

  delete (provider: any) {
    this.providerService.deleteProvider(provider);
    setTimeout(() => {
      this.getProviders();
    }, 200);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }
  filterData(){
    const filter= this.formFilter.value;
    this.providersFilter=[];
    console.log(filter);
    for (const provider of this.providers) {
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

}
