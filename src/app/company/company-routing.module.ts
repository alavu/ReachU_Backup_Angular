import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyComponent} from './company.component';
import {CompanyDashboardComponent} from './pages/company-dashboard/company-dashboard.component';
import {CreateAdComponent} from './pages/create-ad/create-ad.component';
import {AllAdsComponent} from './pages/all-ads/all-ads.component';
import {UpdateAdComponent} from './pages/update-ad/update-ad.component';
import {PostCategoryComponent} from "./pages/category/post-category/post-category.component";
import {SubcategoryComponent} from "./pages/category/subcategory-component/subcategory-component.component";

const routes: Routes = [
    {path: '', component: CompanyComponent},
    {path: 'dashboard', component: CompanyDashboardComponent},
    {path: 'ad', component: CreateAdComponent},
    {path: 'ads', component: AllAdsComponent},
    {path: 'update/:id', component: UpdateAdComponent},
    {path: 'category', component: PostCategoryComponent},
    { path: 'category/:categoryId/subcategory', component: SubcategoryComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyRoutingModule {
}
