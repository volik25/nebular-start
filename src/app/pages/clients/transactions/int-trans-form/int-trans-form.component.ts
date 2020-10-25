import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import { AccountStatuses } from '../../../../models/enums';
import { Account } from '../../../../models/models';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'ngx-int-trans-form',
  templateUrl: './int-trans-form.component.html',
  styleUrls: ['./int-trans-form.component.scss']
})
export class IntTransFormComponent implements OnInit {
  transactionForm: FormGroup;
  accountsNumber: number[] = [];
  private accounts: Account[];
  public minValue;
  public maxValue;
  public selectedIn;
  public selectedOut;
  constructor(private fb: FormBuilder, private api: ApiService, protected dateService: NbDateService<Date>) {
    this._initForm();
    this.minValue = this.dateService.addYear(this.dateService.today(), -1);
    this.maxValue = this.dateService.addDay(this.dateService.today(), 0);
  }

  ngOnInit(): void {
    this.api.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
      accounts.forEach(account => {
        if (account.status == AccountStatuses.Active) {
          this.accountsNumber.push(account.id);
        }
      });
    })
    this.transactionForm.get('inAccount').valueChanges.subscribe(inAccountId => {
      this.api.getAccount(inAccountId).subscribe(inAccount => {
        this.minValue = this.selectedOut;
        this.selectedIn = new Date(inAccount.openDate);
        if (this.dateDifference(this.minValue, this.selectedIn) > 0) {
          this.minValue = this.selectedIn;
        }
      })
    })
    this.transactionForm.get('outAccount').valueChanges.subscribe(outAccountId => {
      this.api.getAccount(outAccountId).subscribe(outAccount => {
        this.minValue = this.selectedIn;
        this.selectedOut = new Date(outAccount.openDate);
        if (this.dateDifference(this.minValue, this.selectedOut) > 0) {
          this.minValue = this.selectedOut;
        }
      })
    })
  }

  _initForm(): void {
    this.transactionForm = this.fb.group({
      inAccount: [null, Validators.required],
      outAccount: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required]
    });
  }

  submit() {
    if (this.transactionForm.invalid) {
      return
    }
    const trans = this.transactionForm.getRawValue();
    this.accounts.forEach(account => {
      const id = account.id;
      delete account.id;
      if (id === trans.inAccount) {
        account.balance += trans.amount;
        this.api.updateAccount(id, account).subscribe(res => {
          this._initForm();
        })
      }
      if (id === trans.outAccount) {
        account.balance -= trans.amount;
        this.api.updateAccount(id, account).subscribe(res => {
          this._initForm();
        })
      }
    })
    this.api.addTransaction(this.transactionForm.getRawValue()).subscribe(transaction => {
      this._initForm();
    })
  }

  dateDifference(date1, date2) {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
  }
}
