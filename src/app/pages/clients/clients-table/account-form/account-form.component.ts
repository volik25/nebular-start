import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import { Account, Client, StatusValues } from '../../../../models/models';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'ngx-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
  @Input() clients: Client[];
  public statuses = StatusValues;
  accountForm: FormGroup;
  maxValue: Date;
  constructor(private fb: FormBuilder, private api: ApiService, protected dateService: NbDateService<Date>) {
    this._initForm();
    this.maxValue = this.dateService.addDay(this.dateService.today(), 0);
  }

  ngOnInit(): void {
  }

  _initForm(): void {
    this.accountForm = this.fb.group({
      owner: [null, Validators.required],
      openDate: [null, Validators.required],
      status: [null, Validators.required]
    })
  }

  submit(): void {
    if (this.accountForm.invalid) {
      return
    }
    let account: Account = this.accountForm.getRawValue();
    account.balance = 0;
    this.api.addAccount(account).subscribe(account => {
      console.log(account);
      this._initForm();
    })
  }

}
