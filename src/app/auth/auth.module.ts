import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {AuthRoutingModule} from './auth.routing.module';
import {AuthComponent} from './auth.component';
import {AuthService} from './auth.service';
import {RecoverPassService} from './login/recover-pass.service';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import {LoadingModule} from 'ngx-loading';
import {LoginAdminModule} from './login/login-admin/login-admin.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ModalModule.forRoot(),
    LoadingModule,
    LoginAdminModule,
  ],
  declarations: [LoginComponent, AuthComponent],
  providers: [AuthService, RecoverPassService]
})
export class AuthModule {
}
