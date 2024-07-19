import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.scss']
})
export class SignupClientComponent {

  validateForm!: FormGroup;
  errorMsg: Array<string> = []; // errorMsg: string;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router){}

    ngOnInit(){
      this.validateForm = this.fb.group({
        email: [null, [Validators.email, Validators.required]],
        name : [null, [Validators.required]],
        lastname : [null, [Validators.required]],
        phone : [null],
        password : [null, [Validators.required]],
        checkPassword : [null, [Validators.required]],
      })
    }

  submitForm() {
    this.authService.registerClient(this.validateForm.value).subscribe({
      next: () => {
        this.notification.success(
          'SUCCESS',
          'Signup successful',
          { nzDuration: 5000 }
        );
        this.router.navigate(['activate-account']);
      },
      error: (err) => {
        this.notification.error(
          'ERROR',
          `${err.error.validationErrors}`,
          { nzDuration: 5000 }
        );
        this.errorMsg = err.error.validationErrors;
      }
    });

      /* this.notification
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
