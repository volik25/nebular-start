import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactionForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this._initForm();
  }

  ngOnInit(): void {
  }

  _initForm(): void {
    this.transactionForm = this.fb.group({
      OutNumber: [null, Validators.required],
      InNumber: [null, Validators.required],
      Amount: [null, Validators.required],
    });
  }

  submit() {
    console.log(this.transactionForm.getRawValue());

  }
}
