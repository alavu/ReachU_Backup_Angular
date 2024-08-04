import {Component,ChangeDetectorRef, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/basic/services/auth/auth.service';
import { UserStorageService } from 'src/app/basic/services/storage/user-stoarge.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    
    isClientLoggedIn: boolean = false;
    isAdminLoggedIn: boolean = false;
    isPartnerLoggedIn: boolean = false;
    isGoogleLogin : boolean = false;
    showHeader: boolean = true; // Cntrol header visibility

    constructor(private router: Router, private authService: AuthService, private cdr: ChangeDetectorRef,  private notification: NzNotificationService) {}

    ngOnInit(): void {
        this.checkLoginStatus();

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.checkLoginStatus();
            }
        });
    }

    checkLoginStatus(): void {
        this.isClientLoggedIn = UserStorageService.isUserLoggedIn();
        this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
        this.isPartnerLoggedIn = UserStorageService.isPartnerLoggedIn();
    
        // Check Google login status
        this.authService.checkGoogleLogin().subscribe(
            (response: any) => {
                this.isGoogleLogin = response.loggedIn; // Make sure this matches your backend response
                console.log("Google response", response);
                this.updateHeaderVisibility();
            },
            (error) => {
                this.isGoogleLogin = false;
                this.updateHeaderVisibility();
            }
        );
    }
    
    updateHeaderVisibility(): void {
        // Show header if not an admin or if client/partner is logged in or Google login is active
        this.showHeader = !this.isAdminLoggedIn || this.isClientLoggedIn || this.isPartnerLoggedIn || this.isGoogleLogin;
    
        console.log('Header Status:', {
            isClientLoggedIn: this.isClientLoggedIn,
            isAdminLoggedIn: this.isAdminLoggedIn,
            isPartnerLoggedIn: this.isPartnerLoggedIn,
            isGoogleLogin: this.isGoogleLogin,
            showHeader: this.showHeader
        });
        this.cdr.detectChanges();
    }
    
    logout() {
        console.log('Logout function called');
        UserStorageService.signOut();
        this.checkLoginStatus(); // Update login status
        this.authService.signOut();
        this.notification.success('Logout Successful', 'You have been logged out successfully.');
        this.router.navigateByUrl('/home');
      }
}
