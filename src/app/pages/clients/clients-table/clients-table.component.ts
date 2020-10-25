import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NbDateService, NbMenuService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { forkJoin } from 'rxjs';
import { ClientTypes } from '../../../models/enums';
import { Account, Client, FSEntry, MonthsValues, Transaction, TreeNode } from '../../../models/models';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-clients-list',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent implements OnInit {
  @ViewChild('clientForm') form: ElementRef<HTMLElement>;
  customColumn = 'name';
  defaultColumns = ['inSum', 'outSum', 'balance'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  data: TreeNode<FSEntry>[] = [];
  clients: Client[];
  clientsTest: Client[];
  accounts: Account[];
  transactions: Transaction[];
  public months = MonthsValues;
  public currentMonth;
  public currentYear;
  contextMenuTag = 'clientsTag';

  tableMenu = [{ title: 'Edit' }, { title: 'Delete' }];

  editingClient = null;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private api: ApiService,
    private menuService: NbMenuService,
    protected dateService: NbDateService<Date>,
    private userService: UserService) {
  }

  ngOnInit() {
    this.currentMonth = this.dateService.today().getMonth();
    this.currentYear = this.dateService.today().getFullYear();
    const requests = [this.api.getClients(), this.api.getAccounts(), this.api.getTransactions()];
    forkJoin(requests).subscribe(([clients, accounts, trans]) => {
      this.clients = clients;
      this.accounts = accounts;
      this.transactions = trans;
      this.tableGenerate();
      this.menuService.onItemClick()
        .subscribe(({ tag, item }) => {
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

  update(data) {
    this.editingClient = null;
    const action = data[1];
    const client = data[0];
    switch (action) {
      case 'new':
        this.clients.push(client);
        break;
      case 'update':
        for (let i = 0; i < this.clients.length; i++) {
          const oldClient = this.clients[i];
          if (oldClient.id === client.id) {
            this.clients[i] = client;
            break;
          }
        }
        break;
      default:
        break;
    }
    this.tableGenerate();
  }

  tableGenerate(): void {
    this.data = [];
    this.clients.forEach(client => {
      let period = this.userService.setPeriod(this.currentMonth);
      let inSum = 0;
      let outSum = 0;
      let balance = 0;
      if (client.INN) {
        this.accounts.forEach(acc => {
          if (client.id === acc.owner) {
            this.transactions.forEach(transact => {
              const transactYear = new Date(transact.date).getFullYear();
              const transactMonth = new Date(transact.date).getMonth();
              if (transactYear === this.currentYear || transactYear === (this.currentYear - 1)) {
                MonthsValues.forEach(month => {
                  period.forEach(value => {
                    if (transactMonth === month.value && month.description === value.data.name) {
                      if (transact.inAccount === acc.id) {
                        inSum += transact.amount;
                        balance += transact.amount;
                        value.data.inSum += transact.amount;
                      }
                      if (transact.outAccount === acc.id) {
                        outSum += transact.amount;
                        balance -= transact.amount;
                        value.data.outSum += transact.amount;
                      }
                    }
                  });
                })
              }
              for (let i = 0; i < period.length; i++) {
                let value = period[i];
                if (i > 0) {
                  value.data.balance = period[i - 1].data.balance + value.data.inSum - value.data.outSum;
                }
                else {
                  value.data.balance = value.data.inSum - value.data.outSum;
                }
              }
            });
          }
        });
      }
      this.data.push({
        data: {
          ...client,
          inSum: inSum,
          outSum: outSum,
          balance: balance,
        },
        children: period,
      });
    });
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  editClient(id) {
    this.form.nativeElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
    this.editingClient = this.clients.find(x => x.id === id);
  }

  removeClient(id) {
    this.api.deleteClient(id).subscribe(() => {
      let removedClient = this.clients.findIndex(x => x.id === id);
      this.clients.splice(removedClient, 1);
      this.tableGenerate();
    })
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
