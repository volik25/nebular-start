import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { user } from './data/data.mock';

@Injectable()
export class UserService{
    private user = user;

    getUser(): Observable<any> {
        return observableOf(this.user);
    }
}
