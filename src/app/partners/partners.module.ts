import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnersRoutingModule } from './partners-routing.module';
import { PartnerDashboardComponent } from './partner-dashboard/partner-dashboard/partner-dashboard.component';
import { PartnerProfileComponent } from './partner-profile/partner-profile.component';
import { PartnerNavbarComponent } from './partner-navbar/partner-navbar/partner-navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { EditPartnerModalComponent } from './edit-partner-modal/edit-partner-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [

  
        PartnerDashboardComponent,
        PartnerProfileComponent,
        PartnerNavbarComponent,
        LayoutComponent,
        EditPartnerModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PartnersRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class PartnersModule { }
