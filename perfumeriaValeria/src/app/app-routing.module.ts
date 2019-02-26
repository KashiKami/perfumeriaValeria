import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { ProductListComponent } from './product-list/product-list.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ListProductProviderComponent } from './list-product-provider/list-product-provider.component';
import { AddProviderComponent } from './add-provider/add-provider.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { AuthGuard as AuthGuard } from './auth.guard';
import { AuthGuardProvider as AuthGuardProvider } from './auth.guardProvider';
import { AuthGuardLogin as AuthGuardLogin } from './auth.guardLogin';
import { AuthGuardClient as AuthGuardClient } from './auth.guardClient';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewClientComponent } from './view-client/view-client.component';
import { ViewProviderComponent } from './view-provider/view-provider.component';
import { OrderClientComponent } from './order-client/order-client.component';
import { OrderListClientComponent } from './order-list-client/order-list-client.component';
import { DetailOrderClientComponent } from './detail-order-client/detail-order-client.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SalesComponent } from './sales/sales.component';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { CategoryClientComponent } from './category-client/category-client.component';

const routes: Routes = [
  { path: 'admin/products', component: ProductListComponent, canActivate: [AuthGuard]},
  { path: 'admin/products/add-product', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'admin/products/edit-product/:id', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'admin/productProvider/view-products/:email/:date', component: ListProductProviderComponent, canActivate: [AuthGuard] },

  { path: 'admin/inventory', component: InventoryComponent, canActivate: [AuthGuard] },

  { path: 'admin/sales', component: SalesComponent, canActivate: [AuthGuard] },

  { path: 'admin/providers', component: ProviderListComponent, canActivate: [AuthGuard] },
  { path: 'admin/providers/add-provider', component: AddProviderComponent, canActivate: [AuthGuard] },
  { path: 'admin/providers/edit-provider/:email', component: AddProviderComponent, canActivate: [AuthGuard] },

  { path: 'admin/orders', component: OrderListComponent, canActivate: [AuthGuard]},
  { path: 'admin/orders/edit-order/:id', component: AddOrderComponent, canActivate: [AuthGuard] },

  { path: 'admin/clients', component: ListClientsComponent, canActivate: [AuthGuard] },

  { path: 'provider', component: ViewProviderComponent, canActivate: [AuthGuardProvider] },

  { path: '', component: ViewClientComponent },
  { path: 'product/:id', component: ViewProductComponent },

  { path: 'order', component: OrderClientComponent, canActivate: [AuthGuardClient] },
  { path: 'orders', component: OrderListClientComponent, canActivate: [AuthGuardClient] },
  { path: 'orders/:id', component: DetailOrderClientComponent, canActivate: [AuthGuardClient] },

  { path: 'category/:id', component: CategoryClientComponent, runGuardsAndResolvers: "paramsChange" },

  { path: 'login', component: LoginComponent, canActivate: [AuthGuardLogin] },
  { path: 'login/:state', component: LoginComponent, canActivate: [AuthGuardLogin] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuardLogin] },

  { path: 'detail-count/:email', component: DetailClientComponent, canActivate: [AuthGuardClient] },

  { path: 'viewClient', redirectTo: '', pathMatch: 'full' }
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  declarations: []
})
export class AppRoutingModule { }
