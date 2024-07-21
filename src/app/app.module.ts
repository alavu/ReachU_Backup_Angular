import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './basic/components/login/login.component';
import {SingupComponent} from './basic/components/singup/singup.component';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoNgZorroAntdModule} from './DemoNgZorroAntdModule';
import {SignupClientComponent} from './basic/components/signup-client/signup-client.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SignupCompanyComponent} from "./basic/components/signup-company/signup-company.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import {environment} from "./basic/services/storage/environment";

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SingupComponent,
        SignupClientComponent,
        SignupCompanyComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
        GoogleSigninButtonModule,
        BrowserAnimationsModule,
        DemoNgZorroAntdModule,
        ReactiveFormsModule,
        MatSnackBarModule,
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
