import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbContextMenuModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTreeGridModule } from '@nebular/theme';
import { ClientsRoutingModule, routedComponents } from './clients-routing.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FsIconComponent } from './clients-table/clients-table.component';
import { ClientFormComponent } from './client-form/client-form.component';

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
  ],
  providers: [
    FormBuilder,
  ],
})
export class ClientsModule { }
