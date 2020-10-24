import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbTabsetModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DecimalSeparatorPipe } from '../../services/pipes';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    NbCardModule,
    NbButtonModule,
    NbTabsetModule,
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
    DecimalSeparatorPipe,
  ],
})
export class DashboardModule { }
