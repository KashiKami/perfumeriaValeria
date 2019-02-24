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

  aux: any = {};

  asyncSelectedClient: string;
  dataSourceClient: Observable<any>;

  headElements = ['#', 'Nombre Cliente', 'Telefono Cliente', 'Valor', 'Estado', 'Fecha', ];

  addForm: FormGroup;

  constructor(private orderService: OrderService,
              private clientService: ClientService,
              private formBuilder: FormBuilder,
              private router: Router,
              private productInventoryService: ProducInventoryService) {
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
      "date": ['', Validators.required]
    });

      this.getOrders();

    setTimeout(() => {
      this.getClients();
    }, 100);
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
        this.error = true;
        this.errorText = data.error;
      } else if (data.error == 'creado exitosamente') {
        console.log("creado exitosamente")
        this.router.navigate(['admin/orders/edit-order/' + this.aux.idOrder]);
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

  closeAlert() {
    this.error = false;
  }
}
