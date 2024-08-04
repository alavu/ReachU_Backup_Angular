import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {AuthService} from '../../services/auth/auth.service';

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
                private router: Router) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            name: [null, [Validators.required]],
            lastname: [null, [Validators.required]],
            phone: [null],
            password: [null, [Validators.required]],
            checkPassword: [null, [Validators.required]],
        })
    }

    submitForm() {
        if (this.validateForm.invalid) {
            for (const i in this.validateForm.controls) {
                if (this.validateForm.controls.hasOwnProperty(i)) {
                    this.validateForm.controls[i].markAsDirty();
                    this.validateForm.controls[i].updateValueAndValidity();
                }
            }

            this.notification.error(
                'ERROR',
                'All fields are required',
                { nzDuration: 5000 }
            );
            return;
        }
        this.authService.registerClient(this.validateForm.value).subscribe({
            next: () => {
                // this.notification.success(
                //     'SUCCESS',
                //     'Signup successful',
                //     {nzDuration: 5000}
                // );
                this.router.navigate(['activate-account']);
            },
            error: (err) => {
                let errorMessage = 'An error occurred';
                if (err.error && err.error.error) {
                    errorMessage = err.error.error;
                } else if (err.error && err.error.businessErrorDescription) {
                    errorMessage = err.error.businessErrorDescription;
                } else if (err.message) {
                    errorMessage = err.message;
                }

                this.notification.error(
                    'ERROR',
                    errorMessage,
                    { nzDuration: 5000 }
                );
                this.errorMsg = [errorMessage];
            }
        });
    }
}
