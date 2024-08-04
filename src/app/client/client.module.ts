import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientRoutingModule} from './client-routing.module';
import {ClientComponent} from './client.component';
import {ClientDashboardComponent} from './pages/client-dashboard/client-dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DemoNgZorroAntdModule} from '../DemoNgZorroAntdModule';
import {AdDetailComponent} from './pages/ad-detail/ad-detail.component';
import {MyBookingsComponent} from './pages/my-bookings/my-bookings.component';
import {ReviewComponent} from './pages/review/review.component';
import {ActivateAccountComponent} from './pages/activate-account/activate-account.component';
import {CodeInputModule} from "angular-code-input";
import { CountdownTimerComponent } from '../basic/components/countdown-timer/countdown-timer.component';

@NgModule({
    declarations: [
        ClientComponent,
        ClientDashboardComponent,
        AdDetailComponent,
        MyBookingsComponent,
        ReviewComponent,
        ActivateAccountComponent,
        CountdownTimerComponent,
    ],
    imports: [
        CommonModule,
        ClientRoutingModule,
        DemoNgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
        CodeInputModule
    ]
})
export class ClientModule {
}
