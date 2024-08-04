import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from './basic/services/storage/user-stoarge.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ServiceBookingSystemWeb';

  isClientLoggedIn: boolean = UserStorageService.isUserLoggedIn();
  isCompanyLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
  isPartnerLoggedIn: boolean = UserStorageService.isPartnerLoggedIn();

  constructor(private router: Router){}

  ngOnInit(){
    this.router.events.subscribe(event =>{
      this.isClientLoggedIn = UserStorageService.isUserLoggedIn();
      this.isCompanyLoggedIn = UserStorageService.isAdminLoggedIn();
      this.isPartnerLoggedIn = UserStorageService.isPartnerLoggedIn();
    })
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
