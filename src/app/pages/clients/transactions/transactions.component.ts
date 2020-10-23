import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account, Transaction } from '../../../models/models';
import { ClientService } from '../../../services/clients.service';

@Component({
  selector: 'ngx-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactionForm: FormGroup;
  accountsNumber: number[] = [];
  constructor(private fb: FormBuilder, private api: ClientService) {
    this._initForm();
  }

  ngOnInit(): void {
    this.api.getAccounts().subscribe(accounts => {
      accounts.forEach(account => {
        this.accountsNumber.push(account.accountId)
      });
    })
  }

  _initForm(): void {
    this.transactionForm = this.fb.group({
      OutNumber: [null, Validators.required],
      InNumber: [null, Validators.required],
      Amount: [null, Validators.required],
      date: [null, Validators.required]
    });
  }

  submit() {
    console.log(this.transactionForm.getRawValue());

  }
}
