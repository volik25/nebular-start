import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client, TypesValues } from '../../../../models/models';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'ngx-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnChanges {
  @Input() client: Client;
  @Output() data: EventEmitter<any> = new EventEmitter();
  clientForm: FormGroup;
  public types = TypesValues;
  constructor(private fb: FormBuilder, private api: ApiService) {
    this._initForm();
  }

  ngOnChanges(): void {
    if (this.client) {
      this.clientForm.patchValue(this.client);
    }
  }

  _initForm(): void {
    this.clientForm = this.fb.group({
      type: [null, Validators.required],
      name: [null, Validators.required],
      createDate: [null, Validators.required],
      address: [null, Validators.required],
      INN: [null],
    });
  }

  submit(): void {
    if (this.clientForm.invalid) {
      return
    }
    if (this.client) {
      this.api.updateClient(this.client.id, this.clientForm.getRawValue()).subscribe(client => {
        console.log(client);
        this.data.emit([client, 'update']);
        this._initForm();
      })
    }
    else{
      this.api.addClient(this.clientForm.getRawValue()).subscribe(client => {
        console.log(client);
        this.data.emit([client, 'new']);
        this._initForm();
      })
    }
  }

  clear(): void {
    this.client = null;
    this._initForm();
  }

}
