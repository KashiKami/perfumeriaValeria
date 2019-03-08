import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgDatepickerModule } from 'ng2-datepicker';

import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { AppRoutingModule } from './app-routing.module';
import { routingModule } from './app-routing.module';
import { AddProductComponent } from './add-product/add-product.component'

import { FileSelectDirective } from 'ng2-file-upload';
import { AddProviderComponent } from './add-provider/add-provider.component';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { ViewProductComponent } from './view-product/view-product.component';

import { QRCodeModule } from 'angularx-qrcode';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './services/user/authentication.service';
import { ViewProviderComponent } from './view-provider/view-provider.component';
import { ViewClientComponent } from './view-client/view-client.component';
import { OrderClientComponent } from './order-client/order-client.component';
import { OrderListClientComponent } from './order-list-client/order-list-client.component';
import { DetailOrderClientComponent } from './detail-order-client/detail-order-client.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SalesComponent } from './sales/sales.component';
import { ListClientsComponent } from './list-clients/list-clients.component';

import { ListProductProviderComponent } from './list-product-provider/list-product-provider.component';

import { CategoryClientComponent } from './category-client/category-client.component';
import { ReportGanancyComponent } from './report-ganancy/report-ganancy.component';
import { OrderProviderComponent } from './order-provider/order-provider.component';

import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewClientOrderComponent } from './view-client-order/view-client-order.component';
import { OrderListProviderComponent } from './order-list-provider/order-list-provider.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    OrderListComponent,
    ProviderListComponent,
    AddProductComponent,
    FileSelectDirective,
    AddProviderComponent,
    ViewProductComponent,
    LoginComponent,
    RegisterComponent,
    AddOrderComponent,
    ViewProviderComponent,
    ViewClientComponent,
    OrderClientComponent,
    OrderListClientComponent,
    DetailOrderClientComponent,
    DetailClientComponent,
    InventoryComponent,
    SalesComponent,
    ListClientsComponent,
    ListProductProviderComponent,
    CategoryClientComponent,
    ReportGanancyComponent,
    ViewClientOrderComponent,
    OrderProviderComponent,
    OrderListProviderComponent

  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    routingModule,
    HttpClientModule,
    ReactiveFormsModule,
    QRCodeModule,
    NgxTypeaheadModule,
    TypeaheadModule.forRoot(),
    FormsModule,
    BsDatepickerModule.forRoot(),
    NgDatepickerModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthGuard, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
