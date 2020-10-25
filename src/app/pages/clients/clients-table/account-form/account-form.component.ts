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
  minValue: Date;
  maxValue: Date;
  constructor(private fb: FormBuilder, private api: ApiService, protected dateService: NbDateService<Date>) {
    this._initForm();
    this.maxValue = this.dateService.addDay(this.dateService.today(), 0);
  }

  ngOnInit(): void {
    this.accountForm.get('owner').valueChanges.subscribe(clientId => {
      this.api.getClient(clientId).subscribe(client => {
        this.minValue = new Date(client.createDate);
      })
    })
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
      this._initForm();
    })
  }

  dateDifference(date1, date2) {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
  }

}
