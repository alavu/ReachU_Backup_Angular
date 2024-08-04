import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../basic/services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import { UserStorageService } from 'src/app/basic/services/storage/user-stoarge.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit{

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

    /*submitForm() {
        this.isSpinning = true;
        this.authService.login(this.validateForm.get(['email'])!.value,
            this.validateForm.get(['password'])!.value)
            .subscribe(
                res => {
                    console.log(res);
                    if (UserStoargeService.isClientLoggedIn()) {
                        this.router.navigateByUrl('admin/dashboard');
                    }
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

    /*submitForm() {
        this.isSpinning = true;
        this.authService.login(this.validateForm.value)
            .subscribe(
                (res) => {
                    console.log(res);
                    if (UserStoargeService.isClientLoggedIn()) {
                        this.router.navigateByUrl('admin/dashboard');
                    }
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
                this.authService.adminLogin(this.validateForm.value).subscribe({
                    next: (res) => {
                        console.log('Login Response:', res);
            
                        if (res.email) {
                            const user = {
                                id: res.email,
                                role: res.userRole,
                            };
            
                            console.log('User role:', res.userRole);
                            UserStorageService.saveUser(user);
            
                            const token = res.token;
                            console.log('JWT Token:', token);
                            UserStorageService.saveToken(token);
            
                            // if (res.userRole === 'ADMIN') {
                            //     this.router.navigateByUrl('admin/dashboard');
                            //     this.snackBar.open("Login successful", "Close", {duration: 3000});
                            // } 
                            if (UserStorageService.isAdminLoggedIn()) {
                                this.notification.success('Login Successful', 'You have been logged in successfully.');
                                this.router.navigateByUrl('admin/dashboard');
                            }
                            else {
                                UserStorageService.clearUser(); // Clear non-admin user details
                                UserStorageService.clearToken(); // Clear non-admin token
                                this.snackBar.open("Access restricted to admins only.", "Close", {
                                    duration: 5000,
                                    panelClass: "error-snackbar"
                                });
                            }
                        } else {
                            this.snackBar.open("Invalid credentials.", "Close", {duration: 3000, panelClass: "error-snackbar"});
                        }
                    },
                    error: (err) => {
                        console.error('Login Error:', err);
                        this.snackBar.open("An error occurred. Please try again.", "Close", {
                            duration: 5000,
                            panelClass: "error-snackbar"
                        });
                    }
                });
            }
            



    private decodeToken(token: string): any {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            console.error('Invalid token format', e);
            return null;
        }
    }


    ngOnInit(): void {
        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            password: [null, [Validators.required]],
        });


        setTimeout(() => {
            this.isSpinning = false;
        }, 1000);
    }
}
