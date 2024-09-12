import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerDashboardComponent } from './partner-dashboard/partner-dashboard/partner-dashboard.component';
import { PartnerProfileComponent } from './partner-profile/partner-profile.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    children: [
  {path: 'dashboard', component: PartnerDashboardComponent},
  {path: 'profile', component: PartnerProfileComponent},
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
