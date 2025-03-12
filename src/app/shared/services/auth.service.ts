import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  private userData: {
    firstName: string;
    lastName: string;
    userRole: 'Admin' | 'User';
  } | null = null;

  constructor(private router: Router) {}

  login(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    role: 'Admin' | 'User'
  ): boolean {
    // Mock login validation
    if (username && password) {
      this.isAuthenticated = true;
      this.userData = { firstName, lastName, userRole: role };

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify(this.userData));

      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false;
    this.userData = null;

    // Clear stored data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');

    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return (
      this.isAuthenticated || localStorage.getItem('isAuthenticated') === 'true'
    );
  }

  getUserData() {
    return (
      this.userData || JSON.parse(localStorage.getItem('userData') || 'null')
    );
  }

  getUserRole(): 'Admin' | 'User' | null {
    return this.getUserData()?.userRole ?? null;
  }
}
