import { Component, computed } from '@angular/core';
import { LoggedInUserService } from '../../services/logged-in-user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-nav',
  standalone: false,
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss',
})
export class TopNavComponent {
  constructor(
    public _AuthService: AuthService,
    private _LoggedInUserService: LoggedInUserService
  ) {}
  currentUser: any;
  notification = computed(() => this._LoggedInUserService.hasNotification());

  ngOnInit(): void {
    this.currentUser = this._AuthService.getUserData();
    console.log(this.notification());
  }
}
