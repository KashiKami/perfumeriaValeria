import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order/order.service';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-view-client-order',
  templateUrl: './view-client-order.component.html',
  styleUrls: ['./view-client-order.component.scss']
})
export class ViewClientOrderComponent implements OnInit {

  public products: Product[] = null;
  public client: any = null;
  public disable: boolean = false;

  constructor(private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute) {
  }


  ngOnInit() {

    setTimeout(() => {
      this.getProducts();
    }, 100);
  }

  getProducts(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.orderService.getProducts(id).subscribe((data: Product[]) => {
      this.products = data;
    });
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
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }  

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }

}
