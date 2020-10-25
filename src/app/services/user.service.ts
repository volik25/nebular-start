import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { Months } from '../models/enums';
import { user } from './data/data.mock';

@Injectable()
export class UserService{
    private user = user;

    getUser(): Observable<any> {
        return observableOf(this.user);
    }

    setPeriod(month) {
        switch (month) {
            case Months.January:
                return [
                    { data: { name: 'July', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'August', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'September', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'October', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'November', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'December', inSum: 0, outSum: 0, balance: 0 } },
                ];
            case Months.February:
                return [
                    { data: { name: 'August', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'September', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'October', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'November', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'December', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'January', inSum: 0, outSum: 0, balance: 0 } },
                ];
            case Months.March:
                return [
                    { data: { name: 'September', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'October', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'November', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'December', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'January', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'February', inSum: 0, outSum: 0, balance: 0 } },
                ];
            case Months.April:
                return [
                    { data: { name: 'October', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'November', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'December', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'January', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'February', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'March', inSum: 0, outSum: 0, balance: 0 } },
                ];
            case Months.May:
                return [
                    { data: { name: 'November', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'December', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'January', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'February', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'March', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'April', inSum: 0, outSum: 0, balance: 0 } },
                ];
            case Months.June:
                return [
                    { data: { name: 'December', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'January', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'February', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'March', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'April', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'May', inSum: 0, outSum: 0, balance: 0 } },
                ];
            case Months.July:
                return [
                    { data: { name: 'January', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'February', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'March', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'April', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'May', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'June', inSum: 0, outSum: 0, balance: 0 } },
                ];
            case Months.August:
                return [
                    { data: { name: 'February', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'March', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'April', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'May', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'June', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'July', inSum: 0, outSum: 0, balance: 0 } },
                ];
            case Months.September:
                return [
                    { data: { name: 'March', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'April', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'May', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'June', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'July', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'August', inSum: 0, outSum: 0, balance: 0 } },
                ];
            case Months.October:
                return [
                    { data: { name: 'April', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'May', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'June', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'July', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'August', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'September', inSum: 0, outSum: 0, balance: 0 } },
                ];
            case Months.November:
                return [
                    { data: { name: 'May', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'June', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'July', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'August', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'September', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'October', inSum: 0, outSum: 0, balance: 0 } },
                ];
            case Months.December:
                return [
                    { data: { name: 'June', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'July', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'August', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'September', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'October', inSum: 0, outSum: 0, balance: 0 } },
                    { data: { name: 'November', inSum: 0, outSum: 0, balance: 0 } },
                ];
            default:
                break;
        }
    }
}
