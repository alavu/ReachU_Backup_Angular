import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {CompanyService} from "../../../services/company.service";

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent {

    categoryForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private companyService: CompanyService

    ) { }

    ngOnInit(): void {
        this.categoryForm = this.fb.group({
            name: [null, [Validators.required]],
            description: [null, [Validators.required]],
        })
    }

    addCategory(): void {
        if (this.categoryForm.valid) {
            this.companyService.addCategory(this.categoryForm.value).subscribe((res) =>{
                if (res.id!= null) {
                    this.snackBar.open('Category Posted Successfully!', 'Close',{
                        duration: 5000
                    });
                    this.router.navigateByUrl('/company/dashboard') //TODO: Need to check the nav
                } else {
                    this.snackBar.open(res.message, 'Close', {
                        duration: 5000,
                        panelClass: 'error-snackbar'
                    });
                }
            })
        } else {
            this.categoryForm.markAllAsTouched();
        }
    }

}
