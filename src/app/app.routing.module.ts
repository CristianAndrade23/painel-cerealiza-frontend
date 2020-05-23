import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
  { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
  { path: 'painel', canActivate: [AdminGuard], component: AdminComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

