import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginAdminComponent} from './login/login-admin/login-admin.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: AuthComponent,
        children: [
          {path: 'admin', component: LoginAdminComponent},
          {path: '**', redirectTo: 'admin'}]
      }
    ])],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
