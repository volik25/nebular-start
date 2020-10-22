import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbInputModule, NbRadioModule, NbTreeGridModule } from '@nebular/theme';
import { ClientsRoutingModule, routedComponents } from './clients-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbRadioModule,
    ClientsRoutingModule,
    NbTreeGridModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...routedComponents
  ],
})
export class ClientsModule { }