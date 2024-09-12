import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from './client.component';
import {ClientDashboardComponent} from './pages/client-dashboard/client-dashboard.component';
import {AdDetailComponent} from './pages/ad-detail/ad-detail.component';
import {MyBookingsComponent} from './pages/my-bookings/my-bookings.component';
import {ReviewComponent} from './pages/review/review.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

const routes: Routes = [
    {path: '', component: ClientComponent},
    {path: 'dashboard', component: ClientDashboardComponent},
    {path: 'bookings', component: MyBookingsComponent},
    {path: 'ad/:adId', component: AdDetailComponent},
    // {path: 'ad/:adId', component: CategoryDetailComponent}, add a cart page if needed in the future 
    {path: 'checkout', component: CheckoutPageComponent},
    {path: 'review/:id', component: ReviewComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule {
}
