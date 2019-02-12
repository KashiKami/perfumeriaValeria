import { Component, OnInit, NgZone } from '@angular/core';
import { Provider } from '../models/provider';
import { ProviderService } from '../services/provider/provider.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})


export class ProviderListComponent implements OnInit {

  providers: Provider[] = [];

  headElements = ['Nombre', 'Telefono', 'Direccion', 'Correo'];

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

  delete (provider: any) {
    this.providerService.deleteProvider(provider);
    setTimeout(() => {
      this.getProviders();
    }, 200);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }
}
