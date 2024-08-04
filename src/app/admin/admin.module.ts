import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
// import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
// import { CreateAdComponent } from './pages/create-ad/create-ad.component';
// import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
// import { ReactiveFormsModule } from '@angular/forms';
// import { AllAdsComponent } from './pages/all-ads/all-ads.component';
// import { UpdateAdComponent } from './pages/update-ad/update-ad.component';
// import { UserManagementComponent } from './pages/user-management/user-management.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CompanyDashboardComponent} from "../company/pages/company-dashboard/company-dashboard.component";
import {DemoNgZorroAntdModule} from "../DemoNgZorroAntdModule";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminLoginComponent} from "./pages/admin-login/admin-login.component";
import { UserStorageService } from '../basic/services/storage/user-stoarge.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MaterialModule} from "../MaterialModule";
import {PromotionalBannersComponent} from "../home/promotional-banners/promotional-banners.component";
import { NzTableModule } from 'ng-zorro-antd/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './pages/admin-navbar/admin-navbar.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ViewCategoriesComponent } from './pages/category/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/category/add-category/add-category.component';
import { SubcategoryComponent } from './pages/category/subcategory-component/subcategory-component.component';
// import {SubcategoryComponent} from "./pages/category/subcategory-component/subcategory-component.component";
// import {PostCategoryComponent} from "./pages/category/post-category/post-category.component";

@NgModule({
    declarations: [
        AdminComponent,
        AdminLoginComponent,
        CompanyDashboardComponent,
        AdminNavbarComponent,
        SubcategoryComponent  ,
        UserManagementComponent,
        AddCategoryComponent,
        AdminDashboardComponent,
        ViewCategoriesComponent


        // CreateAdComponent,
        // AllAdsComponent,
        // UpdateAdComponent,
        // UserManagementComponent,
        // PostCategoryComponent,
        // SubcategoryComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule,
        DemoNgZorroAntdModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatTooltipModule,
        MatButtonModule,
        NzTableModule,
        FontAwesomeModule,
        MatFormFieldModule,
        MaterialModule
    ],
    providers: [
        UserStorageService,
      ]
})
export class AdminModule {
}
