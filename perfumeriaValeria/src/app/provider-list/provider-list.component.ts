import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Provider } from '../models/provider';
import { ProviderService } from '../services/provider/provider.service';
@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})


export class ProviderListComponent implements OnInit {
  providers: Provider[] = [];

  headElements = ['Nombre', 'Identificación', 'Correo', 'Telefono'];

  constructor(private providerService: ProviderService,
               private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.getProviders();
    }, 200);
  }

  getProviders(){
    this.providerService.getProviders().subscribe((data: Provider[]) => {
      this.providers = data;
    });
  }

  delete (clients: any) {
    this.providerService.deleteProvider(clients);
    setTimeout(() => {
      this.getProviders();
    }, 200);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }

}
