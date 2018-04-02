import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html'
})
export class LoginModalComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }
}