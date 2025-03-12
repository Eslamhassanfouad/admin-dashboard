import { Injectable, signal } from '@angular/core';
import { User } from '../generalInterfaces/user';

@Injectable({
  providedIn: 'root',
})
export class LoggedInUserService {
  constructor() {}
  hasNotification = signal(true);

  setNotification(status: boolean) {
    this.hasNotification.set(status);
  }
}
