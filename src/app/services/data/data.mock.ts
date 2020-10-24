import { url } from 'inspector';
import { AccountStatuses, ClientTypes } from '../../models/enums';
import { Account, Client, Transaction, User } from '../../models/models';

export const user: User = {
    id: "5f91852d2d12c83d08949ba8",
    name: "Ivan Volik",
    picture: "assets/images/author.jpg"
}

export const clients: Client[] = [
    {
        id: '1',
        type: ClientTypes.Individual,
        name: 'Волков Андрей',
        createDate: '08.02.1976',
        address: 'г. Москва, проспект Мира, д.48, кв.54',
        INN: '8265438767',
    },
    {
        id: '2',
        type: ClientTypes.Entity,
        name: 'ПАО Кортеж',
        createDate: '12.05.2015',
        address: 'г. Москва',
        INN: '4567321452',
    },
    {
        id: '3',
        type: ClientTypes.Entity,
        name: 'ИП Иванченко',
        createDate: '02.08.1986',
        address: 'МО, г. Пушкино, ул. Чехова, д.27',
        INN: '1113334312',
    },
    {
        id: '4',
        type: ClientTypes.Entity,
        name: 'Семенов Петр',
        createDate: '14.12.1998',
        address: 'МО, г. Мытищи, Олимпийский проспект, д.24, кв.65',
    },
];

export const accounts: Account[] = [
    {
        id: '1111',
        owner: '1',
        openDate: '12.12.2015',
        status: AccountStatuses.Active,
    },
    {
        id: '2222',
        owner: '2',
        openDate: '12.12.2015',
        status: AccountStatuses.Active,
    },
    {
        id: '3333',
        owner: '3',
        openDate: '12.12.2015',
        status: AccountStatuses.Active,
    },
    {
        id: '4444',
        owner: '4',
        openDate: '12.12.2015',
        status: AccountStatuses.Active,
    },
];

export const transactions: Transaction[] = [
    {
        inAccount: '2222',
        outAccount: '1111',
        amount: 2000,
        date: '15.09.2020',
    },
    {
        inAccount: '1111',
        outAccount: '2222',
        amount: 8000,
        date: '15.08.2020',
    },
    {
        inAccount: '2222',
        outAccount: '3333',
        amount: 10000,
        date: '15.07.2020',
    },
    {
        inAccount: '3333',
        outAccount: '1111',
        amount: 1324,
        date: '15.06.2020',
    },
    {
        inAccount: '1111',
        outAccount: '2222',
        amount: 5634,
        date: '15.05.2020',
    },
    {
        inAccount: '3333',
        outAccount: '2222',
        amount: 24563,
        date: '15.04.2020',
    },
];
