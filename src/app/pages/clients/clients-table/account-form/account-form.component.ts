import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client, StatusValues } from '../../../../models/models';
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
  constructor(private fb: FormBuilder, private api: ApiService) {
    this._initForm();
  }

  ngOnInit(): void {
  }

  _initForm(): void {
    this.accountForm = this.fb.group({
      accountId: [null, Validators.required],
      owner: [null, Validators.required],
      openDate: [null, Validators.required],
      status: [null, Validators.required]
    })
  }

  submit(): void {
    if (this.accountForm.invalid) {
      return
    }
    this.api.addAccount(this.accountForm.getRawValue()).subscribe(account => {
      console.log(account);
    })
  }

}
