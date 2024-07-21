import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../basic/services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit{

  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    this.activateAccount(token);
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token)
  }

  redirectToLogin() {
    this.router.navigate(['login'])
  }

  activateAccount(token: string): void {
    this.authService.verifyAccount(token).subscribe({
      next: (response) => {
        this.openSnackBar('Account activated successfully', 'Close');
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.openSnackBar('Account activation failed', 'Close');
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  private confirmAccount(token: string) {
    this.authService.verifyAccount(token).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login';
        this.submitted = true;
        this.openSnackBar(this.message, 'Close');
      },
      error: () => {
        this.message = 'Token has expired or is invalid';
        this.submitted = true;
        this.isOkay = false;
        this.openSnackBar(this.message, 'Close');
      }
    });
  }

  // openSnackBar(message: string, action: string): void {
  //   this.snackBar.open(message, action, {
  //     duration: 5000,
  //   });
  //
  // }
}
