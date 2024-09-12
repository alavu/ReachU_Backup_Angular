import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupClientComponent} from './basic/components/signup-client/signup-client.component';
// import {SignupCompanyComponent} from './basic/components/signup-company/signup-company.component';
import {LoginComponent} from './basic/components/login/login.component';
import {ActivateAccountComponent} from "./client/pages/activate-account/activate-account.component";
import {AdminLoginComponent} from "./basic/components/admin-login/admin-login.component";
import {HomeComponent} from "./home/home/home.component";
import {PartnerLoginComponent} from "./basic/components/partner-login/partner-login.component";
import {SignupPartnerComponent} from "./basic/components/signup-partner/signup-partner.component";
import { AdminDashboardComponent } from './admin/pages/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth_guard/auth.guard';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent },
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: AdminLoginComponent},
    {path: 'register_client', component: SignupClientComponent},
    {path: 'register_partner', component: SignupPartnerComponent},
    {path: 'register', component: SignupClientComponent},
    {path: 'activate-account', component: ActivateAccountComponent},
    {path: 'partner-login', component: PartnerLoginComponent},
    {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
    {path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule)},
    {path: 'partner', loadChildren: () => import('./partners/partners.module').then(m => m.PartnersModule)}];
    


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
