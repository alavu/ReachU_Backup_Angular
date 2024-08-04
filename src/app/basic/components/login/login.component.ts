import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {AuthService} from '../../services/auth/auth.service';
import {Component, NgZone, OnInit} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../services/storage/environment";
import { UserStorageService } from '../../services/storage/user-stoarge.service';

declare const google: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    validateForm!: FormGroup;
    // isSpinning = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private ngZone: NgZone,
        private snackBar: MatSnackBar,
        private notification: NzNotificationService,
        private router: Router
    ) {
    }

    /*submitForm() {
        this.isSpinning = true;
        this.authService.login(this.validateForm.get(['userName'])!.value,
            this.validateForm.get(['password'])!.value)
            .subscribe(
                res => {
                    console.log(res);
                    if (UserStoargeService.isClientLoggedIn()) {
                        this.router.navigateByUrl('client/dashboard');
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

    // submitForm() {
    //     // this.isSpinning = true;
    //     this.authService.login(this.validateForm.get(['userName'])!.value,
    //         this.validateForm.get(['password'])!.value)
    //         .subscribe(
    //             res => {
    //                 console.log(res);
                    // if (UserStorageService.isUserLoggedIn()) {
                    //     this.router.navigateByUrl('client/dashboard');
                    // }
                    // /* else if (UserStoargeService.isCompanyLoggedIn()) {
                    //      this.router.navigateByUrl('company/dashboard');
                    //  }*/
    //                 // this.isSpinning = false;
    //             },
    //             error => {
    //                 this.notification.error(
    //                     'ERROR',
    //                     `Bad credentials`,
    //                     {nzDuration: 5000}
    //                 );
    //                 // this.isSpinning = false;
    //             }
    //         );
    // }

   
    private decodeToken(token: string): any {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            console.error('Invalid token format', e);
            return null;
        }
    }

// Google login handling
    handleLogin(response: any) {
        if (response) {
            console.log(response.credential);
            const id_token = response.credential;
            const result = this.decodeToken(id_token);
            console.log(result);

            if (result) {
                this.authService.googleLogin({data: result}).subscribe({
                    next: (res: any) => {
                        localStorage.setItem('jwtToken', res.token);
                        this.snackBar.open('Google Sign-In Success', 'Success', {
                            duration: 3000,
                        });
                        this.router.navigate(['home']);
                    },
                    error: () => {
                        this.snackBar.open('Google Sign-In Failed', 'Error', {
                            duration: 3000,
                            panelClass: 'app-notification-error'
                        });
                    }
                });
            } else {
                this.snackBar.open('Google Sign-In Failed', 'Error', {
                    duration: 3000,
                    panelClass: 'app-notification-error'
                });
            }
        }
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            password: [null, [Validators.required]],
        });

        if (google) {
            google.accounts.id.initialize({
                client_id: environment.google_id,
                callback: (response: any) => this.ngZone.run(() => this.handleLogin(response))
            });

            google.accounts.id.renderButton(
                document.getElementById("google-btn"),
                {
                    theme: 'filled_white',
                    size: 'large',
                    text: 'signin_with',
                    shape: 'rectangular'
                }
            );
        } else {
            console.error('Google accounts API is not available.');
        }

        // setTimeout(() => {
        //     this.isSpinning = false;
        // }, 1000);
    }

    

    // submitForm() {
    //     this.authService.isUserlogin(this.validateForm.value)
    //     .subscribe({
    //         next: (res: LoginResponse) => {
    //             console.log('Login Response:', res);

    //             console.log(res.)
    
               
    //                 if (UserStorageService.isUserLoggedIn()) {
    //                     this.router.navigateByUrl('client/dashboard');
                    
    //                     if (res.success) {
    //                     this.snackBar.open("Login successful", "Close", {duration: 3000});
    //                 }
    //             } else {
    //                 this.snackBar.open("Invalid credentials.", "Close", {duration: 3000, panelClass: "error-snackbar"});
    //             }
    //         },
    //         error: (err) => {
    //             console.error('Login Error:', err);
    //             this.snackBar.open("An error occurred. Please try again.", "Close", {
    //                 duration: 5000,
    //                 panelClass: "error-snackbar"
    //             });
    //         }
    //     });
    // }
    
    submitForm() {
        this.authService.isUserlogin(this.validateForm.value).subscribe({
            next: (res: LoginResponse) => { // Use the LoginResponse interface here
                console.log('Login Response:', res);
    
                if (res.email != null) {
                    const user = {
                        id: res.email,
                        role: res.userRole,
                    };
    
                    console.log('user role :', res.userRole);
                    console.log('User:', user);
                    UserStorageService.saveUser(user);
    
                    const token = res.token;
                    console.log('JWT Token:', token);
                    UserStorageService.saveToken(token);
    
                    if (UserStorageService.isUserLoggedIn) {
                        this.router.navigateByUrl('home');
                    }
                    
                    this.snackBar.open("Login successful", "Close", { duration: 3000 });
                } else {
                    this.snackBar.open("Invalid credentials.", "Close", { duration: 3000, panelClass: "error-snackbar" });
                }
            },
            error: (err) => {
                console.error('Login Error:', err);
                if (err.error.error === "User is blocked") {
                    this.snackBar.open("Your account is blocked. Please contact support.", "Close", {
                        duration: 5000,
                        panelClass: "error-snackbar"
                    });
                } else {
                    this.snackBar.open("An error occurred. Please try again.", "Close", {
                        duration: 5000,
                        panelClass: "error-snackbar"
                });
            }
        }
    });
}
}

interface LoginResponse {
    email: string;
    userRole: string;
    token: string;
}
