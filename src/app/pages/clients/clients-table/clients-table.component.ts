import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NbMenuService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { forkJoin } from 'rxjs';
import { ClientTypes } from '../../../models/enums';
import { Account, Client, Transaction } from '../../../models/models';
import { ApiService } from '../../../services/api.service';
import { ClientService } from '../../../services/clients.service';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  type?;
  name: string;
  createDate?;
  address?;
  INN?: string;
  inSum: number;
  outSum: number;
  balance: number;
}

@Component({
  selector: 'ngx-clients-list',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent implements OnInit {
  @ViewChild('clientForm') form: ElementRef<HTMLElement>;
  customColumn = 'name';
  defaultColumns = [ 'inSum', 'outSum', 'balance', 'INN' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  private data: TreeNode<FSEntry>[] = [];
  clients: Client[];
  clientsTest: Client[];
  accounts: Account[];
  transactions: Transaction[];

  contextMenuTag = 'clientsTag';

  tableMenu = [ { title: 'Edit' }, { title: 'Delete' } ];

  editingClient = null;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
              private api: ApiService,
              private cs: ClientService,
              private menuService: NbMenuService) {
  }

  ngOnInit() {
    this.api.getClients().subscribe(clients => {
      this.clients = clients;
    })
    const requests = [this.cs.getClients(), this.cs.getAccounts(), this.cs.getTransactions()];
    forkJoin(requests).subscribe(([clients, accounts, trans]) => {
      this.clientsTest = clients;
      this.accounts = accounts;
      this.transactions = trans;
      this.tableGenerate();
      this.dataSource = this.dataSourceBuilder.create(this.data);
      this.menuService.onItemClick()
      .subscribe(({tag, item}) => {
        if (item.title === 'Edit') this.editClient(tag);
        if (item.title === 'Delete') this.removeClient(tag);
      });
    });
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }


  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  tableGenerate(): void {
    this.clientsTest.forEach(client => {
      let inSum = 0;
      let outSum = 0;
      let balance = 0;
      if (client.INN) {
        this.accounts.forEach(acc => {
          if (client.id === acc.owner) {
            this.transactions.forEach(transact => {
              if (transact.inAccount === acc.accountId) {
                inSum += transact.summ;
                balance += inSum;
              }
              if (transact.outAccount === acc.accountId) {
                outSum += transact.summ;
                balance -= outSum;
              }
            });
            this.data.push({
              data: {
                ...client,
                inSum: inSum,
                outSum: outSum,
                balance: balance,
              },
              children: [
                { data: { name: 'April', inSum: inSum, outSum: outSum, balance: balance} },
                { data: { name: 'May', inSum: inSum, outSum: outSum, balance: balance} },
                { data: { name: 'June', inSum: inSum, outSum: outSum, balance: balance} },
                { data: { name: 'July', inSum: inSum, outSum: outSum, balance: balance} },
                { data: { name: 'August', inSum: inSum, outSum: outSum, balance: balance} },
                { data: { name: 'September', inSum: inSum, outSum: outSum, balance: balance} },
              ],
            });
          }
        });
      }
    });
  }

  editClient(id){
    this.form.nativeElement.scrollIntoView({block: 'center', behavior: 'smooth'});
    console.log(id);
    this.editingClient = this.clientsTest.find(x => x.id === id);
  }

  removeClient(id){
    console.log(id);
  }

}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="calendar"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() type;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.type === ClientTypes.Individual || this.type === ClientTypes.Entity;
  }
}
