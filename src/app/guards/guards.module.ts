import {NgModule} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AuthGuard} from './auth.guard';
import {HomeGuard} from './home.guard';
import {AdminGuard} from './admin.guard';

@NgModule({
  imports: [],
  declarations: [],
  providers: [AuthService, AuthGuard, HomeGuard, AdminGuard]
})
export class GuardsModule {
}
