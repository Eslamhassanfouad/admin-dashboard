import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userData = localStorage.getItem('userData');
    const userRole = userData ? JSON.parse(userData).userRole : null;

    // Redirect authenticated users away from login
    if (route.routeConfig?.path === 'login' && isAuthenticated) {
      this.router.navigate(
        userRole === 'Admin' ? ['/admin/dashboard'] : ['/user']
      );
      return false;
    }

    // Redirect unauthorized admin access to admin dashboard
    if (route.routeConfig?.path?.startsWith('admin') && userRole !== 'Admin') {
      this.router.navigate(userRole === 'User' ? ['/user'] : ['/login']);
      return false;
    }

    // Redirect unauthorized user access to user dashboard
    if (route.routeConfig?.path?.startsWith('user') && userRole !== 'User') {
      this.router.navigate(
        userRole === 'Admin' ? ['/admin/dashboard'] : ['/login']
      );
      return false;
    }

    return true;
  }
}
