import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginAdminService} from '../auth/login/login-admin/login-admin.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private adminService: LoginAdminService, private router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.adminService.isLoggedIn()) {
      return true;
    } else {
      this.adminService.logout();
      this.router.navigate(['/auth/admin']);
      return false;
    }
  }
}
