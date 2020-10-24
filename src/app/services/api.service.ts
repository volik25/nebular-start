import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, Client, Transaction } from '../models/models';

@Injectable()
export class ApiService{
    private baseUrl = 'http://localhost:9000';
    constructor(private http: HttpClient){ }

    public getUsers(): Observable<any> {
        return this.http.get(`${this.baseUrl}/users`);
    }

    public getClients(): Observable<any> {
        return this.http.get(`${this.baseUrl}/clients`);
    }

    public getAccounts(): Observable<any> {
        return this.http.get(`${this.baseUrl}/accounts`);
    }

    public getTransactions(): Observable<any> {
        return this.http.get(`${this.baseUrl}/transactions`);
    }

    public getClient(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/clients/${id}`);
    }

    public getAccount(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/accounts/${id}`);
    }

    public getTransaction(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/transactions/${id}`);
    }

    public addClient(client: Client): Observable<any> {
        return this.http.post(`${this.baseUrl}/clients`, client);
    }

    public addAccount(account: Account): Observable<any> {
        return this.http.post(`${this.baseUrl}/accounts`, account);
    }

    public addTransaction(transaction: Transaction): Observable<any> {
        return this.http.post(`${this.baseUrl}/transactions`, transaction);
    }

    public updateClient(id: string, client: Client): Observable<any> {
        return this.http.put(`${this.baseUrl}/clients/${id}`, client);
    }

    public updateAccount(id: string, account: Account): Observable<any> {
        return this.http.put(`${this.baseUrl}/accounts/${id}`, account);
    }

    public updateTransaction(id: string, transaction: Transaction): Observable<any> {
        return this.http.put(`${this.baseUrl}/transactions/${id}`, transaction);
    }

    public deleteClient(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/clients/${id}`);
    }

    public deleteAccount(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/accounts/${id}`);
    }

    public deleteTransaction(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/transactions/${id}`);
    }
}
