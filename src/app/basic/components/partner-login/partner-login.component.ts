import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {environment} from "../../services/storage/environment";
import { UserStorageService } from '../../services/storage/user-stoarge.service';

@Component({
  selector: 'app-partner-login',
  templateUrl: './partner-login.component.html',
  styleUrls: ['./partner-login.component.scss']
})
export class PartnerLoginComponent implements OnInit {
    validateForm!: FormGroup;
    isSpinning = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private ngZone: NgZone,
        private snackBar: MatSnackBar,
        private notification: NzNotificationService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            userName: [null, [Validators.email, Validators.required]],
            password: [null, [Validators.required]],
        });
    }

    /*submitForm() {
        this.isSpinning = true;
        this.authService.login(this.validateForm.get(['userName'])!.value,
            this.validateForm.get(['password'])!.value)
            .subscribe(
                res => {
                    console.log(res);
                    if (UserStoargeService.isCompanyLoggedIn()) {
                        this.router.navigateByUrl('partner/dashboard');
                    }
                    /!* else if (UserStoargeService.isCompanyLoggedIn()) {
                         this.router.navigateByUrl('company/dashboard');
                     }*!/
                    this.isSpinning = false;
                },
                error => {
                    this.notification.error(
                        'ERROR',
                        `Bad credentials`,
                        {nzDuration: 5000}
                    );
                    this.isSpinning = false;
                }
            );
    }*/

    submitForm() {
        this.isSpinning = true;
        this.authService.login(this.validateForm.get(['email'])!.value,
            this.validateForm.get(['password'])!.value)
            .subscribe(
                res => {
                    console.log(res);
                    if (UserStorageService.isAdminLoggedIn()) {
                        this.router.navigateByUrl('partner/dashboard');
                    }
                    /* else if (UserStoargeService.isCompanyLoggedIn()) {
                         this.router.navigateByUrl('company/dashboard');
                     }*/
                    this.isSpinning = false;
                },
                error => {
                    this.notification.error(
                        'ERROR',
                        `Bad credentials`,
                        {nzDuration: 5000}
                    );
                    this.isSpinning = false;
                }
            );
    }

    private decodeToken(token: string): any {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            console.error('Invalid token format', e);
            return null;
        }
    }
}
