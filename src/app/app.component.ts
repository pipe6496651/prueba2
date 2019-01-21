import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

})
export class AppComponent {
  title = 'Auth Guard with OIDC client';
  get isLoggedIn() {
    return this._authService.isLoggedIn();
  }

  constructor(private _authService: AuthService) {
  }

  logout() {
    this._authService.logout();
  }
}
