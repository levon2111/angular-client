import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  show_logout: boolean;
  currentUser;
  constructor(private authService: AuthService) {
    this.show_logout = false;
  }

  ngOnInit() {
    this.authService
      .currentUser
      .subscribe((user: User) => this.currentUser = user);
  }

  showLogoutToggle() {
    this.show_logout = !this.show_logout;
  }

  onClickLogout() {
    this.authService.logout();
  }

}
