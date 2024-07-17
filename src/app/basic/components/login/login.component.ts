import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth/auth.service';
import { UserStoargeService } from '../../services/storage/user-stoarge.service';
import {GoogleAuthService} from "../../../company/services/google-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  validateForm!: FormGroup;
  isSpinning = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router,
    private googleAuthService: GoogleAuthService

    ){

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    this.googleAuthService.initGoogleAuth();

    setTimeout(() => {
      this.isSpinning = false;
    }, 1000);
  }



  submitForm() {
    this.isSpinning = true;

    this.authService.login(this.validateForm.get(['userName'])!.value, this.validateForm.get(['password'])!.value)
      .subscribe(
        res => {
          console.log(res);
          if (UserStoargeService.isClientLoggedIn()) {
            this.router.navigateByUrl('client/dashboard');
          } else if (UserStoargeService.isCompanyLoggedIn()) {
            this.router.navigateByUrl('company/dashboard');
          }
          this.isSpinning = false; // Stop spinning after navigating
        },
        error => {
          this.notification.error(
            'ERROR',
            `Bad credentials`,
            { nzDuration: 5000 }
          );
          this.isSpinning = false; // Stop spinning on error
        }
      );
  }

  signInWithGoogle(): void {
    this.googleAuthService.signInWithGoogle();
  }

}
