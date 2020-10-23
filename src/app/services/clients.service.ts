import { Injectable } from "@angular/core";
import { of as observableOf, Observable } from 'rxjs';
import { accounts, clients, transactions } from './data/data.mock';

@Injectable()
export class ClientService{
    
    private clients = clients;
    private accounts = accounts;
    private transactions = transactions;

    constructor() {

    }

    getClients(): Observable<any> {
        return observableOf(this.clients);
    }

    getAccounts(): Observable<any> {
        return observableOf(this.accounts);
    }

    getTransactions(): Observable<any> {
        return observableOf(this.transactions);
    }
}