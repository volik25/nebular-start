import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import { forkJoin } from 'rxjs';
import { TransactionTypes } from '../../../../models/enums';
import { Account, Transaction, TransactionValues } from '../../../../models/models';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'ngx-ext-trans-form',
  templateUrl: './ext-trans-form.component.html',
  styleUrls: ['./ext-trans-form.component.scss']
})
export class ExtTransFormComponent implements OnInit {
  public transTypes = TransactionValues;
  public accountsNumber: number[] = [];
  public transactionForm: FormGroup;
  public maxValue;
  public transaction: Transaction;
  private accounts: Account[];
  constructor(private fb: FormBuilder, private api: ApiService, protected dateService: NbDateService<Date>) {
    this._initForm();
    this.maxValue = this.dateService.addDay(this.dateService.today(), 0);
  }

  ngOnInit(): void {
    this.api.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
      accounts.forEach(account => {
        this.accountsNumber.push(account.id);
      });
    })
  }

  _initForm(): void {
    this.transactionForm = this.fb.group({
      transType: [null, Validators.required],
      accountId: [null, Validators.required],
      date: [null, Validators.required],
      amount: [null, Validators.required]
    })
  }

  submit(): void {
    if (this.transactionForm.invalid) {
      return;
    }
    const trans = this.transactionForm.getRawValue();
    this.transaction = {
      inAccount: null,
      outAccount: null,
      date: trans.date,
      amount: trans.amount
    }
    for (let i = 0; i < this.accounts.length; i++) {
      let account = this.accounts[i];
      if (account.id === trans.accountId) {
        let accountId = account.id;
        delete account.id;
        switch (trans.transType) {
          case TransactionTypes.Incoming:
            account.balance += trans.amount;
            this.transaction.inAccount = trans.accountId;
            break;
          case TransactionTypes.Outgoing:
            account.balance -= trans.amount;
            this.transaction.outAccount = trans.accountId;
            break;
          default:
            break;
        }
        const requests = [this.api.updateAccount(accountId, account), this.api.addTransaction(this.transaction)];
        forkJoin(requests).subscribe(([account, transaction]) => {
          console.log(account, transaction);
        })
        break;
      }
    }
  }

}
