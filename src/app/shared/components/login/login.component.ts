import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  firstName = '';
  lastName = '';
  username = '';
  password = '';
  role: 'Admin' | 'User' = 'Admin';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const success = this.authService.login(
      this.username,
      this.password,
      this.firstName,
      this.lastName,
      this.role
    );

    if (success) {
      // Redirect based on role
      if (this.role === 'Admin') {
        this.router.navigate(['/admin/dashboard']);
      } else if (this.role === 'User') {
        this.router.navigate(['/user']);
      }
    } else {
      alert('Invalid login credentials');
    }
  }
}
