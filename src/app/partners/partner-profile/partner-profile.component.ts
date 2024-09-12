import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartnerService } from '../services/partner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from 'src/app/basic/services/storage/user-stoarge.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPartnerModalComponent } from '../edit-partner-modal/edit-partner-modal.component';

@Component({
  selector: 'app-partner-profile',
  templateUrl: './partner-profile.component.html',
  styleUrls: ['./partner-profile.component.scss']
})
export class PartnerProfileComponent {
  profileForm: FormGroup;

  partner: any = {};  // Object to hold the partner data
  partnerId: number;

  constructor(
    private fb: FormBuilder,
    private partnerService: PartnerService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog

  )
  { }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');

    // If no id is provided in the route, fallback to storage
    if (routeId) {
      this.partnerId = +routeId;  // Convert to number
    } else {
      this.partnerId = +UserStorageService.getUserId();  // Ensure it's a number
    }

    console.log("Retrieved partner ID:", this.partnerId);
    this.getPartnerProfile();
  }

   // Fetch partner profile data from the backend
   getPartnerProfile(): void {
    this.partnerService.getPartnerById(this.partnerId).subscribe(
      (data: any) => {
        console.log("Partner data:", data)
        this.partner = data;
      },
      (error: any) => {
        console.error('Failed to fetch partner data:', error);
      }
    );
    
  }

 // Open the edit profile modal
 editProfile(): void {
  const dialogRef = this.dialog.open(EditPartnerModalComponent, {
    width: '400px',
    data: { partner: this.partner }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.partner = result; // Update partner details if saved
      console.log('Profile updated:', result);
    }
  });
}
}