import { AccountStatuses, ClientTypes } from '../../models/enums';
import { Account, Client, Transaction } from '../../models/models';

export const clients: Client[] = [
    {
        id: 1,
        type: ClientTypes.Individual,
        name: 'Волков Андрей',
        createDate: '08.02.1976',
        address: 'г. Москва, проспект Мира, д.48, кв.54',
        INN: '8265438767',
    },
    {
        id: 2,
        type: ClientTypes.Entity,
        name: 'ПАО Кортеж',
        createDate: '12.05.2015',
        address: 'г. Москва',
        INN: '4567321452',
    },
    {
        id: 3,
        type: ClientTypes.Entity,
        name: 'ИП Иванченко',
        createDate: '02.08.1986',
        address: 'МО, г. Пушкино, ул. Чехова, д.27',
        INN: '1113334312',
    },
    {
        id: 4,
        type: ClientTypes.Entity,
        name: 'Семенов Петр',
        createDate: '14.12.1998',
        address: 'МО, г. Мытищи, Олимпийский проспект, д.24, кв.65',
    },
];

export const accounts: Account[] = [
    {
        accountId: '1111',
        owner: 1,
        openDate: '12.12.2015',
        status: AccountStatuses.Active,
    },
    {
        accountId: '2222',
        owner: 2,
        openDate: '12.12.2015',
        status: AccountStatuses.Active,
    },
    {
        accountId: '3333',
        owner: 3,
        openDate: '12.12.2015',
        status: AccountStatuses.Active,
    },
    {
        accountId: '4444',
        owner: 4,
        openDate: '12.12.2015',
        status: AccountStatuses.Active,
    },
];

export const transactions: Transaction[] = [
    {
        inAccount: '2222',
        outAccount: '1111',
        summ: 2000,
        date: '15.09.2020',
    },
    {
        inAccount: '1111',
        outAccount: '2222',
        summ: 8000,
        date: '15.08.2020',
    },
    {
        inAccount: '2222',
        outAccount: '3333',
        summ: 10000,
        date: '15.07.2020',
    },
    {
        inAccount: '3333',
        outAccount: '1111',
        summ: 1324,
        date: '15.06.2020',
    },
    {
        inAccount: '1111',
        outAccount: '2222',
        summ: 5634,
        date: '15.05.2020',
    },
    {
        inAccount: '3333',
        outAccount: '2222',
        summ: 24563,
        date: '15.04.2020',
    },
];
