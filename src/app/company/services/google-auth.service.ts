import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private auth2: any;

  constructor(private router: Router, private ngZone: NgZone) {}

  initGoogleAuth(): void {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '719683281173-il24k6agag6p5h4e6a3eepmmnouhlpnu.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
    });
  }

  signInWithGoogle(): void {
    console.log("Navigate signInWithGoogle!!")
    this.auth2.signIn().then((googleUser: any) => {
      const idToken = googleUser.getAuthResponse().id_token;

      this.ngZone.run(() => {
        this.router.navigate(['login/google'], { queryParams: { idToken } });
        console.log("Navigate sucess!!")
      });
    }).catch(error => {
      console.error('Error signing in:', error);
      if (error.error === 'popup_closed_by_user') {
        // Handle user closing the popup
        alert('Sign-in popup was closed by the user. Please try again.');
      } else {
        // Handle other errors
        alert('An error occurred during sign-in. Please try again later.');
      }
    });
  }
}
