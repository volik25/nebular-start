import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbContextMenuModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTreeGridModule } from '@nebular/theme';
import { ClientsRoutingModule, routedComponents } from './clients-routing.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FsIconComponent } from './clients-table/clients-table.component';
import { AccountFormComponent } from './clients-table/account-form/account-form.component';
import { ClientFormComponent } from './clients-table/client-form/client-form.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbRadioModule,
    NbIconModule,
    NbSelectModule,
    NbDatepickerModule,
    NbContextMenuModule,
    ClientsRoutingModule,
    NbTreeGridModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
    ClientFormComponent,
    AccountFormComponent,
  ],
  providers: [
    FormBuilder,
  ],
})
export class ClientsModule { }
