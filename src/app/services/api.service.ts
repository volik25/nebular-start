import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService{
    private MASTER_KEY = 'nQnEscHHEpmENahmNhN3vUp6qn56TR4U';
    private baseUrl = 'http://localhost:9000';
    constructor(private http: HttpClient){ }

    public getClients(): Observable<any> {
        return this.http.get(`${this.baseUrl}/clients`);
    }
}
