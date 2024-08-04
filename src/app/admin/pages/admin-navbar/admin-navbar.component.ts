import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/basic/services/auth/auth.service';
import { UserStorageService } from 'src/app/basic/services/storage/user-stoarge.service';
@Component({
    selector: 'app-navbar',
    templateUrl: './admin-navbar.component.html',
    styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent {

 
    constructor(private router: Router, private auth: AuthService) {}

    loggedIn() {
      return UserStorageService.isAdminLoggedIn();
    }
  
    logout() {
      console.log('Logout function called');
      UserStorageService.signOut();
      this.auth.signOut();
      this.router.navigateByUrl('/home');
    }
    
}