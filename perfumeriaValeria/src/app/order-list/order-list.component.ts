import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order/order.service';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Client } from '../models/client';
import { ClientService } from '../services/client/client.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import { ProducInventoryService } from '../services/productInventory/produc-inventory.service';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {


  public orders: Order[] = null;
  public clients: Client[];

  error: boolean = false;
  errorText: string = "";

  order: any = {};

  text: any = {};

  public print: boolean = false;

  daterangepickerModel: Date[];

  asyncSelectedClient: string;
  dataSourceClient: Observable<any>;

  headElements = ['#', 'Nombre Cliente', 'Telefono Cliente', 'Valor', 'Estado', 'Fecha', ];

  addForm: FormGroup;


  constructor(private orderService: OrderService,
              private clientService: ClientService,
              private formBuilder: FormBuilder,
              private router: Router,
              private productInventoryService: ProducInventoryService,
              private route: ActivatedRoute,
              public toastr: ToastrManager) {

    this.dataSourceClient = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelectedClient);
    })
      .pipe(
        mergeMap((token: string) => this.getProvidersAsObservable(token))
      );
  }

  getProvidersAsObservable(token: string): Observable<any> {
    const query = new RegExp(token, 'i');
    return of(
      this.clients.filter((state: any) => {
        return query.test(state.name);
      })
    );
  }


  ngOnInit() {

    this.addForm = this.formBuilder.group({
      "idOrder": ['', Validators.required],
      "email": ['', Validators.required],
      "date": ['']
    });

    this.getOrders();

    this.orderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
      let email = this.route.snapshot.paramMap.get('email');

      if (email != null) {
        this.orders = this.orders.filter(order => order.email == email);
        this.text.name = this.orders[0].name;
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
      setTimeout(() => {
      this.getOrders();
    }, 100);
    }
  }

  handler(): void {
    this.orders = this.orders.filter(order => 
      this.daterangepickerModel[0].getTime() <= new Date(order.date).getTime() && this.daterangepickerModel[1].getTime() > new Date(order.date).getTime());
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }

  getClients(): void {
    this.clientService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
    });
  }

  delete(order: any) {
    this.orders = null;
  this.orderService.deleteOrder(order);
  setTimeout(() => {
    this.getOrders();
  }, 100);
  }

  onSubmit() {
    let myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.addForm.patchValue({ date: myDate })
    this.orderService.addOrder(this.addForm.value).subscribe((data: any) => {
      if (data.error && data.error != 'creado exitosamente') {
        this.showAlarm(data.error);
      } else if (data.error == 'creado exitosamente') {
        this.showSuccess();
        setTimeout(() => {
          this.router.navigate(['admin/orders/edit-order/' + this.addForm.value.idOrder]);
        }, 100);
      } 
    });


   this.getOrders();
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }

  edit(state: any, id: any) {
    this.orders = null;
    this.order.id = id;
    this.order.state = state;
    this.orderService.editOrder(this.order);
    if (state == 'D') {
      this.productInventoryService.removeProduct(this.order);
    }
    setTimeout(() => {
      this.getOrders();
    }, 100);
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

  closeAlert() {
    this.error = false;
  }

  showSuccess() {
    this.toastr.successToastr('Producto agregado', 'Esta hecho!');
  }

  showAlarm(text: any) {
    this.toastr.warningToastr(text, 'Cuidado!');
  }
}
