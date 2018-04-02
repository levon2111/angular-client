import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {AppConfigs} from '../components/configs';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable()
export class VideosService {

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) {
  }

  getUserVideos(): Observable<any> {
    const user_id = this.authService.getCurrentUserId();
    const token = this.authService.getToken();
    const headers = new HttpHeaders({'Authorization': `Token ${token}`});

    return this.http
      .get(`${AppConfigs.BACK_HOST}/api/v1/users/${user_id}/videos/`, {headers: headers})
      .map((video: any) => {
        return video;
      });
  }
}
