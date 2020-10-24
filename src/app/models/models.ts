import { AccountStatuses, ClientTypes, TransactionTypes } from './enums';

export interface User{
    id?: string;
    name: string;
    picture: string;
}

export interface Client{
    id?: string;
    type: ClientTypes;
    name: string;
    createDate: string;
    address: string;
    INN?: string;
}

export interface Account{
    id?: string;
    owner: string;
    openDate: string;
    balance?: number;
    status: AccountStatuses;
}

export interface Transaction{
    id?: string;
    inAccount: string;
    outAccount: string;
    amount: number;
    date: string;
}

export interface Description{
    description: string;
}

export interface TypesDescription extends Description{
    value: ClientTypes;
}

export interface StatusDescription extends Description{
    value: AccountStatuses;
}

export interface TransactionTypesDescription extends Description{
    value: TransactionTypes;
}

export const TypesValues: TypesDescription[] = [
    {
        value: ClientTypes.Entity,
        description: 'Organization/Employer',
    },
    {
        value: ClientTypes.Individual,
        description: 'Individual',
    },
];

export const StatusValues: StatusDescription[] = [
    {
        value: AccountStatuses.Active,
        description: 'Active',
    },
    {
        value: AccountStatuses.Blocked,
        description: 'Blocked',
    },
];

export const TransactionValues: TransactionTypesDescription[] = [
    {
        value: TransactionTypes.Incoming,
        description: 'Incoming'
    },
    {
        value: TransactionTypes.Outgoing,
        description: 'Outgoing'
    }
]