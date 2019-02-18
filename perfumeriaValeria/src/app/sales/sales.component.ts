import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportService } from '../services/report/report.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  products: any[] = null;
  TotalSale: any;
  
  headElements = ['Producto', 'Cantidad', 'Precio de Venta', 'Total'];
  date: any = {};

  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private reportService: ReportService) { }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      date: null,
      range: null,
      dateStart: '',
      dateFinish: ''
    });
  }

  getProducts() {
    this.date.dateStart = formatDate(this.myForm.value.range[0], 'yyyy-MM-dd', 'en');
    this.date.dateFinish = formatDate(this.myForm.value.range[1], 'yyyy-MM-dd', 'en');
    this.products = null;
    setTimeout(() => {
      this.reportService.getSales(this.date).subscribe((data: any) => {
        this.products = data;
      });
    }, 200);
    setTimeout(() => {
      this.reportService.getPriceSales(this.date).subscribe((data: any) => {
        this.TotalSale = data;
      });
    }, 200);
  }

}

