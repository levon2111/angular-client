import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {LoginModalComponent} from '../components/modals/login-modal/login-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private modalService: NgbModal) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated.map((isAuthenticated: boolean) => {
      if (!isAuthenticated) {
        this.router.navigateByUrl('/');
        this.modalService.open(LoginModalComponent);
      }

      return isAuthenticated;
    }).take(1);
  }
}
