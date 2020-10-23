import { AccountStatuses, ClientTypes } from './enums';

export interface Client{
    id?: number;
    type: ClientTypes;
    name: string;
    createDate: string;
    address: string;
    INN?: string;
}

export interface Account{
    accountId: string;
    owner: number;
    openDate: string;
    status: AccountStatuses;
}

export interface Transaction{
    inAccount: string;
    outAccount: string;
    summ: number;
    date: string;
}

export interface TypesDescription{
    value: ClientTypes;
    description: string;
}

export interface StatusDescription{
    value: AccountStatuses;
    description: string;
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
