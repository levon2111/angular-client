import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from '../models/user.model';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {AppConfigs} from '../components/configs';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  currentUserSubject = new BehaviorSubject<User>(new User());
  currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getCurrentUserId(): number {
    return parseInt(atob(localStorage.getItem('user_id')), 0);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  destroyToken(): void {
    localStorage.removeItem('token');
  }

  initAuth(): void {
    if (this.getToken()) {
      this.getAuthenticatedUser()
        .subscribe((user: User) => {
          this.setAuth(user);
        });
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: any): void {
    const token = user.key ? user.key : this.getToken();
    this.saveToken(token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    const user_id = user.id.toString();
    localStorage.setItem('user_id', btoa(user_id));
  }

  purgeAuth() {
    this.destroyToken();
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('user_id');
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  login(credentials: Object): Observable<User> {
    return this.http
      .post(`${AppConfigs.BACK_HOST}/rest-auth/login/`, credentials)
      .map((user: User) => {
        this.setAuth(user);
        return user;
      });
  }

  getAuthenticatedUser(): Observable<User> {
    const user_id = this.getCurrentUserId();
    const token = this.getToken();
    const headers = new HttpHeaders({'Authorization': `Token ${token}`});

    return this.http
      .get(`${AppConfigs.BACK_HOST}/api/v1/users/${user_id}/`, {headers: headers})
      .map((user: User) => {
        return user;
      });
  }

  logout(): void {
    this.purgeAuth();
    this.router.navigateByUrl('/');
  }
}
