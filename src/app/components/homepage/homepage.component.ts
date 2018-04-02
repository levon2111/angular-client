import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginModalComponent} from '../modals/login-modal/login-modal.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

  constructor(private modal: NgbModal) {
  }

  ngOnInit() {
  }

  openLogin() {
    this.modal.open(LoginModalComponent);
  }
}
