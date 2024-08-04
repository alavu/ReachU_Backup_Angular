import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { CreateAdComponent } from './pages/create-ad/create-ad.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { ReactiveFormsModule } from '@angular/forms';
import { AllAdsComponent } from './pages/all-ads/all-ads.component';
import { UpdateAdComponent } from './pages/update-ad/update-ad.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {SubcategoryComponent} from "./pages/category/subcategory-component/subcategory-component.component";
import {PostCategoryComponent} from "./pages/category/post-category/post-category.component";

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyDashboardComponent,
    CreateAdComponent,
    AllAdsComponent,
    UpdateAdComponent,
    PostCategoryComponent,
    SubcategoryComponent
  ],
    imports: [
        CommonModule,
        CompanyRoutingModule,
        DemoNgZorroAntdModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatFormFieldModule
    ]
})
export class CompanyModule { }
