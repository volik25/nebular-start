import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ClientsComponent } from './clients.component';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { NbTreeGridModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    NbTreeGridModule,
  ],
  declarations: [
    ClientsComponent,
    ClientsTableComponent,
  ],
})
export class ClientsModule { }