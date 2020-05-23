import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import {LoginAdminService} from '../../auth/login/login-admin/login-admin.service';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule
  ],
  exports: [MenuComponent],
  providers: [LoginAdminService]
})
export class MenuModule { }
