import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth/auth.service';
import { CategoryService } from 'src/app/admin/services/category.service';

@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-partner.component.html',
  styleUrls: ['./signup-partner.component.scss']
})
export class SignupPartnerComponent {

  validateForm!: FormGroup;
  errorMsg: Array<string> = [];
  categories: any[] = [];

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private category: CategoryService,
    private notification: NzNotificationService,
    private router: Router){}

    ngOnInit(){
      this.validateForm = this.fb.group({
        email: [null, [Validators.email, Validators.required]],
        name : [null, [Validators.required]],
        lastname: [null],
        address : [null, [Validators.required]],
        phone : [null],
        password : [null, [Validators.required]],
        checkPassword : [null, [Validators.required]],
        service: [null, [Validators.required]]
      })
      this.loadCategories();
    }

    // Fetch services
    loadCategories(): void {
      this.category.categories().subscribe(
        (data: any) => {
          this.categories = data;
          console.log(this.categories);
        },
        (error: any) => {
          console.error('Failed to fetch service:', error);
          this.notification.error('ERROR', 'Failed to load service', { nzDuration: 5000 });
        }
      );
    }

    submitForm(){
      if (this.validateForm.valid) {
        // Get the selected service ID
        const selectedServiceId = this.validateForm.get('service')?.value;
  
        // Find the corresponding service name
        const selectedService = this.categories.find(service => service.id === selectedServiceId);
        const serviceName = selectedService ? selectedService.name : null;
  
        // Prepare the payload with the service name instead of the ID
        const payload = {
          ...this.validateForm.value,
          service: serviceName // Replace ID with service name
        };

      this.authService.registerPartner(payload) .subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          console.log('Error:', err); 
          this.errorMsg = err.error.validationErrors;
        }
      });
      }









        /*this.notification
        .success(
          'SUCCESS',
          `Signup successful`,
          { nzDuration: 5000 }
        );
        this.router.navigateByUrl('/login');
      }, error =>{
        this.notification
        .error(
          'ERROR',
          `${error.error}`,
          { nzDuration: 5000 }
        )
      });*/

    }
  }