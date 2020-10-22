import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { ClientsComponent } from './clients.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [{
    path: '',
    component: ClientsComponent,
    children: [
      {
        path: 'clients-list',
        component: ClientsTableComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      }
    ],
  }];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ClientsRoutingModule { }
  
  export const routedComponents = [
    ClientsComponent,
    ClientsTableComponent,
    TransactionsComponent
  ];