import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {CompanyDashboardComponent} from "../company/pages/company-dashboard/company-dashboard.component";
import {AdminLoginComponent} from "./pages/admin-login/admin-login.component";
import { AdminNavbarComponent } from './pages/admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AuthGuard } from '../auth_guard/auth.guard';
import { ViewCategoriesComponent } from './pages/category/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/category/add-category/add-category.component';
import { SubcategoryComponent } from './pages/category/subcategory-component/subcategory-component.component';
// import {CompanyDashboardComponent} from './pages/company-dashboard/company-dashboard.component';
// import {CreateAdComponent} from './pages/create-ad/create-ad.component';
// import {AllAdsComponent} from './pages/all-ads/all-ads.component';
// import {UpdateAdComponent} from './pages/update-ad/update-ad.component';
// import {UserManagementComponent} from "./pages/user-management/user-management.component";
// import {PostCategoryComponent} from "./pages/category/post-category/post-category.component";
// import {SubcategoryComponent} from "./pages/category/subcategory-component/subcategory-component.component";

const routes: Routes = [

    {
        path: '', component: AdminComponent, children: [
            {path: '', component: AdminLoginComponent, canActivate: [AuthGuard]},
            // {path: 'dashboard', component: CompanyDashboardComponent},
            
            {path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},
            {path: 'user-management', component: UserManagementComponent},
            {path: 'categories', component: ViewCategoriesComponent},
            {path: 'add-category', component: AddCategoryComponent},
            {path: 'add-subcategory', component: SubcategoryComponent},
            { path: 'logout', redirectTo: '/login' },
        ]
    }



    // {path: 'ad', component: CreateAdComponent},
    // {path: 'ads', component: AllAdsComponent},
    // {path: 'update/:id', component: UpdateAdComponent},
    // {path: 'user-management', component: UserManagementComponent},
    // {path: 'category', component: PostCategoryComponent},
    // { path: 'category/:categoryId/subcategory', component: SubcategoryComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
