import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ValidationService} from '../../../services/validation.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html'
})
export class LoginModalComponent implements OnInit {
  loginForm: FormGroup;
  show_password: boolean;
  show_error_message: boolean;

  constructor(private activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
    this.show_password = false;
    this.show_error_message = false;
    this.loginForm = fb.group({
      'username': [null, [ValidationService.required, ValidationService.emailValidator]],
      'password': [null, [ValidationService.required, ValidationService.passwordValidator]]
    });
  }

  ngOnInit() {
    this.loginForm['isSubmitted'] = false;
  }

  closeModal() {
    this.activeModal.close();
  }

  togglePasswordShow() {
    const x = <HTMLInputElement>document.getElementById('popup_password__show');
    if (x.type !== 'password') {
      x.setAttribute('type', 'password');
      this.show_password = false;
    } else {
      x.setAttribute('type', 'text');
      this.show_password = true;
    }
  }

  onSubmit(data): any {
    this.loginForm['isSubmitted'] = true;
    if (this.loginForm.valid) {
      const observer = {
        next: (user: User) => {
          this.activeModal.close();
          this.router.navigateByUrl('/uploads');
        },
        error: (error) => {
          if (error.non_field_errors) {
            this.show_error_message = true;
          }
        }
      };
      this.authService
        .login(data)
        .subscribe(observer);
    }
  }
}
