import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private accountService = inject(AccountService);
  title = 'webShopClient';

  ngOnInit() {
    this.setCurrentUser();
  }
  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.accountService.currentUser.set(user);
    }
  }
  
  logout() {
    this.accountService.logout();  
    this.accountService.currentUser.set(null);
  }
}
