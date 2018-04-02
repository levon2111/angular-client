import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthService) {
    this.authService.initAuth();
  }

  onActivate(e, outlet) {
    window.scrollTo(0, 0);
  }
}
