import { Injectable } from '@angular/core';
import { UserManager, User, WebStorageStateStore, Log } from 'oidc-client';

@Injectable()
export class AuthService {
  oidcUser: User;
  userManager: UserManager;
  initialized = false;

  constructor() {
    Log.logger = console;
    const config = {
      authority: 'https://securingangularappscourse-sts.azurewebsites.net/',
      client_id: 'spa-client',
      redirect_uri: `http://localhost:4200/assets/oidc-login-redirect.html`,
      scope: 'openid profile projects-api',
      response_type: 'id_token token',
      post_logout_redirect_uri: `http://localhost:4200/`,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      automaticSilentRenew: true,
      silent_redirect_uri: `http://localhost:4200/assets/silent-redirect.html`
    };
    this.userManager = new UserManager(config);

  }

  initSession(): Promise<User> {
      return this.userManager.getUser().then(user => {
        if (user && !user.expired) {
          this.oidcUser = user;
          if (!this.initialized) {
            // load user profile, client security context, permissions, etc.
            this.initialized = true;
          }
          return user;
        }
        else { this.userManager.signinRedirect(); }
      });
  }

  login(): Promise<any> {
    return this.userManager.signinRedirect();
  }

  logout(): Promise<any> {
    return this.userManager.signoutRedirect();
  }

  isLoggedIn(): boolean {
    return this.oidcUser && this.oidcUser.access_token && !this.oidcUser.expired;
  }

  getAccessToken(): string {
    return this.oidcUser ? this.oidcUser.access_token : '';
  }

}
