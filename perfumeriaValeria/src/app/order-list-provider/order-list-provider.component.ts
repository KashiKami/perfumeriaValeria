import { Component, OnInit, Provider } from '@angular/core';
import { Order } from '../models/order';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderProviderService } from '../services/orderProvider/order-provider.service';
import { ProviderService } from '../services/provider/provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-order-list-provider',
  templateUrl: './order-list-provider.component.html',
  styleUrls: ['./order-list-provider.component.scss']
})
export class OrderListProviderComponent implements OnInit {
  public orders: Order[] = null;
  public providers: Provider[];

  error: boolean = false;
  errorText: string = "";

  order: any = {};

  aux: any = {};

  daterangepickerModel: Date[];

  headElements = ['#', 'Nombre Proveedor', 'Telefono Proveedor', 'Valor', 'Fecha', ];

  addForm: FormGroup;


  constructor(private orderProviderService: OrderProviderService,
              private providerSerice: ProviderService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              public toastr: ToastrManager) {
  }


  ngOnInit() {

    this.addForm = this.formBuilder.group({
      "idOrder": ['', Validators.required],
      "email": ['', Validators.required],
      "date": ['', Validators.required]
    });

    this.getOrders();

    this.orderProviderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
      let email = this.route.snapshot.paramMap.get('email');

      if (email != null) {
        this.orders = this.orders.filter(order => order.email == email);
      }
    });

    setTimeout(() => {
      this.getClients();
    }, 100);
  }

  onKey(event: any) { // without type info
    let name = event.target.value;
    if (name != '') {
      this.orders = this.orders.filter(order => order.name.toUpperCase().includes(name.toUpperCase()));
    } else {
      console.log("hola");
      this.getOrders();
    }
  }

  handler(): void {
    this.orders = this.orders.filter(order => 
      this.daterangepickerModel[0].getTime() <= new Date(order.date).getTime() && this.daterangepickerModel[1].getTime() > new Date(order.date).getTime());
  }

  getOrders(): void {
    this.orderProviderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }

  getClients(): void {
    this.providerSerice.getProviders().subscribe((data: Provider[]) => {
      this.providers = data;
    });
  }

  delete(order: any) {
    this.orders = null;
  this.orderProviderService.deleteOrder(order);
  setTimeout(() => {
    this.getOrders();
  }, 100);
  }

  onSubmit() {
    let myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.addForm.patchValue({ date: myDate })
    this.orderProviderService.addOrder(this.addForm.value).subscribe((data: any) => {
      if (data.error && data.error != 'creado exitosamente') {
        this.error = true;
        this.errorText = data.error;
      } else if (data.error == 'creado exitosamente') {
        this.showSuccess();
        this.router.navigate(['admin/orderProvider/edit-order/' + this.aux.idOrder]);
      }
    });


   this.getOrders();

    this.addForm = this.formBuilder.group({
      "idOrder": ['', Validators.required],
      "email": ['', Validators.required],
      "date": ['', Validators.required]
    });
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
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

  closeAlert() {
    this.error = false;
  }

  showSuccess() {
    this.toastr.successToastr('Pedido creado.', 'Esta hecho!');
  }

}
