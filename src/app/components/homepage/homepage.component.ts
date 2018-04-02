import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginModalComponent} from '../modals/login-modal/login-modal.component';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {
  currentUser: any;

  constructor(private modal: NgbModal, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService
      .currentUser
      .subscribe((user: User) => this.currentUser = user);
  }

  openLogin() {
    if (this.currentUser.id) {
      this.router.navigateByUrl('/uploads');
    } else {
      this.modal.open(LoginModalComponent);
    }
  }
}
