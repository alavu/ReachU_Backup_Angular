import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerDashboardComponent } from './partner-dashboard/partner-dashboard/partner-dashboard.component';
import { PartnerProfileComponent } from './partner-profile/partner-profile.component';
// import { LayoutComponent } from './layout/layout.component';
import { PartnerComponent } from './partner.component';
import { AuthenticationGuard } from '../auth_guard/authentication.guard';
import { ChatClientComponent } from './chat-client/chat-client.component';

const routes: Routes = [
  {
    path: '',
        component: PartnerComponent,
        canActivate: [AuthenticationGuard],data: { roles: ['PARTNER'] },
    children: [
  {path: 'dashboard', component: PartnerDashboardComponent},
  {path: 'profile', component: PartnerProfileComponent},
  {path: 'chat', component: ChatClientComponent},

]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
