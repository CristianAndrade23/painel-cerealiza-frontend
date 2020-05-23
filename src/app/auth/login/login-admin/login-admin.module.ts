import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginAdminComponent } from './login-admin.component';
import {FormsModule} from '@angular/forms';
import {LoginAdminService} from './login-admin.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [LoginAdminComponent],
  providers: [LoginAdminService],
  declarations: [LoginAdminComponent]
})
export class LoginAdminModule { }
