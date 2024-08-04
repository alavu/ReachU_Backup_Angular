import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  bookings:any;

  constructor(private adminService: AdminService,
    private notification: NzNotificationService){}

  ngOnInit(){
    this.getAllAdBookings();
  }

  getAllAdBookings(){
    this.adminService.getAllAdBookings().subscribe(res =>{
      console.log(res);
      this.bookings = res;
    })
  }

  changeBookingStatus(bookingId: number, status:string){
    this.adminService.changeBookingStatus(bookingId, status).subscribe(res=>{
      this.notification
      .success(
        'SUCCESS',
        `Booking status changed successfully`,
        { nzDuration: 5000 }
      );
      this.getAllAdBookings();
    }, error =>{
      this.notification
        .error(
          'ERROR',
          `${error.message}`,
          { nzDuration: 5000 }
        )
    })
  }

}
