import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Account, Client, Transaction } from '../../models/models';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  public clients: Client[];
  public accounts: Account[];
  public transactions: Transaction[];
  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    const requests = [this.api.getClients(), this.api.getAccounts(), this.api.getTransactions()];
    forkJoin(requests).subscribe(([clients, accounts, trans]) => {
      this.clients = clients;
      this.accounts = accounts;
      this.transactions = trans;
    });
  }

  deleteElement(id, element){
    const requests = [this.api.deleteClient(id), this.api.deleteAccount(id), this.api.deleteTransaction(id)];
    let arrays = [this.clients, this.accounts, this.transactions];
    requests[element].subscribe(() => {
      let i = arrays[element].findIndex(x => x.id === id);
      arrays[element].splice(i, 1);
    })
  }
}
