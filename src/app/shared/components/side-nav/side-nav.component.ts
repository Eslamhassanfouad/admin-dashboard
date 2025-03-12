import { Component, computed } from '@angular/core';
import { SideBar } from '../../generalInterfaces/side-bar';
import { LoggedInUserService } from '../../services/logged-in-user.service';

@Component({
  selector: 'app-side-nav',
  standalone: false,
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  isMenuOpen: boolean = false;
  constructor(private _LoggedInUserService: LoggedInUserService) {}

  notification = computed(() => this._LoggedInUserService.hasNotification());
  sideBarItems: SideBar[] = [
    {
      label: 'Dashboard',
      icon: 'assets/icons/home.svg',
      route: '/admin/dashboard',
    },
    { label: 'Orders', icon: 'assets/icons/orders.svg' },
    { label: 'Users', icon: 'assets/icons/users.svg' },
    { label: 'Items', icon: 'assets/icons/items.svg' },
    { label: 'Tranactions', icon: 'assets/icons/transactions.svg' },
    { label: 'Reports', icon: 'assets/icons/reports.svg' },
  ];
  sideBarBottom: SideBar[] = [
    { label: 'Message', icon: 'assets/icons/msg.svg' },
    { label: 'Support', icon: 'assets/icons/support.svg' },
    { label: 'Settings', icon: 'assets/icons/settings.svg' },
  ];
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
