import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { OrderProviderService } from '../services/orderProvider/order-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  
import { Provider } from '@angular/compiler/src/core';

@Component({
  selector: 'app-view-provider-order',
  templateUrl: './view-provider-order.component.html',
  styleUrls: ['./view-provider-order.component.scss']
})
export class ViewProviderOrderComponent implements OnInit {


  public products: Product[] = null;

  private order: any = {};

  private provider: Provider = null;

  headElements = ['Proveedor', 'Telefono'];

  constructor(private orderProviderService: OrderProviderService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    setTimeout(() => {
      this.getProducts();
    }, 100);
    setTimeout(() => {
    this.getProvider();
  }, 100);
  }

  getProducts(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.orderProviderService.getProducts(id).subscribe((data: Product[]) => {
      this.products = data;
    });
    
  }

  getProvider(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.orderProviderService.getProvider(id).subscribe((data: Provider) => {
      this.provider = data;
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
      var position = 10;  
      pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth-10, imgHeight-10)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
    
  }  

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }

}
