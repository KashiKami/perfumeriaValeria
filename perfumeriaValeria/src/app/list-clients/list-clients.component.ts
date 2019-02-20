import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Client } from '../models/client';
import { ClientService } from '../services/client/client.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})


export class ListClientsComponent implements OnInit {

  clients: Client[] = [];

  headElements = ['Nombre', 'Apellido', 'Identificación', 'Correo'];

  constructor(private clientService: ClientService,
               private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.getClients();
    }, 200);
  }

  getClients(){
    this.clientService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
    });
  }

  delete (clients: any) {
    this.clientService.deleteClients(clients);
    setTimeout(() => {
      this.getClients();
    }, 200);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }
}
