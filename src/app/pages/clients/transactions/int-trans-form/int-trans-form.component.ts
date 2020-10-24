import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
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
  public maxValue;
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
}
