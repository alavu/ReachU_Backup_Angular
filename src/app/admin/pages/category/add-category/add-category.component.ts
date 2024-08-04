import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryService } from 'src/app/admin/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  category = {
    name: '',
    description: ''
  };

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {}

  formSubmit(): void {
    if (this.category.name.trim() === '' || this.category.name === null) {
      this.snackBar.open('Title Required !!', '', {
        duration: 3000
      });
      return;
    }

    this.categoryService.addCategory(this.category).subscribe(
      (data: any) => {
        this.category.name = '';
        this.category.description = '';
        this.notification.success('Success', 'Category is added successfully');
      },
      (error) => {
        console.log(error);
        this.notification.error('Error', 'Server error');
      }
    );
  }
}
