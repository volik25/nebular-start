import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account, Transaction } from '../../../models/models';
import { ApiService } from '../../../services/api.service';
import { ClientService } from '../../../services/clients.service';

@Component({
  selector: 'ngx-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactionForm: FormGroup;
  accountsNumber: number[] = [];
  constructor(private fb: FormBuilder, private cs: ClientService, private api: ApiService) {
    this._initForm();
  }

  ngOnInit(): void {
    this.cs.getAccounts().subscribe(accounts => {
      accounts.forEach(account => {
        this.accountsNumber.push(account.accountId)
      });
    })
  }

  _initForm(): void {
    this.transactionForm = this.fb.group({
      outNumber: [null, Validators.required],
      inNumber: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required]
    });
  }

  submit() {
    if (this.transactionForm.invalid) {
      return
    }
    this.api.addTransaction(this.transactionForm.getRawValue()).subscribe(transaction => {
      console.log(transaction);
    })
  }
}
