import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportService } from '../services/report/report.service';
import { formatDate } from '@angular/common';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  products: any[] = null;
  TotalSale: any;
  
  headElements = ['Producto', 'Cliente','Precio de Venta', 'Cantidad', 'Total'];
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
    console.log(this.date.dateStart);
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

  public getReportPdf()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 20;  
      pdf.addImage(contentDataURL, 'PNG', 20, position, imgWidth, imgHeight)  
      pdf.save('ventas.pdf'); // Generated PDF   
    });  
  }  

}

