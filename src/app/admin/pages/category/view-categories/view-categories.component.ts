import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryService } from 'src/app/admin/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss']
})
export class ViewCategoriesComponent implements OnInit {

  categories: any[] = [];

  constructor(
    private category: CategoryService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private router: Router // Inject NzModalService
  ) {}

  ngOnInit(): void {
    this.category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        this.modal.error({
          nzTitle: 'Error!!',
          nzContent: 'Error in loading data'
        });
      }
    );
  }

   // Edit category
   editCategory(category: any): void {
    // Navigate to the edit category page with the selected category ID
    this.router.navigate(['/admin/edit-category', category.id]);
  }

   // Delete category
   deleteCategory(id: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this category?',
      nzContent: 'This action cannot be undone.',
      nzOnOk: () => {
        this.category.deleteCategory(id).subscribe(
          () => {
            this.notification.success('Success', 'Category deleted successfully');
            this.category.categories(); // Refresh the categories list
          },
          (error) => {
            console.log(error);
            this.notification.error('Error', 'Server error');
          }
        );
      }
    });
  }
}
