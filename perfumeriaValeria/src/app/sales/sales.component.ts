import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportService } from '../services/report/report.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  products: any[] = null;
  TotalSale: any = null;
  headElements = ['Producto', 'Cantidad', 'Precio de Venta', 'Total'];
  date: any = {};

  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private reportService: ReportService) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      date: null,
      range: null,
      dateStart: null,
      dateFinish: null
    });
  }

  getProducts() {
    this.products = null;
    setTimeout(() => {
      this.reportService.getSales(this.myForm.value).subscribe((data: any) => {
        console.log(data);
      this.products = data;
    });
    }, 500);
  }

}

