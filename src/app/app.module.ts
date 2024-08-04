import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './basic/components/login/login.component';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoNgZorroAntdModule} from './DemoNgZorroAntdModule';
import {SignupClientComponent} from './basic/components/signup-client/signup-client.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
// import {SignupCompanyComponent} from "./basic/components/signup-company/signup-company.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import {environment} from "./basic/services/storage/environment";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {NzButtonModule} from "ng-zorro-antd/button";
import { AdminLoginComponent } from './admin/pages/admin-login/admin-login.component';
import { HomeComponent } from './home/home/home.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ServiceCategoriesComponent } from './home/service-categories/service-categories.component';
import { ServiceRatingComponent } from './home/service-rating/service-rating.component';
import { PromotionalBannersComponent } from './home/promotional-banners/promotional-banners.component';
import { NoteworthyComponent } from './home/noteworthy/noteworthy.component';
import { HeaderComponent } from './home/header/header.component';
import { PartnerLoginComponent } from './basic/components/partner-login/partner-login.component';
import {SignupPartnerComponent} from "./basic/components/signup-partner/signup-partner.component";
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from './MaterialModule';
import { HttpClientModule } from '@angular/common/http';
import { CountdownTimerComponent } from './basic/components/countdown-timer/countdown-timer.component';
import { ActivateAccountComponent } from './client/pages/activate-account/activate-account.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        // SingupComponent,
        SignupClientComponent,
        SignupPartnerComponent,
        PartnerLoginComponent,
        HomeComponent,
        HeaderComponent,
        NoteworthyComponent,
        PromotionalBannersComponent,
        ServiceCategoriesComponent,
        ServiceRatingComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserModule,
        FontAwesomeModule,
        GoogleSigninButtonModule,
        BrowserAnimationsModule,
        DemoNgZorroAntdModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        NzModalModule,
        NzButtonModule,
        HttpClientModule,
        MaterialModule,
        MatButtonToggleModule,
    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(environment.google_id)
                    }
                ]
            } as SocialAuthServiceConfig
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
