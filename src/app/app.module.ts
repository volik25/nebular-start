/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { AuthGuard } from './guards/auth.guard.service';
import { NbAuthJWTToken, NbAuthModule, NbAuthSimpleToken, NbDummyAuthStrategy, NbPasswordAuthStrategy } from '@nebular/auth';
import { ApiService } from './services/api.service';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { ClientService } from './services/clients.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbDummyAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthSimpleToken,
          },
          delay: 2000,
          alwaysFail: false
        })
        // NbPasswordAuthStrategy.setup({
        //   name: 'email',
        //   baseEndpoint: 'http://localhost:9000',
        //   login: {
        //     endpoint: '/auth',
        //   },
        //   register: {
        //     endpoint: '/users/sign-up',
        //   },
        //   logout: {
        //     endpoint: '/auth/sign-out',
        //   },
        //   requestPass: {
        //     endpoint: '/auth/request-pass',
        //   },
        //   resetPass: {
        //     endpoint: '/auth/reset-pass',
        //   },
        //   token: {
        //     class: NbAuthJWTToken,
        //     key: 'token',
        //   },
        // }),
      ],
      forms: {},
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    ApiService,
    ClientService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AppModule {
}
